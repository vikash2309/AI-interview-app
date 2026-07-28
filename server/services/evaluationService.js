import ai from "../config/gemini.js";

export const evaluateInterview =
  async ({
    role,
    difficulty,
    questions,
    answers,
    cameraAnalytics,
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

 also consider the following :
 score : 0-->if no answer given or given answer is completely wrong
 score : 20--> if only one answer is given
 score : 40--> if only two answers given
 score : 50-->if only half answers than number of questions are given

 do not give high scores if wrong answers or less no of answers are given





 Camera Evaluation Guidelines:

1. Use the camera analytics only to improve the quality of your feedback.

2. Do NOT reduce the candidate's technical score because of poor camera behavior.

3. If face visibility is low, mention that the candidate should stay visible throughout the interview.

4. If attention is low, mention maintaining eye contact with the camera.

5. If centered score is low, suggest staying centered in the frame.

6. If optimal distance is low, suggest maintaining a proper distance from the camera.

7. If camera behavior is good, mention it as one of the candidate's strengths.

8. Camera behavior should influence only the written feedback unless it is extremely poor.

 Camera Feedback Guidelines:

1. Generate a separate "cameraFeedback" object.

2. Do NOT include camera-related comments inside "strengths", "improvements", or "overallFeedback".

3. Use the camera analytics only to generate cameraFeedback.

4. cameraFeedback must contain:

{
  "summary": "...",

  "strengths": [
    "...",
    "..."
  ],

  "improvements": [
    "...",
    "..."
  ]
}

5. If camera behavior was excellent, mention positive observations.

6. If camera behavior needs improvement, provide constructive suggestions.

7. Do not affect technical scoring based on camera analytics.



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

  "overallFeedback": "...",

  "cameraFeedback": {
    "summary": "Excellent camera presence throughout the interview.",

    "strengths": [
      "Maintained good eye contact with the camera.",
      "Stayed centered for most of the interview."
    ],

    "improvements": [
      "Try to maintain a slightly more consistent distance from the camera."
    ]
  }
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

    Camera Analytics:

Face Visibility:
${cameraAnalytics.faceVisibility}%

Attention:
${cameraAnalytics.attention}%

Centered:
${cameraAnalytics.centered}%

Optimal Distance:
${cameraAnalytics.optimalDistance}%

Overall Camera Score:
${cameraAnalytics.overallCameraScore}%

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

  "strengths": [],
  "improvements": [],
  "overallFeedback": "...",

  "cameraFeedback": {
    "summary": "...",
    "strengths": [],
    "improvements": []
  }
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