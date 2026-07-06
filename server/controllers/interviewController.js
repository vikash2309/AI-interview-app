import Interview from "../models/Interview.js";
import {
  generateQuestions,
}
  from "../services/aiService.js";
import {
  evaluateInterview,
}
  from "../services/evaluationService.js";

export const createInterview =
  async (req, res) => {
    try {
      const {
        company,
        role,
        difficulty,
        questionCount,
        interviewType,

      } = req.body;

      const questions =
        await generateQuestions({
          company,
          role,
          difficulty,
          questionCount,
          interviewType,
        });
      const duration = questionCount * 2;

      const interview = new Interview({
  clerkId: req.userId,
  company,
  role,
  difficulty,
  duration,
  interviewType,
  questions,
  questionCount,
});

interview.roomName = `interview-${interview._id}`;

await interview.save();
      console.log(interview);



      res.json({
        success: true,
        interview,
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }
  };
export const getUserInterviews =
  async (req, res) => {
    try {
      const interviews =
        await Interview.find({
          clerkId: req.userId,
        }).sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        interviews,
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }
  };
export const getInterviewById =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const interview =
        await Interview.findById(
          id
        );

      if (!interview) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Interview not found",
          });
      }

      res.json({
        success: true,
        interview,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };
export const saveAnswers =
  async (req, res) => {
    try {

      const { id } =
        req.params;

      const {
        answers,
      } = req.body;

      const interview =
        await Interview.findByIdAndUpdate(
          id,
          {
            answers,
            status:
              "in-progress",
          },
          {
            returnDocument: "after",
          }
        );

      res.json(
        interview
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

export const finishInterview =
  async (req, res) => {
    try {

      const { id } =
        req.params;

      const interview =
        await Interview.findByIdAndUpdate(
          id,
          {
            status:
              "completed",
          },
          {
            returnDocument: "after",
          }
        );

      res.json(
        interview
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

export const
  generateEvaluation =
    async (req, res) => {

      try {

        const { id } =
          req.params;

        const interview =
          await Interview.findById(
            id
          );

        const evaluation =
          await evaluateInterview({
            role:
              interview.role,

            difficulty:
              interview.difficulty,

            questions:
              interview.questions,

            answers:
              interview.answers,
          });

        interview.score =
          evaluation.score;

        interview.feedback = {
          strengths:
            evaluation.strengths,

          improvements:
            evaluation.improvements,

          overallFeedback:
            evaluation.overallFeedback,
        };
        interview.analytics = {
          technicalKnowledge:
            evaluation.analytics
              .technicalKnowledge,

          communication:
            evaluation.analytics
              .communication,

          problemSolving:
            evaluation.analytics
              .problemSolving,

          confidence:
            evaluation.analytics
              .confidence,

          practicalThinking:
            evaluation.analytics
              .practicalThinking,
        };

        await interview.save();
        console.log(interview);

        res.json(
          interview
        );

      } catch (error) {

        console.log(
          error
        );

        res.status(500).json({
          message:
            error.message,
        });

      }
    };
