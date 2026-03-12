import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.open-meteo.com/v1/forecast";
var data = {};
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var weatherWeek = [];
function getWeatherMeta(code) {
  if (code === 0)
    return { icon: "sunny.svg", alt: "Clear sky", label: "Clear" };

  if ([1, 2, 3].includes(code))
    return { icon: "cloudy.svg", alt: "Partly cloudy", label: "Cloudy" };

  if ([45, 48].includes(code))
    return { icon: "fog.svg", alt: "Foggy conditions", label: "Fog" };

  if ([51, 53, 55, 56, 57].includes(code))
    return { icon: "drizzle.svg", alt: "Light drizzle", label: "Drizzle" };

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return { icon: "rain.svg", alt: "Rainy weather", label: "Rain" };

  if ([71, 73, 75, 77, 85, 86].includes(code))
    return { icon: "snow.svg", alt: "Snowfall", label: "Snow" };

  if ([95, 96, 99].includes(code))
    return { icon: "thunder.svg", alt: "Thunderstorm", label: "Thunderstorm" };

  return { icon: "unknown.svg", alt: "Unknown weather", label: "Unknown" };
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        latitude: 51.4779,
        longitude: 0.0015,
        timezone: "GMT",
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
      },
    });

    weatherWeek = response.data.daily.weather_code.map((code) =>
      getWeatherMeta(code),
    );

    data = {
      ...response.data,
      weekday: weekday,
      weatherWeek: weatherWeek,
    };
    console.log(data);
  } catch (error) {
    console.log("Error occured: " + error.message);
  }
  res.render("index.ejs", data);
});

app.post("/forecast", async (req, res) => {
  console.log(req.body);
  try {
    const response = await axios.get(API_URL, {
      params: {
        latitude: parseFloat(req.body.latitude),
        longitude: parseFloat(req.body.longitude),
        timezone: req.body.timezone,
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
      },
    });
    // console.log(response.data);
    // data = response.data;
    weatherWeek = response.data.daily.weather_code.map((code) =>
      getWeatherMeta(code),
    );

    data = {
      ...response.data,
      weekday: weekday,
      weatherWeek: weatherWeek,
    };
    console.log(data);
  } catch (error) {
    console.log("Error occured: " + error.message);
  }
  res.render("index.ejs", data);
  // res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
