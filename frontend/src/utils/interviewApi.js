import axios from "axios";

export const getInterviews =
  async (token) => {
    const res =
      await axios.get(
        `${import.meta.env.VITE_API_URL}/interviews`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data.interviews;
  };
export const getInterviewById =
  async (
    interviewId,
    token
  ) => {
    const response =
      await axios.get(
        `${import.meta.env.VITE_API_URL}/interviews/${interviewId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data
      .interview;
  };
export const saveAnswers =
  async (
    id,
    answers,
    token
  ) => {

    const res =
      await axios.put(
        `${import.meta.env.VITE_API_URL}/interviews/${id}/answers`,
        { answers },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };
export const finishInterview =
  async (
    id,
    cameraAnalytics,
    token
  ) => {

    const res =
      await axios.put(
        `${import.meta.env.VITE_API_URL}/interviews/${id}/finish`,
        {
          cameraAnalytics,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };

export const
  evaluateInterview =
    async (
      id,
      token
    ) => {

      const res =
        await axios.post(
          `${import.meta.env.VITE_API_URL}/interviews/${id}/evaluate`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      return res.data;
    };

    