import type { TrainingDomainOption } from '../types/trainer';

export const TRAINING_DOMAINS: TrainingDomainOption[] = [
  // 1. Software & Web Development
  { value: "Software Engineering & Full-Stack (MERN, MEAN, Java Full-Stack)", label: "Software Engineering & Full-Stack (MERN, MEAN, Java Full-Stack)", category: "Software Development" },
  { value: "Frontend Web Development (React, Vue, Angular, Next.js)", label: "Frontend Web Development (React, Vue, Angular, Next.js)", category: "Software Development" },
  { value: "Backend Development (Node.js, Java Spring Boot, Python Django/FastAPI, Go)", label: "Backend Development (Node.js, Java Spring Boot, Python Django/FastAPI, Go)", category: "Software Development" },
  { value: "Programming Languages (Python, Java, C, C++, C#)", label: "Programming Languages (Python, Java, C, C++, C#)", category: "Software Development" },
  { value: "Mobile App Development (React Native, Flutter, iOS Swift, Android Kotlin)", label: "Mobile App Development (React Native, Flutter, iOS Swift, Android Kotlin)", category: "Software Development" },
  { value: "Software Testing & Automation (Selenium, Cypress, Playwright, API Testing)", label: "Software Testing & Automation (Selenium, Cypress, Playwright, API Testing)", category: "Software Development" },

  // 2. Hardware, Electronics & Networking
  { value: "Hardware Engineering & Computer Networking", label: "Hardware Engineering & Computer Networking", category: "Hardware & Electronics" },
  { value: "Embedded Systems, Microcontrollers & Arduino/Raspberry Pi", label: "Embedded Systems, Microcontrollers & Arduino/Raspberry Pi", category: "Hardware & Electronics" },
  { value: "VLSI Design, Verilog & Digital Electronics", label: "VLSI Design, Verilog & Digital Electronics", category: "Hardware & Electronics" },
  { value: "Internet of Things (IoT) & Robotics", label: "Internet of Things (IoT) & Robotics", category: "Hardware & Electronics" },
  { value: "Network Administration & CCNA/CCNP Certification", label: "Network Administration & CCNA/CCNP Certification", category: "Hardware & Electronics" },

  // 3. SAP Modules & Enterprise ERP
  { value: "SAP FICO (Financial Accounting & Controlling)", label: "SAP FICO (Financial Accounting & Controlling)", category: "SAP Modules" },
  { value: "SAP MM (Materials Management)", label: "SAP MM (Materials Management)", category: "SAP Modules" },
  { value: "SAP SD (Sales & Distribution)", label: "SAP SD (Sales & Distribution)", category: "SAP Modules" },
  { value: "SAP ABAP Development & Programming", label: "SAP ABAP Development & Programming", category: "SAP Modules" },
  { value: "SAP HANA & S/4HANA Enterprise", label: "SAP HANA & S/4HANA Enterprise", category: "SAP Modules" },
  { value: "SAP HR / HCM (Human Capital Management)", label: "SAP HR / HCM (Human Capital Management)", category: "SAP Modules" },
  { value: "SAP Basis Administration", label: "SAP Basis Administration", category: "SAP Modules" },

  // 4. School Tuitions (Primary & High School)
  { value: "School Tuitions - Class 1 to 5 (All Subjects)", label: "School Tuitions - Class 1 to 5 (All Subjects)", category: "School Tuitions" },
  { value: "School Tuitions - Class 6 to 10 (State Board / CBSE / ICSE)", label: "School Tuitions - Class 6 to 10 (State Board / CBSE / ICSE)", category: "School Tuitions" },
  { value: "School Tuitions - Mathematics & Science (High School)", label: "School Tuitions - Mathematics & Science (High School)", category: "School Tuitions" },

  // 5. PUC / Higher Secondary Tuitions (11th & 12th)
  { value: "PUC Science Tuitions (PCMB / PCMC - Physics, Chemistry, Maths, Bio/CS)", label: "PUC Science Tuitions (PCMB / PCMC - Physics, Chemistry, Maths, Bio/CS)", category: "PUC Tuitions" },
  { value: "PUC Commerce Tuitions (Accountancy, Business Studies, Economics, Statistics)", label: "PUC Commerce Tuitions (Accountancy, Business Studies, Economics, Statistics)", category: "PUC Tuitions" },
  { value: "PUC Arts & Humanities Tuitions", label: "PUC Arts & Humanities Tuitions", category: "PUC Tuitions" },

  // 6. Engineering College Tuitions (B.E. / B.Tech / M.Tech)
  { value: "Engineering Tuitions - Computer Science & Information Technology", label: "Engineering Tuitions - Computer Science & Information Technology", category: "Engineering Tuitions" },
  { value: "Engineering Tuitions - Electronics & Communication (ECE)", label: "Engineering Tuitions - Electronics & Communication (ECE)", category: "Engineering Tuitions" },
  { value: "Engineering Tuitions - Electrical & Electronics (EEE)", label: "Engineering Tuitions - Electrical & Electronics (EEE)", category: "Engineering Tuitions" },
  { value: "Engineering Tuitions - Mechanical Engineering", label: "Engineering Tuitions - Mechanical Engineering", category: "Engineering Tuitions" },
  { value: "Engineering Tuitions - Civil Engineering", label: "Engineering Tuitions - Civil Engineering", category: "Engineering Tuitions" },
  { value: "Engineering Tuitions - Biotechnology & Chemical Engineering", label: "Engineering Tuitions - Biotechnology & Chemical Engineering", category: "Engineering Tuitions" },

  // 7. Competitive & Entrance Exam Coaching
  { value: "NEET Coaching (Medical Entrance Exam)", label: "NEET Coaching (Medical Entrance Exam)", category: "Competitive Exams" },
  { value: "JEE Main & Advanced Coaching (Engineering Entrance)", label: "JEE Main & Advanced Coaching (Engineering Entrance)", category: "Competitive Exams" },
  { value: "GATE Coaching (Graduate Aptitude Test in Engineering - CS, EC, EE, Mech, Civil)", label: "GATE Coaching (Graduate Aptitude Test in Engineering - CS, EC, EE, Mech, Civil)", category: "Competitive Exams" },
  { value: "PGCET Coaching (Post Graduate Common Entrance Test)", label: "PGCET Coaching (Post Graduate Common Entrance Test)", category: "Competitive Exams" },
  { value: "KCET & State Level CET Coaching", label: "KCET & State Level CET Coaching", category: "Competitive Exams" },

  // 8. Vedic Maths & Mental Aptitude
  { value: "Vedic Maths & Speed Mental Mathematics", label: "Vedic Maths & Speed Mental Mathematics", category: "Aptitude & Vedic Maths" },
  { value: "Quantitative Aptitude, Logical Reasoning & Analytical Skills", label: "Quantitative Aptitude, Logical Reasoning & Analytical Skills", category: "Aptitude & Vedic Maths" },

  // 9. Data Science, AI & Analytics
  { value: "Data Science & Advanced Analytics", label: "Data Science & Advanced Analytics", category: "Data & AI" },
  { value: "Machine Learning & Deep Learning", label: "Machine Learning & Deep Learning", category: "Data & AI" },
  { value: "Generative AI & LLMs (LangChain, OpenAI, Prompt Engineering)", label: "Generative AI & LLMs (LangChain, OpenAI, Prompt Engineering)", category: "Data & AI" },
  { value: "Business Intelligence & Data Visualization (Power BI, Tableau, SQL)", label: "Business Intelligence & Data Visualization (Power BI, Tableau, SQL)", category: "Data & AI" },

  // 10. Cloud Computing & Cyber Security
  { value: "Cloud Computing (AWS / Azure / GCP)", label: "Cloud Computing (AWS / Azure / GCP)", category: "Cloud & Security" },
  { value: "DevOps & CI/CD (Docker, Kubernetes, Jenkins, Terraform)", label: "DevOps & CI/CD (Docker, Kubernetes, Jenkins, Terraform)", category: "Cloud & Security" },
  { value: "Cyber Security, Ethical Hacking & Penetration Testing", label: "Cyber Security, Ethical Hacking & Penetration Testing", category: "Cloud & Security" },

  // 11. Corporate & Soft Skills Training
  { value: "Soft Skills, Public Speaking & Corporate Communication", label: "Soft Skills, Public Speaking & Corporate Communication", category: "Corporate & Management" },
  { value: "Agile, Scrum & Project Management (PMP / PRINCE2)", label: "Agile, Scrum & Project Management (PMP / PRINCE2)", category: "Corporate & Management" },
  { value: "Digital Marketing, SEO & Performance Marketing", label: "Digital Marketing, SEO & Performance Marketing", category: "Corporate & Management" },
  { value: "UI/UX Design & Design Thinking (Figma, Adobe XD)", label: "UI/UX Design & Design Thinking (Figma, Adobe XD)", category: "Corporate & Management" }
];
