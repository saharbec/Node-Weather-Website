const mainContent = document.querySelector('.main-content');
const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('input');
const infoDiv = document.querySelector('.container');
const info1Par = document.querySelector('#message-1');
const info2Par = document.querySelector('#message-2');
const infoContainer = document.querySelector('.info-container');
const loadingMsg = document.createTextNode('Loading...');

const fetchWeather = (location) => {
  fetch(`/weather?address=${location}`)
    .then(res => res.json())
    .then(data => renderInfo(data))
    .catch(err => renderInfo(err))
}

const renderInfo = (data) => {
  loadingMsg.remove();
  if (data.error) {
    return (info1Par.textContent = data.error)
  }
  infoContainer.style.display = 'block';
  const { summary, temperature, rainChance } = data.forecast;
  info1Par.textContent = (data.location);
  info2Par.textContent = `${summary} It is ${temperature} degrees Celcius, with a ${rainChance}% of rain.`
}

weatherForm.addEventListener('submit', (e) => {
  const location = weatherInput.value;
  mainContent.appendChild(loadingMsg);
  fetchWeather(location);
  weatherInput.value = '';

  e.preventDefault();

})