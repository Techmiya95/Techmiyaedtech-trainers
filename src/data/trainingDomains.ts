import type { TrainingDomainOption } from '../types/trainer';

export const TRAINING_DOMAINS: TrainingDomainOption[] = [
  // Software & Web Development
  { value: "Frontend Development (React, Vue, Angular)", label: "Frontend Development (React, Vue, Angular)", category: "Software Development" },
  { value: "Backend Development (Node.js, Java, Python, Go)", label: "Backend Development (Node.js, Java, Python, Go)", category: "Software Development" },
  { value: "Full-Stack Development (MERN, MEAN, Java Full-Stack)", label: "Full-Stack Development (MERN, MEAN, Java Full-Stack)", category: "Software Development" },
  { value: "Mobile App Development (React Native, Flutter, iOS, Android)", label: "Mobile App Development (React Native, Flutter, iOS, Android)", category: "Software Development" },
  { value: "Software Testing & Automation (Selenium, Cypress, Playwright)", label: "Software Testing & Automation (Selenium, Cypress, Playwright)", category: "Software Development" },
  
  // Data Science & AI
  { value: "Data Science & Advanced Analytics", label: "Data Science & Advanced Analytics", category: "Data & AI" },
  { value: "Machine Learning & Deep Learning", label: "Machine Learning & Deep Learning", category: "Data & AI" },
  { value: "Generative AI & LLMs (LangChain, OpenAI API)", label: "Generative AI & LLMs (LangChain, OpenAI API)", category: "Data & AI" },
  { value: "Data Engineering (Spark, Airflow, Snowflake, Databricks)", label: "Data Engineering (Spark, Airflow, Snowflake, Databricks)", category: "Data & AI" },
  { value: "Business Intelligence & Data Visualization (Power BI, Tableau)", label: "Business Intelligence & Data Visualization (Power BI, Tableau)", category: "Data & AI" },

  // Cloud & Infrastructure
  { value: "Cloud Computing (AWS / Azure / GCP)", label: "Cloud Computing (AWS / Azure / GCP)", category: "Cloud & Infrastructure" },
  { value: "DevOps & CI/CD (Docker, Kubernetes, Jenkins, Terraform)", label: "DevOps & CI/CD (Docker, Kubernetes, Jenkins, Terraform)", category: "Cloud & Infrastructure" },
  { value: "Cyber Security & Ethical Hacking", label: "Cyber Security & Ethical Hacking", category: "Cloud & Infrastructure" },
  { value: "Network Administration & CCNA/CCNP", label: "Network Administration & CCNA/CCNP", category: "Cloud & Infrastructure" },

  // Management & Methodologies
  { value: "Agile, Scrum & Kanban Coaching", label: "Agile, Scrum & Kanban Coaching", category: "Product & Management" },
  { value: "Product Management & Business Analysis", label: "Product Management & Business Analysis", category: "Product & Management" },
  { value: "Project Management (PMP / PRINCE2)", label: "Project Management (PMP / PRINCE2)", category: "Product & Management" },
  { value: "UI/UX Design & Design Thinking (Figma, Adobe XD)", label: "UI/UX Design & Design Thinking (Figma, Adobe XD)", category: "Product & Management" },

  // Corporate & Soft Skills
  { value: "Soft Skills, Communication & Leadership", label: "Soft Skills, Communication & Leadership", category: "Corporate & Business" },
  { value: "Digital Marketing, SEO & Performance Ads", label: "Digital Marketing, SEO & Performance Ads", category: "Corporate & Business" },
  { value: "Sales Engineering & B2B Tech Sales", label: "Sales Engineering & B2B Tech Sales", category: "Corporate & Business" },
  { value: "Human Resources (HR Analytics & Talent Acquisition)", label: "Human Resources (HR Analytics & Talent Acquisition)", category: "Corporate & Business" },
  { value: "Robotics, Embedded Systems & IoT", label: "Robotics, Embedded Systems & IoT", category: "Hardware & Emerging" }
];
