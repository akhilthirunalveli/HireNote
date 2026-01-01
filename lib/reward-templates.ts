export const REWARD_TEMPLATES = [
    {
        name: "Cold Outreach - General",
        content: "Hi {Name},\n\nI was researching {Company} and was impressed by {Achievement/Project}. I'm reaching out because I believe my background in {Your Skill} could be valuable to your team.\n\nI'd love to connect and learn more about your work.\n\nBest,\n{Your Name}",
        tone: "Professional",
        length: "Short",
        dynamic_fields: ["Name", "Company", "Achievement/Project", "Your Skill", "Your Name"]
    },
    {
        name: "Networking - Follow Up",
        content: "Hi {Name},\n\nIt was great meeting you at {Event/Location} yesterday. I really enjoyed our conversation about {Topic}.\n\nI'd love to stay in touch and continue the discussion. Let me know if you're open to grabbing coffee sometime next week.\n\nBest regards,\n{Your Name}",
        tone: "Friendly",
        length: "Short",
        dynamic_fields: ["Name", "Event/Location", "Topic", "Your Name"]
    },
    {
        name: "Job Application - Cover Letter Intro",
        content: "Dear Hiring Manager,\n\nI am writing to express my strong interest in the {Position} role at {Company}. With my experience in {Key Skill 1} and {Key Skill 2}, I am confident in my ability to contribute effectively to your team.\n\nI have followed {Company}'s work in {Field/Industry} for some time and admire your commitment to {Value/Mission}.\n\nSincerely,\n{Your Name}",
        tone: "Formal",
        length: "Medium",
        dynamic_fields: ["Position", "Company", "Key Skill 1", "Key Skill 2", "Field/Industry", "Value/Mission", "Your Name"]
    },
    {
        name: "Asking for a Recommendation",
        content: "Hi {Name},\n\nI hope you're doing well.\n\nI'm currently applying for {Role/Opportunity} and was wondering if you would be willing to write a brief recommendation for me based on our work together on {Project}.\n\nI'd be happy to provide any details to make it easier for you.\n\nThanks,\n{Your Name}",
        tone: "Polite",
        length: "Short",
        dynamic_fields: ["Name", "Role/Opportunity", "Project", "Your Name"]
    },
    {
        name: "Meeting Request",
        content: "Hello {Name},\n\nI'd like to request a brief meeting to discuss {Topic}. I believe this is important because {Reason}.\n\nWould you be available on {Date/Time}?\n\nBest,\n{Your Name}",
        tone: "Direct",
        length: "Short",
        dynamic_fields: ["Name", "Topic", "Reason", "Date/Time", "Your Name"]
    },
    {
        name: "Feedback Request",
        content: "Hi {Name},\n\nI've recently completed {Project/Task} and would value your honest feedback on my performance. specifically regarding {Specific Aspect}.\n\nYour insights would be very helpful for my professional growth.\n\nThank you,\n{Your Name}",
        tone: "Constructive",
        length: "Short",
        dynamic_fields: ["Name", "Project/Task", "Specific Aspect", "Your Name"]
    }
];
