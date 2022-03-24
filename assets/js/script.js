var searchBar = document.querySelector("#city");
var searchForm = document.querySelector("#search-form");
var currentWeather = document.querySelector("#current-city");
var forecastContainer = document.querySelector("#forecast");

searchForm.addEventListener("submit", function(event){
    event.preventDefault();
    var city = searchBar.value.trim();
    getCityInfo(city);
    searchBar.value = "";
    setLocalStorage(city);
})
//add event listener to search bar to find the input text
var getCityInfo = function(city){
    var currentApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=1ee273d29337b74fa7d7a2d9da75ae71`;
    fetch(currentApiUrl)
    .then(function(response){
        return response.json();
        
    })
    .then(function(data){
        console.log(data);
        var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${data[0].lat}&lon=${data[0].lon}&exclude=hourly,minutely,alerts&appid=1ee273d29337b74fa7d7a2d9da75ae71`;
        fetch(apiUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var tempElement = document.createElement("p")
            tempElement.textContent = `Max Temperature: ${data.current.temp}` //+ data.current.temp;
            var humidityElement = document.createElement("p")
            humidityElement.textContent = "Humidity: " + data.current.humidity;
            var windElement = document.createElement("p");
            windElement.textContent = "Wind Speed: " + data.current.wind_speed;
            var uvElement = document.createElement("p");
            uvElement.textContent = "U.V. Index: "+ data.current.uvi;
            document.getElementById("current-city").append(tempElement, humidityElement, windElement, uvElement);

            for(var i =1; i < 6; i++){
                var tempElement = document.createElement("p")
                tempElement.textContent = "Predicted Temperature: " + data.daily[i].temp.day;
                var humidityElement = document.createElement("p")
                humidityElement.textContent = "Humidity: " + data.daily[i].humidity;
                var windElement = document.createElement("p");
                windElement.textContent = "Wind Speed: " + data.daily[i].wind_speed;
                // var uvElement = document.createElement("p");
                // uvElement.textContent = "U.V. Index: "+ data.daily[i].uvi;
                document.getElementById(i).append(tempElement, humidityElement, windElement);
            }
        })
    })
    //create local storage
 
}
setLocalStorage = function(data){
    localStorage.setItem(data.name, data.name);
}; 
// getCityInfo("london");