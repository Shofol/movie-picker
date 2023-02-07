import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  // const animal = req.body.animal || "";
  // if (animal.trim().length === 0) {
  //   res.status(400).json({
  //     error: {
  //       message: "Please enter a valid animal",
  //     },
  //   });
  //   return;
  // }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(req.body),
      temperature: 0.6,
      max_tokens: 2000,
    });
    console.log(JSON.stringify(completion.data.choices[0]));
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(input) {
  const { genre, time, weather, familySafe, language } = input;
  return `Suggest 5 movies with below parameters
  
    genre: Romance,
    time: Night,
    weather: Rainy,
    familySafe: Family Movie,
    language: Bengali

    Movies List:
    1. Parineeta
    2. Love Express
    3. Arshinagar
    4. Bishh
    5. Sharey Chuattor

    genre: Action,
    time: Day,
    weather: Sunny,
    familySafe: Family Movie,
    language: English

    Movies List:
    1. Black Panther: Wakanda Forever
    2. Avatar: The Way of Water
    3. Shotgun Wedding
    4. Everything Everywhere All at Once
    5. Teen Wolf: The Movie


    genre: Drama,
    time: Night,
    weather: Rainy,
    familySafe: Family Movie,
    language: Hindi

    Movies List:
    1. Pathaan
    2. Mission Majnu
    3. Chhatriwali
    4. Drishyam 2
    5. Vadh


    genre: ${genre},
    time: ${time},
    weather: ${weather},
    familySafe: ${familySafe},
    language: ${language}

    Movies List:
  
  `;
}
