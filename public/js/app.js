const mainContent = document.querySelector('.main-content');
const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('input');
const infoDiv = document.querySelector('.container');
const info1Par = document.querySelector('#message-1');
const info2Par = document.querySelector('#message-2');
const info3Par = document.querySelector('#message-3');
const infoContainer = document.querySelector('.info-container');
const loadingMsg = document.createTextNode('Loading...');
const errorMsg = document.createTextNode('');

const fetchWeather = (location) => {
  fetch(`/weather?address=${location}`)
    .then(res => res.json())
    .then(data => renderInfo(data))
    .catch(err => renderInfo(err))
}

const renderInfo = (data) => {
  loadingMsg.remove();
  if (data.error) {
    errorMsg.textContent = data.error;
    return (mainContent.appendChild(errorMsg))
  }
  errorMsg.remove();
  infoContainer.style.display = 'block';
  const { summary, temperature, rainChance, humidity, windSpeed } = data.forecast;
  console.log(humidity);
  info1Par.textContent = (data.location);
  info2Par.textContent = `${summary} It is ${temperature} degrees Celcius, with a ${rainChance}% of rain.`
  info3Par.textContent = `The humidity currently stands on ${humidity}% and the wind speed is ${windSpeed}km/h.`
}

weatherForm.addEventListener('submit', (e) => {
  infoContainer.style.display = 'none';
  const location = weatherInput.value;
  mainContent.appendChild(loadingMsg);
  errorMsg.textContent = '';
  fetchWeather(location);
  weatherInput.value = '';

  e.preventDefault();

})