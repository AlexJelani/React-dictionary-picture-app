import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;

const API_KEY_VALUE = process.env.API_KEY_VALUE;

const app = express();

//enable cors
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.get("/dictionary", (req, res) => {
  const word = req.query.word;

  const options = {
    method: "GET",
    url: `https://owlbot.info/api/v4/dictionary/${word}`,
    headers: {
      Authorization: `Token ${API_KEY_VALUE}`,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(PORT, () => console.log(`Server running on port${PORT}`));
