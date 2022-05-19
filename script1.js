const city_name = document.getElementById('text');
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");
const tags = document.getElementById("tags");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const API_KEY = "59c8af2d7cf2494ae072cf664f896715";

// var lt,ln;

// const getInfo = async(event) => {
//      event.preventDefault();

//    let cityVal = cityName1.value;
//    console.log(cityVal);
// //     alert(cityVal);
//    if(cityVal === ""){
//        city_name.innerHTML = `Plz write the name before search`;
//        //datahide.classList.add("data_hide");
//    }else{

//    try{

//        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityVal}&limit=5&appid={API_KEY}`
//        const response = await fetch(url);

//        const data = await response.json();
//        const arrData = [data];

//        lt = arrData.lat;
//      ln = arrData.lon;
//      console.log(lt);
//      console.log(ln);
//     // alert(lt);

//    }catch{
//        cityVal = " ";
//        datahide.classList.add("data_hide");
//        city_name.innerText =  `please enter the proper city name`;
//        console.log('please add the proper city name');
//    }

//    }
// }

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

   //console.log(cityName1.value);
}, 1000);

// getWeatherData()
//getwinfo();
// const getInfo = async(event) => {
async function getwinfo() {
  
  const CITY = tags.value;
  if(CITY=='')
  {
    alert("Enter the proper city name")
    //city_name.innerHTML = `Plz write the name before search`; 
  }
  try {
    const urlForCity = `https://api.openweathermap.org/geo/1.0/direct?q=${CITY}&limit=5&appid=${API_KEY}`;

    const responseForCity = await fetch(urlForCity, {
      method: "GET",
    });
    const dataForCity = await responseForCity.json();
    console.log(dataForCity[0]);

    const lat = dataForCity[0].lat;
    const lon = dataForCity[0].lon;

    console.log(lat);
    console.log(lon);

    const urlForLatAndLon = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`;

    const responseForLatAndLong = await fetch(urlForLatAndLon, {
      method: "GET",
    });
    const dataForLatAndLong = await responseForLatAndLong.json();
    console.log(dataForLatAndLong);

    showWeatherData(dataForLatAndLong);
  } catch (error) {
    //cityVal = " ";
    //datahide.classList.add("data_hide");
    console.error(error);
    //city_name.innerHTML =  `please enter the proper city name`;
    console.log("please add the proper city name");
  }
  e.preventdefault();
}
//function getWeatherData () {
// navigator.geolocation.getCurrentPosition((success) => {

//let {latitude, longitude } = success.coords;
// let cityVal = cityName1.value;
// console.log(cityVal);
// try{

//     let url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityVal}&limit=5&appid={API_KEY}`
//     const response = await fetch(url);

//     const data = await response.json();
//     console.log(data);
//     const arrData = [data];

//   let lt = arrData[0].lat;
//  let ln = arrData[0].lon;
//   console.log(lt);
//   console.log(ln);
//  // alert(lt);
//  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lt}&lon=${ln}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data =>
// {
//  //console.log(data);
//  console.log(cityVal)
// showWeatherData(data);
// })

// }catch{
//     cityVal = " ";
//     //datahide.classList.add("data_hide");
//     city_name.innerHTML =  `please enter the proper city name`;
//     console.log('please add the proper city name');
// }

//})
//}

function showWeatherData(data) {
  let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

  timezone.innerHTML = data.timezone;
  countryEl.innerHTML = data.lat + "N " + data.lon + "E";

  currentWeatherItemsEl.innerHTML = `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}% </div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>

    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format("HH:mm a")}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset * 1000).format("HH:mm a")}</div>
    </div>
    
    
    `;

  let otherDayForcast = "";
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
      currentTempEl.innerHTML = `
            <img src="https://openweathermap.org/img/wn//${
              day.weather[0].icon
            }@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window
                  .moment(day.dt * 1000)
                  .format("dddd")}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `;
    } else {
      otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window
                  .moment(day.dt * 1000)
                  .format("ddd")}</div>
                <img src="https://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `;
    }
  });

  weatherForecastEl.innerHTML = otherDayForcast;
}