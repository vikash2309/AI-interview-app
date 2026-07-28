import mongoose from "mongoose";

const interviewSchema =
  new mongoose.Schema(
    {
      clerkId: {
        type: String,
        required: true,
      },

      company: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        required: true,
      },

      difficulty: {
        type: String,
        required: true,
      },

      duration: {
        type: Number,
        required: true,
      },

      interviewType: {
        type: String,
        required: true,
      },
      roomName: {
        type: String,
        unique: true,
      },
      questionCount: {
        type: Number,
        default: 0,
      },
      questions: [
        {
          type: String,
        },
      ],
      answers: [
        {
          question: String,
          answer: String,
        },
      ],
      score: {
        type: Number,
        default: 0,
      },

      feedback: {
        strengths: {
          type: [String],
          default: [],
        },

        improvements: {
          type: [String],
          default: [],
        },

        overallFeedback: {
          type: String,
          default: "",
        },
      },
      analytics: {
        technicalKnowledge: {
          type: Number,
          default: 0,
        },

        communication: {
          type: Number,
          default: 0,
        },

        problemSolving: {
          type: Number,
          default: 0,
        },

        confidence: {
          type: Number,
          default: 0,
        },

        practicalThinking: {
          type: Number,
          default: 0,
        },
      },
      status: {
        type: String,
        enum: [
          "pending",
          "in-progress",
          "completed",
        ],
        default: "pending",
      },
      cameraAnalytics: {
        faceVisibility: {
          type: Number,
          default: 0,
        },

        attention: {
          type: Number,
          default: 0,
        },

        centered: {
          type: Number,
          default: 0,
        },

        optimalDistance: {
          type: Number,
          default: 0,
        },

        overallCameraScore: {
          type: Number,
          default: 0,
        },

        raw: {
          totalFrames: Number,

          faceVisibleFrames: Number,
          faceMissingFrames: Number,

          forwardFrames: Number,
          leftFrames: Number,
          rightFrames: Number,
          upFrames: Number,
          downFrames: Number,

          centeredFrames: Number,
          offCenterFrames: Number,

          optimalDistanceFrames: Number,
          tooCloseFrames: Number,
          tooFarFrames: Number,
        },
      },
    },
    {
      timestamps: true,
    }
  );

const Interview =
  mongoose.model(
    "Interview",
    interviewSchema
  );

export default Interview;