const API_KEY = '0013e87f79c78643040487f0f361fb0a';
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

async function getWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        updateWeatherUI(data);
        setBackground(data);
    } catch (error) {
        alert('City not found!');
    }
}

function updateWeatherUI(data) {
    document.querySelector('.location').textContent = `${data.name}, ${data.sys.country}`;
    document.querySelector('.temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector('.description').textContent = data.weather[0].description;
}

function setBackground(data) {
    const body = document.body;
    body.className = ''; // Reset classes
    
    if (data.weather[0].main === 'Rain') {
        body.classList.add('rainy');
    } else if (data.weather[0].main === 'Snow') {
        body.classList.add('snowy');
    } else if (data.main.temp > 25) {
        body.classList.add('sunny');
    } else {
        body.style.background = '#f0f0f0';
    }
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    }
});