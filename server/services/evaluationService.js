import ai from "../config/gemini.js";

export const evaluateInterview =
  async ({
    role,
    difficulty,
    questions,
    answers,
  }) => {

    const prompt = `
You are a friendly and supportive technical interviewer.

The candidate may be a student, fresher, intern, or junior developer.

Evaluation Guidelines:

1. Be encouraging and constructive.
2. Do not expect perfect textbook answers.
3. Accept partially correct answers if the core idea is correct.
4. Focus on understanding rather than exact wording.
5. Do not heavily penalize short answers.
6. Give credit when the candidate shows reasonable knowledge.
7. Strengths should generally be equal to or greater than improvements.
8. Improvements should be actionable and supportive.
9. Avoid harsh criticism.
10. Consider confidence, understanding, and communication.
11.MOST IMPORTANT-->AUTO CORRECT ANSWER TYPING MISTAKES,GRAMMER MISTAKES AND ASSUME ANSWER FROM A BRIEF IDEA OR A SIMILAR WORK GIVEN BY USER  --->LIKE USER SAID CONATCT API INSTEAD OF CONTEXT API -->SO AUTO CORRECT THESE TYPOS
12.only give negative marks or zero marks if answer is completely wrong.
Scoring Guidelines:

95-100 = Excellent understanding

85-95 = Good understanding with minor gaps

75-85 = Basic understanding, suitable for learning-level candidates

50-75 = Partial understanding, needs improvement

 40-50 = Very limited understanding
 below 40 = answered only 1-2 questions
 0 = not answered anything



Return ONLY valid JSON:

{
  "score": 85,

  "analytics": {
    "technicalKnowledge": 88,
    "communication": 82,
    "problemSolving": 79,
    "confidence": 84,
    "practicalThinking": 86
  },

  "strengths": [
    "...",
    "..."
  ],

  "improvements": [
    "...",
    "..."
  ],

  "overallFeedback":
    "..."
}


Role:
${role}

Difficulty:
${difficulty}

Questions:
${JSON.stringify(
      questions,
      null,
      2
    )}

Answers:
${JSON.stringify(
      answers,
      null,
      2
    )}

Return ONLY valid JSON.

Return ONLY valid JSON:

{
  "score": 85,

  "analytics": {
    "technicalKnowledge": 88,
    "communication": 82,
    "problemSolving": 79,
    "confidence": 84,
    "practicalThinking": 86
  },

  "strengths": [
    "...",
    "..."
  ],

  "improvements": [
    "...",
    "..."
  ],

  "overallFeedback":
    "..."
}
`;

    const MAX_RETRIES = 5;

    for (
      let attempt = 1;
      attempt <= MAX_RETRIES;
      attempt++
    ) {
      try {

        const response =
          await ai.models.generateContent({
            model:
              "gemini-2.5-flash",
            contents:
              prompt,
          });

        const text =
          response.text;

        const cleaned =
          text
            .replace(
              /```json/g,
              ""
            )
            .replace(
              /```/g,
              ""
            )
            .trim();

        return JSON.parse(
          cleaned
        );

      } catch (error) {

        console.log(
          `Evaluation Attempt ${attempt}/${MAX_RETRIES} Failed`,
          error.message
        );

        if (
          attempt <
          MAX_RETRIES
        ) {
          await new Promise(
            (resolve) =>
              setTimeout(
                resolve,
                5000
              )
          );
        }
      }
    }

    throw new Error(
      "Failed to evaluate interview."
    );
};