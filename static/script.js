// let apiKey = "5dc26b3c12d147a199d110155251005"

const openWeatherAPIKEY = "53b6f889613f9e4e64e31b68a23b5159"
//  let url = `https://api.openweathermap.org/data/2.5/weather?q=Izmail&appid=${openWeatherAPIKEY}`
// //  url = "https://api.openweathermap.org/data/2.5/weather?q=Izmail&appid=53b6f889613f9e4e64e31b68a23b5159"
// // let url =`http://api.weatherapi.com/v1/current.json?key=e968df4dfb6a147888a683622132403&q=London&aqi=no`
// let response = fetch(url, {
//     method: 'GET',
//     headers: { 
//         'Content-Type': 'application/json'
//     },
// });

// if(response.ok) {
//     let json = response.json();
//     console.log(json);
// } else { 
//     alert("Помилка HTTP:" + response.status);
// }
let body = document.body 
body.style.backgroundImage = "url('https://www.dejurka.ru/wp-content/uploads/2012/10/2-weather-590x442.jpg')";
body.style.backgroundSize = "cover";
body.style.backgroundPosition = "center";
body.style.backgroundRepeat = "no-repeat";

function getWeather() {
    const selectedCity = document.getElementById('citySelect').value;
    const searchCity = document.getElementById('searchInput').value.trim();


    const city = searchCity || selectedCity;

    fetch('/api/city', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city })
    })
       .then(res => {
         if (!res.ok) throw new Error("Місто не знайдено");
         return res.json();
       })
      .then(data => {
        console.log(data)
        showWeather(data)
        showForecast(data.forecast.forecastday);
        changeBackground(data.current.condition.text);
      })
      .catch(err => {
        document.getElementById('weather').innerHTML = `<p>${err.message}</p>`;
        document.getElementById('forecast').innerHTML = "";
      });
}
 
function showWeather(data) {
        document.getElementById('weather').innerHTML = `<p>${data.location.name}</p>
          <h1>${data.location.country}</h1>
          <img src="${data.current.condition.icon}">
          <p>Температура: ${data.current.temp_c}</p>
          <p>Дата та час: ${data.location.localtime}</p>
          <p>Повітря: ${data.current.wind_kph}</p>
          <p>Регіон: ${data.location.region}</p>
          <p>${data.current.condition.text}</p>
          `;


}
function changeBackground(condition) {
let body = document.body

condition = condition.toLowerCase();
if (condition.includes("sun") || condition.includes("ясно") || condition.includes("сонячно")) {
  body.style.backgroundImage = "url('https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VubnklMjBkYXl8ZW58MHx8MHx8fDA%3D')";
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  body.style.backgroundRepeat = "no-repeat";
}

else if (condition.includes("cloud") || condition.includes("хмарно")) {
  body.style.backgroundImage = "url('https://img.goodfon.ru/wallpaper/big/7/56/badfon-trava-pole-tuchi-nebo-pogoda.webp')";
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  body.style.backgroundRepeat = "no-repeat";
}

else if (condition.includes("rain") || condition.includes("дощ") || condition.includes("злива")) {
  body.style.backgroundImage = "url('https://wallpapers.com/images/featured/rain-desktop-llmyo7uctnbg63uz.jpg')";
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  body.style.backgroundRepeat = "no-repeat";
}

// body.style.backgroundImage = "url('https://wallpapershome.com/images/pages/pic_h/6496.jpg')"

// body.style.backgroundPosition = (center)
// body.style.backgroundRepeat =
}
function showForecast(days) {
}