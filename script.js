const apiKey = '2c2e9649407422879975d36c69573984';
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('button[type="submit"]');
const weatherCard = document.querySelector('.info');
document.addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>{
    document.querySelectorAll('.splash').forEach(a => a.style.display = 'none')
    document.querySelector('.weatherCard').style.display = "block";
  },3000)
})
searchInput.addEventListener('keyup',(e)=>{
  e.preventDefault()
  if(e.key === 'Enter'){
    searchButton.click()
  }
})
searchButton.addEventListener('click',(e) => {
 e.preventDefault();
 console.log(e)
  weatherCard.innerHTML = '';
  const location = searchInput.value.trim();
  if (location) {
    fetchWeatherData(location);
  } else {
    alert("Please enter a location");
  }
  searchInput.value = ''

});

async function fetchWeatherData(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  try {
    weatherCard.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse" style="color: #d39612;font-size:24px"></i><h3>fetching data</h3>`;
    const response = await fetch(url);
    const data = await response.json();
    const kelvin = data.main.temp;
    const celsius = kelvin - 273.15;
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherCard.innerHTML = `
      <img src="${iconUrl}" style="height:30%;"  alt="temperature_icon"></img>
    `;
    displayWeatherData(data, celsius);
  } catch (error) {
    weatherCard.innerHTML = `<p style="color:red;">an error occured</p><br>
      <button type="submit" onclick="fetchWeatherData()" style="height:fit-content;width:fit-content;">search again</button>
    `
  }
}

function displayWeatherData(data, temperature) {
  var weatherData = data.weather[0];
  const description = weatherData.description;
  weatherCard.innerHTML += `
    <h2>Current Weather in ${data.name}</h2>
    <p>Temperature: <span class="fw-bold fs-4">${temperature.toFixed(2)}°C </span></p>
    <p>Description: ${description}</p>
  `;
}
