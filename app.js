const APIkey = "e9237005bd7a58648b7aed0be97662a3";
let City = document.querySelector("#city");
let temp = document.querySelector("#temp");
let btn = document.querySelector("#get_weather");
let ul = document.querySelector("#weather_list");

btn.addEventListener("click", async () => {
  let city = City.value.trim();
  const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
  const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`;
  let forecast = await getWeather(forecastURL);
  let data = await getWeather(weatherURL);
  show(data, forecast);
});

async function getWeather(url) {
  try {
    let res = await axios.get(url);
    return res.data;
  } catch (e) {
    return { error: "Unable to fetch weather data" };
  }
}

function show(data, forecast) {
  let p = document.querySelector("#weather");
  ul.innerHTML = "";
  if (data.error) {
    let li = document.createElement("li");
    li.innerHTML = `<h2>Error: ${data.error}</h2>`;
    ul.appendChild(li);
  } else {
    if (temp.checked) {
      p.innerHTML = `<h4>Weather in <u>${data.name}</u>: ${
        data.weather[0].description
      }, Temperature: ${(data.main.temp - 273.15).toFixed(
        2
      )}°C but Feels like ${(data.main.feels_like - 273.15).toFixed(
        2
      )}°C with Humidity: ${data.main.humidity}%</h4>`;
    } else {
      p.innerHTML = `<h4>Weather in <u>${data.name}</u>: ${data.weather[0].description}, Temperature: ${data.main.temp}K but Feels like ${data.main.feels_like}K with Humidity: ${data.main.humidity}%</h4>`;
    }

    let title = document.createElement("h3");
    title.innerText = "5 Days Forecast in 3 hour intervals:";
    ul.appendChild(title);

    forecast.list.forEach((item) => {
      let forecastItem = document.createElement("li");
      forecastItem.classList.add("list-group-item");
      if (temp.checked) {
        forecastItem.innerHTML = `<b>${new Date(item.dt_txt).toLocaleString()}:</b><br>
                        Weather: ${item.weather[0].description}<br>
                        Temperature: ${(item.main.temp - 273.15).toFixed(
                          2
                        )}°C <br>
                        Feels Like: ${(item.main.feels_like - 273.15).toFixed(
                          2
                        )}°C <br>
                        Humidity: ${item.main.humidity}%<br>
                        Wind Speed: ${item.wind.speed} m/s`;
      } else {
        forecastItem.innerHTML = `<b>${new Date(item.dt_txt).toLocaleString()}:</b><br>
                        Weather: ${item.weather[0].description}<br>
                        Temperature: ${item.main.temp.toFixed(2)}K<br>
                        Feels Like: ${item.main.feels_like.toFixed(2)}K <br>
                        Humidity: ${item.main.humidity}%<br>
                        Wind Speed: ${item.wind.speed} m/s`;
      }
      ul.appendChild(forecastItem);
    });
  }
  let body = document.querySelector("body");

  body.style.backgroundImage = "url(bg.jpg)";
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  body.style.backgroundRepeat = "no-repeat";
}
