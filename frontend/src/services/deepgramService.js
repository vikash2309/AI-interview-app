import axios from "axios";

export const getDeepgramToken = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/deepgram/token`
    );

    return res.data.access_token;
  } catch (error) {
    console.error("Failed to get Deepgram token:", error);
    throw error;
  }
};