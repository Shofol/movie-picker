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
  return `Suggest 5 movies with poster image link
  
    genre: Romance,
    time: Night,
    weather: Rainy,
    familySafe: Family Movie,
    language: Bengali

    Movies List:
    1. Parineeta, https://xl.movieposterdb.com/20_01/2019/10592082/xl_10592082_2eb3162b.jpg?v=2022-01-04%2021:45:13
    2. Love Express, https://xl.movieposterdb.com/19_12/2016/6246362/xl_6246362_98caf748.jpg?v=2020-01-02%2013:33:21
    3. Arshinagar, https://xl.movieposterdb.com/19_12/2015/5309284/xl_5309284_927fd668.jpg?v=2020-01-02%2013:27:29
    4. Bishh, https://posters.movieposterdb.com/12_07/2009/1394312/l_1394312_c329d1f7.jpg
    5. Sharey Chuattor, https://posters.movieposterdb.com/22_10/1953/46304/l_sharey-chuattar-movie-poster_20811bf7.jpg

    genre: Action,
    time: Day,
    weather: Sunny,
    familySafe: Family Movie,
    language: English

    Movies List:
    1. Black Panther: Wakanda Forever, https://posters.movieposterdb.com/22_10/2022/9114286/l_black-panther-wakanda-forever-movie-poster_7d7dc251.jpg
    2. Avatar: The Way of Water, https://xl.movieposterdb.com/22_11/2022/1630029/xl_avatar-the-way-of-water-movie-poster_9672cea6.jpg?v=2023-01-27%2019:55:33
    3. Shotgun Wedding, https://posters.movieposterdb.com/22_10/2014/4033428/l_shotgun-wedding-movie-poster_7c2a6f25.jpg
    4. Everything Everywhere All at Once, https://posters.movieposterdb.com/22_04/2/6710474/l_6710474_7ad8ab0d.jpg
    5. Teen Wolf: The Movie, https://xl.movieposterdb.com/22_10/2023/15486810/xl_teen-wolf-the-movie-movie-poster_f4819e4d.jpg?v=2022-10-17%2009:59:05


    genre: Drama,
    time: Night,
    weather: Rainy,
    familySafe: Family Movie,
    language: Hindi

    Movies List:
    1. Pathaan, https://xl.movieposterdb.com/23_02/2023/12844910/xl_pathaan-movie-poster_ffe2c667.jpg?v=2023-02-01%2012:15:21
    2. Mission Majnu, https://xl.movieposterdb.com/23_02/2023/13131232/xl_mission-majnu-movie-poster_318e6acd.jpg?v=2023-02-06%2008:40:41
    3. Chhatriwali, https://xl.movieposterdb.com/23_02/2023/15516226/xl_chhatriwali-movie-poster_354550bd.jpg?v=2023-02-07%2007:11:35
    4. Drishyam 2, https://xl.movieposterdb.com/22_05/2021/12361178/xl_12361178_89fdc93c.jpg?v=2022-05-09%2013:16:03
    5. Vadh, https://xl.movieposterdb.com/12_06/2002/313743/xl_313743_87d4239d.jpg


    genre: ${genre},
    time: ${time},
    weather: ${weather},
    familySafe: ${familySafe},
    language: ${language}

    Movies List:
  
  `;
}
