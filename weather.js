loc = document.getElementById('location');


timeEl = document.getElementById('time');
dateEl = document.getElementById('date');

// date = document.querySelector('.date');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu','Fri', 'Sat'];
setInterval(() => {
    const time = new Date();
    const month = time.getMonth() ;
    const day = time.getDay();
    const date = time.getDate();
    const hour = time.getHours() ;
    const minutes = time.getMinutes() >=10 ? time.getMinutes() : "0"+time.getMinutes();
    const hour24 = hour>=13 ? hour%12:hour; 
    
    const ampm = hour >= 12 ? 'PM':'AM';

    timeEl.innerHTML = hour24 + ':' + minutes +" " + ampm;
    dateEl.innerHTML = '<h3>' + days[day] +","+ date+" "+ months[month] +'</h3>'
},1000);

const API_key = '4f365f503b22394f46fb723d29231df6';
getWeatherData();
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success)=>{
        console.log(success);
        var lat = success.coords.latitude;
        var lon = success.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${API_key}`).then(res => res.json()).then(data =>{
            console.log(data);
            showWeatherData(data);
        })
    }
)}
 function showWeatherData(data){
    const tempe = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humid = document.getElementById('humidity');
    var {humidity,temp} = data.current;
    var {main} = data.current.weather[0];
    description.innerHTML = '<h3>' + main + '</h3>'
    tempe.innerHTML = `<h3> ${temp}&deg</h3>`;
    humid.innerHTML = `<h3>Humidity :</h3>
                       <h3> ${humidity}% </h3>`;

 }

