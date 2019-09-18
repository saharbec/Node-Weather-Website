const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('input');
const infoDiv = document.querySelector('.container');
const info1Par = document.querySelector('#message-1');
const info2Par = document.querySelector('#message-2');

const fetchWeather = (location) => {
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => res.json())
    .then(data => renderInfo(data))
    .catch(err => renderInfo(err))
}

const renderInfo = (data) => {
  console.log(data);
  if (data.error) {
    return (info1Par.textContent = data.error)
  }
  const { summary, temperature, rainChance } = data.forecast;
  info1Par.textContent = (data.location);
  info2Par.textContent = `${summary} It is ${temperature} degrees Celcius, with a ${rainChance}% of rain.`
}

weatherForm.addEventListener('submit', (e) => {
  const location = weatherInput.value;
  info1Par.textContent = 'Loading...'
  fetchWeather(location);
  weatherInput.value = '';

  e.preventDefault();

})