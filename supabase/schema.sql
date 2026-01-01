-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- Create a table for templates
create table templates (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  content text not null,
  dynamic_fields text[], -- Array of strings
  tone text,
  length text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for templates
alter table templates enable row level security;

create policy "Users can view their own templates." on templates
  for select using ((select auth.uid()) = user_id);

create policy "Users can insert their own templates." on templates
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can update their own templates." on templates
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete their own templates." on templates
  for delete using ((select auth.uid()) = user_id);

-- Function to handle new user signup (automatically create profile)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a table for template versions (history)
create table template_versions (
  id uuid default gen_random_uuid() primary key,
  template_id uuid references templates(id) on delete cascade not null,
  content text not null,
  name text, -- Snapshot the name too
  dynamic_fields text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for template versions
alter table template_versions enable row level security;

create policy "Users can view versions of their own templates." on template_versions
  for select using (
    exists (
      select 1 from templates
      where templates.id = template_versions.template_id
      and templates.user_id = (select auth.uid())
    )
  );
-- We only insert via server actions/triggers ideally, but RLS for insert:
create policy "Users can insert versions for their own templates." on template_versions
  for insert with check (
    exists (
      select 1 from templates
      where templates.id = template_versions.template_id
      and templates.user_id = (select auth.uid())
    )
  );

