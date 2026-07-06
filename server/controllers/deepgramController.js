import axios from "axios";

export const createToken = async (req, res) => {
  try {

    const response = await axios.post(

      "https://api.deepgram.com/v1/auth/grant",

      {
        ttl_seconds: 300
      },

      {
        headers: {
          Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`
        }
      }

    );

    res.json(response.data);

  } catch (error) {

    console.error(error.response?.data);

    res.status(500).json({
      message: "Token generation failed"
    });

  }
};