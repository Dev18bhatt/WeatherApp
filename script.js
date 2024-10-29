document.addEventListener('DOMContentLoaded', () => {

    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn")
    const weatherInfo = document.getElementById('weather-info');
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');

    const errorMessageDisplay = document.getElementById('error-message');

    const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; //env variables


    getWeatherBtn.addEventListener('click', async (event) => {
        const cityName = cityInput.value.trim(); // Get the actual input value

        try {
            const weatherData = await fetchWeatherData(cityName); // Pass the name to the function
            showWeatherData(weatherData);
        }
        catch (err) {
            console.log(err);
            showError();
        }
    });

    async function fetchWeatherData(cityName) {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City Not found');
        }
        else {
            const data = await response.json();
            return data;
        }
    }
    function showWeatherData(weatherData) {
        console.log(weatherData);
        const { name, main, weather } = weatherData;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = ` Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

        weatherInfo.classList.remove('hidden');
        errorMessageDisplay.classList.add('hidden');
    }
    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessageDisplay.classList.remove('hidden');
    }
})