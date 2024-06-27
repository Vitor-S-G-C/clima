const apiKey = '2925bc2c8fa7783264acf86a9feccb07';

document.getElementById('weatherForm').addEventListener('submit', handleGetWeather);

async function handleGetWeather(event) {
    event.preventDefault();
    const input = document.querySelector('input');
    const location = input.value;

    if (!location) {
        return alert("Localidade inválida");
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}&lang=pt_br`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert("Ocorreu um erro ao buscar os dados do clima");
    }
}

function displayWeather(data) {
    const { name, sys, weather, main, wind } = data;
    const countryFlagUrl = `https://flagcdn.com/${sys.country.toLowerCase()}.svg`;
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    document.getElementById('temperature').textContent = `${main.temp}°C`;
    document.getElementById('weatherIcon').src = weatherIconUrl;
    document.getElementById('weatherDescription').textContent = weather[0].description;
    document.getElementById('cityName').textContent = `${name}, ${sys.country}`;
    document.getElementById('countryFlag').src = countryFlagUrl;
    document.getElementById('windSpeed').textContent = `${wind.speed} KM/h`;
    document.getElementById('humidity').textContent = `${main.humidity}%`;
}
