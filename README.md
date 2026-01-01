

<p align="left">
  <img src="public/logo.png" alt="HireNote Logo" width="100" />
</p>

# HireNote

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Auth-green?style=for-the-badge&logo=supabase)
![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini-8E75B2?style=for-the-badge&logo=google)

**Land your dream job with cold emails generated in seconds.**

HireNote is an AI-powered outreach assistant designed for students and job seekers. It transforms generic networking requests into tailored, professional cold emails that get responses. Built with modern web technologies and a focus on privacy and user experience.

![Landing Page](public/W_LandingPage.png)


## Key Features

- **AI-Powered Writing**: Generate contextual cold emails, follow-ups, and networking requests using Google Gemini Pro.
- **Template System**: Browse, create, and manage reusable templates for different scenarios (e.g., "Sales Pitch", "Mentorship Request").
- **Bring Your Own Key (BYOK)**: Privacy-first architecture allows users to use their own Gemini API Key for unlimited generation.
- **Beautiful UI**: Fully responsive interface with smooth Dark/Light mode transitions and glassmorphism design.
- **Secure Authentication**: Robust user management via Supabase Auth.
- **Real-time & Fast**: Built on Next.js 15 App Router for blazing fast performance and SEO.

## Screenshots

| Dashboard (Light) | Dashboard (Dark) |
|:---:|:---:|
| ![Dashboard Light](public/W_Dashboard.png) | ![Dashboard Dark](public/B_Dashboard.png) |

| Generate (Light) | API (Dark) |
|:---:|:---:|
| ![Generate Light](public/W_Generate.png) | ![API Dark](public/B_API.png) |

## Architecture

### System Overview
```mermaid
graph TD
    User[UserId] -->|Auth| Supabase[Supabase Auth]
    User -->|Interaction| UI[Next.js Client UI]
    UI -->|Server Actions| Server[Next.js Server]
    Server -->|Context| DB[Supabase Database]
    Server -->|Prompt| AI[Google Gemini API]
    
    subgraph Privacy Layer
    Server -.->|Optional: User Key| AI
    end
```

### User Journey
```mermaid
sequenceDiagram
    participant U as User
    participant D as Dashboard
    participant T as Templates
    participant AI as Gemini AI
    
    U->>D: Logs In
    D->>T: Browses Templates
    U->>T: Selects "Cold Email to Founder"
    T->>U: Requests Context (Name, Company, Role)
    U->>T: Enters Details
    T->>AI: Sends Structured Prompt
    AI-->>T: Returns Draft Email
    T-->>U: Displays AI Response
    U->>U: Edits / Refines
    U->>D: Copies to Clipboard
```

## 🚀 Getting Started

Follow these steps to run HireNote locally.

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm
- A Supabase project (for Auth & DB)
- Google Gemini API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/akhilthirunalveli/HireNote.git
    cd HireNote
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env.local` file in the root directory:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    GEMINI_API_KEY=your_default_server_key (optional fallback)
    ```

4.  **Run the functionality**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the app.


## 📁 Project Structure

```bash
├── app/                  # Next.js App Router
│   ├── api/              # API Routes (Edge/Serverless)
│   ├── auth/             # Authentication Logic
│   ├── dashboard/        # Protected User Area
│   └── page.tsx          # Landing Page
├── components/           # React Components
│   ├── dashboard/        # Dashboard-specific UI
│   ├── home/             # Landing Page UI
│   ├── template/         # Template Engine UI
│   └── ui/               # Shared Reusable Components
├── hooks/                # Custom React Hooks (useTheme, useUser)
├── lib/                  # Utilities & Business Logic
│   ├── ai/               # Gemini AI Prompts & Config
│   └── supabase/         # Auth & Database Clients
└── public/               # Static Assets
```
Built with  by [Akhil Thirunalveli]
