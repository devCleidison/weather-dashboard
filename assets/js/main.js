const key = "6d5c6c88";
const baseUrl = "https://api.hgbrasil.com/weather?";

let myLocation = {
  lat: null,
  lon: null,
};

navigator.geolocation.getCurrentPosition((position) => {
  getLocation(position.coords);
});

async function getLocation(position) {
  myLocation.lat = await position.latitude;
  myLocation.lon = await position.longitude;

  getInfo();
}

async function getInfo() {
  document.getElementById("menu").classList.remove("on");
  document.body.style.overflow = "initial";

  const cityName = document.getElementById("input-city").value;

  if (cityName == "") {
    let myURL = `${baseUrl}key=${key}&lat=${myLocation.lat}&lon=${myLocation.lon}&user_ip=remote`;
    const response = await fetch(myURL).then((res) => {
      return res.json();
    });
    setInfoView(response);
  }

  if (cityName != "") {
    let myURL = `${baseUrl}key=${key}&city_name=${cityName}`;
    const response = await fetch(myURL).then((res) => {
      return res.json();
    });
    setInfoView(response);
  }
}

async function setInfoView(res) {
  let dayIcon = document.getElementById("icon-day");
  dayIcon.classList.add(`${getConditionBanner(res.results.condition_slug)}`);

  document.getElementById("week-container").innerHTML = "";
  document.getElementById("temp-city").innerHTML =
    (await res.results.temp) + "°";
  document.getElementById("city-name").innerHTML = await res.results.city;
  document.getElementById("sunset-hour").innerHTML = await res.results.sunset;
  document.getElementById("humidity").innerHTML =
    (await res.results.humidity) + "%";
  document.getElementById("wind").innerHTML = await res.results.wind_speedy;

  const forecast = res.results.forecast;
  for (let i = 0; i < forecast.length - 3; i++) {
    let container = document.createElement("div");
    container.classList.add("temperature-day");

    let weekDay = document.createElement("span");
    weekDay.classList.add("day");
    weekDay.innerHTML = getWeekday(forecast[i].weekday);

    container.appendChild(weekDay);

    let iconDay = document.createElement("i");
    iconDay.classList.add(`${getConditionForecast(forecast[i].condition)}`);

    container.appendChild(iconDay);

    let content = document.createElement("div");
    content.classList.add("day-value-container");

    let dayContainerUp = document.createElement("div");
    dayContainerUp.classList.add("day-container");

    let iconUp = document.createElement("i");
    iconUp.classList.add("ri-arrow-up-line");
    iconUp.classList.add("up");

    let valueDayUp = document.createElement("span");
    valueDayUp.classList.add("day-value");
    valueDayUp.innerHTML = forecast[i].max;

    dayContainerUp.appendChild(iconUp);
    dayContainerUp.appendChild(valueDayUp);

    let dayContainerDown = document.createElement("div");
    dayContainerDown.classList.add("day-container");

    let iconDown = document.createElement("i");
    iconDown.classList.add("ri-arrow-down-line");
    iconDown.classList.add("down");

    let valueDayDown = document.createElement("span");
    valueDayDown.classList.add("day-value");
    valueDayDown.innerHTML = forecast[i].min;

    dayContainerDown.appendChild(iconDown);
    dayContainerDown.appendChild(valueDayDown);

    content.appendChild(dayContainerUp);
    content.appendChild(dayContainerDown);

    container.appendChild(content);

    document.getElementById("week-container").appendChild(container);
  }
}

function getConditionForecast(condition) {
  switch (condition) {
    case "cloudly_day":
      return "ri-sun-cloudy-line";
    case "rain":
      return "ri-drizzle-line";
    case "clear_da":
      return "ri-sun-line";
    case "cloud":
      return "ri-cloudy-line";
    case "clear_day":
      return "ri-sun-line";
  }
}

function getConditionBanner(condition) {
  switch (condition) {
    case "cloudly_day":
      return "ri-sun-cloudy-fill";
    case "rain":
      return "ri-drizzle-fill";
    case "clear_da":
      return "ri-sun-fill";
    case "cloud":
      return "ri-cloudy-fill";
    case "clear_day":
      return "ri-sun-fill";
  }
}

function getWeekday(day) {
  switch (day) {
    case "Seg":
      return "Mon";
    case "Ter":
      return "Tue";
    case "Qua":
      return "Wed";
    case "Qui":
      return "Thu";
    case "Sex":
      return "Fri";
    case "Sáb":
      return "Sat";
    case "Dom":
      return "Sun";
    default:
      return day;
  }
}
