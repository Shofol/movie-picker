import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Loader from "../components/Loader/Loader";

export default function Home() {
  const [genre, setGenre] = useState("");
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState("");
  const [familySafe, setFamilySafe] = useState("");
  const [language, setLanguage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setShowLoader(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genre: genre,
          time: time,
          weather: weather,
          familySafe: familySafe,
          language: language,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult(data.result);
      setShowLoader(false);
      // setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      // alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Movie Picker AI</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <Loader showLoader={showLoader} />
      <main className={styles.main}>
        <h3>Movie Picker</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor="genres">Choose a genre:</label>
          <select
            name="genres"
            id="genres"
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
          >
            <option value="">Choose</option>
            <option value="Adventure">Adventure</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Horror">Horror</option>
            <option value="Action">Action</option>
            <option value="Thriller">Thriller</option>
            <option value="Animation">Animation</option>
            <option value="Superhero">Superhero</option>
          </select>

          <label htmlFor="genres">When will you see the movie?</label>
          <select
            name="times"
            id="times"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          >
            <option value="">Choose</option>
            <option value="Day">Day</option>
            <option value="Night">Night</option>
          </select>

          <label htmlFor="genres">What is the weather?</label>
          <select
            name="weather"
            id="weather"
            onChange={(e) => setWeather(e.target.value)}
            value={weather}
          >
            <option value="">Choose</option>
            <option value="Rainy">Rainy</option>
            <option value="Sunny">Sunny</option>
            <option value="Snowy">Snow</option>
          </select>

          <label htmlFor="genres">Family Safe?</label>
          <select
            name="familySafe"
            id="familySafe"
            onChange={(e) => setFamilySafe(e.target.value)}
            value={familySafe}
          >
            <option value="">Choose</option>
            <option value="Family Movie">Family Movie</option>
            <option value="Non Family Movie">Non Family Movie</option>
          </select>

          <label htmlFor="genres">Choose a language</label>
          <select
            name="language"
            id="language"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value="">Choose</option>
            <option value="Bengali">Bengali</option>
            <option value="English">English</option>
            <option value="Japanese">Japanese</option>
            <option value="Chinese">Chinese</option>
            <option value="Hindi">Hindi</option>
            <option value="Korean">Korean</option>
            <option value="Tamil">Tamil</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>

          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>
          {result &&
            result.split("\n").map((movie) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 1rem",
                  }}
                >
                  {movie.split(",")[0]}
                  <img
                    src={movie.split(",")[1] ? movie.split(",")[1] : ""}
                    width="200px"
                  />
                </div>
              );
            })}
        </div>
      </main>
    </div>
  );
}
