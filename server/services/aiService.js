import ai
  from "../config/gemini.js";
import {
  buildPrompt,
}
  from "./promptService.js";

export const generateQuestions = async ({
  company,
  role,
  difficulty,
  interviewType,
  questionCount,
}) => {
  const prompt = buildPrompt({
    company,
    role,
    difficulty,
    interviewType,
    questionCount,
  });

  const MAX_RETRIES = 5;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
     
      const response =
        await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

      const text = response.text;

      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleaned);

    } catch (error) {

      console.log(
        `Gemini Attempt ${attempt} Failed`,
        error.message
      );

      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) =>
          setTimeout(resolve, 4000)
        );
      }
    }
  }

  throw new Error(
    "Failed to generate questions after 3 attempts."
  );
};