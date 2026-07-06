export const buildPrompt = ({
  company,
  role,
  difficulty,
  interviewType,
  questionCount,
}) => {
  let companyContext = "";

  switch (
    company.toLowerCase()
  ) {
    case "google":
      companyContext = `
Focus on:
- Problem Solving
- Data Structures & Algorithms
- JavaScript Fundamentals
- React Internals
- Performance Optimization
- System Thinking
`;
      break;

    case "amazon":
      companyContext = `
Focus on:
- Leadership Principles
- Ownership
- Scalability
- Problem Solving
- Behavioral Scenarios
- Real-world Development Challenges
`;
      break;

    case "microsoft":
      companyContext = `
Focus on:
- Problem Solving
- Collaboration
- System Design Basics
- Practical Development Skills
- Communication
`;
      break;

    case "meta":
      companyContext = `
Focus on:
- React
- Frontend Performance
- Optimization
- JavaScript Deep Concepts
- Scalable UI Development
`;
      break;

    default:
      companyContext = `
Act as a professional interviewer and generate realistic interview questions.
`;
  }

  let typeContext = "";

  switch (
    interviewType
  ) {
    case "Technical":
      typeContext = `
Generate only technical questions related to the role.
`;
      break;

    case "Behavioral":
      typeContext = `
Generate only behavioral questions.
Focus on teamwork, communication, leadership, challenges, failures, and achievements.
`;
      break;

    case "Mixed":
      typeContext = `
Generate a balanced mix of technical and behavioral questions.
`;
      break;

    default:
      typeContext = "";
  }

  return `
You are a friendly and professional interviewer.

The candidate may be:

* A student
* A fresher
* An intern
* A junior developer

Company:
${company}

Role:
${role}

Difficulty:
${difficulty}

Interview Type:
${interviewType}

${companyContext}

${typeContext}

Difficulty Guidelines:

If Difficulty = Easy:

* Ask beginner-friendly/learner questions
* Focus on fundamentals
* Avoid tricky questions
* Avoid deep internals
* Suitable for students learning the technology

If Difficulty = Medium:

* Ask practical and project-based questions
* Suitable for internship interviews
* Focus on understanding rather than memorization

If Difficulty = Hard:

* Ask questions suitable for junior developers
* Focus on real-world usage and problem solving
* Avoid FAANG-level trick questions
* Do not ask extremely advanced system design questions

Requirements:

1. Generate exactly ${questionCount} questions.
2. Questions must match the role.
3. Questions should feel like a real internship or entry-level interview.
4. Questions should be conversational and realistic.
5. Avoid unnecessarily difficult questions.
6. Prioritize practical understanding over theory.
7. Include at least 1 project-based question when possible.
8. Return ONLY a valid JSON array.
9. Do NOT include markdown.
10. Do NOT include explanations.

Example Output:

[
"Tell me about a project where you used React.",
"What is the difference between state and props?",
"How does useEffect work?",
"What challenges did you face while building a project?",
"How would you optimize a React application?"
]
`;

};