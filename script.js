/*
TODO:
- add functionality for displaying what clothes to wear on the right side
- better background picture
- animations to display data

*/

async function getWeather(location){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=b1f049f82b24f0b013d420e76a5f87a3`, {mode: 'cors'});
        const data = await response.json();
        const processedWeather = processData(data);
        displayData(processedWeather);
    } catch (error) {
        window.alert("could not find this location");
    }
    
}
getWeather("Waterloo");

function processData(data){
    const dataObject = {
        temp: Math.round(data.main.temp - 273),
        feels_like: Math.round(data.main.feels_like - 273),
        maxtemp: Math.round(data.main.temp_max - 273),
        mintemp: Math.round(data.main.temp_min - 273),
        wind: data.wind.speed,
        description: data.weather[0].description,
        location: data.name,
        country: data.sys.country
    };
    return dataObject;
}

const form = document.querySelector(".form");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.querySelector(".location").value;
    getWeather(location);
});

function displayData(weather){
    const content = document.querySelector(".content");
    content.innerHTML = `
    <div class ="name">${weather.location}, ${weather.country}</div>
    <div class = "bottom"> 
        <div class = "temps">
            <div class ="temp">${weather.temp}&#8451;</div>
            <div class ="max">Max:  ${weather.maxtemp}&#8451; </div>
            <div class = "min"> Min:  ${weather.mintemp}&#8451;</div>
        </div>
        <div class = "other">
        <div class ="description">${weather.description}</div>
            <div class ="wind">Wind: ${weather.wind} mph</div>
        </div>
    </div>`
    
    

}