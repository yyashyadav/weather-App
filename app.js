const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");

const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const grantAccessContainer=document.querySelector(".grant-location-container");
const userInfoContainer=document.querySelector(".user-info-container");


let currentTab=userTab;
const API_KEY="d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab");

// ho sakta hai coordinates phele se hi pade ho 
getFromSessionStorage();

// for switching the tab 

function switchTab(clickedTab){
    if(clickedTab!=currentTab){
        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");
    }
    if(!searchForm.classList.contains("active")){

        // search form is invisible here and other are visible means we have to active on search tab after switvhing
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");
    }
    else{
        // ab yaha pe search tab active and after switch we have to show weather tab or your weather 
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        // now we active the user container only when we get the user coordinates
        getFromSessionStorage();

    }
}

function getFromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){

        // agar local coordinate nahi mile means acces allow nahi kari abhi tak 

        grantAccessContainer.classList.add("active");
    }
    else{

        // coordinate mil gaye toh hum ab user contaimer ko active kar denge  
        const coordinates=JSON.parse(localCoordinates)  ;
        // hum yaha se weather fach karenge through api
        fetchUserWeatherInfo(coordinates);       
    }

}

 async function fetchUserWeatherInfo(coordinates){
    const {lat,lon}=coordinates;

    // toh ab hum grant access wale container ko remove kaer denge 
    grantAccessContainer.classList.remove("active");
    //  loading screen ko active kar denge 
    loadingScreen.classList.add("active");

    // api call   
    try {
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data= await response.json();
        // ab yaha hum loding screen ko inactive kar denge 
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        // iske baad renderui wala function data ki value ui mein bhegega
        renderWeatherInfo(data);

    } 
    catch (err) {
        loadingScreen.classList.remove("active");
    }

}


userTab.addEventListener("click",()=>{
    switchTab(userTab);
});

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
});



// hee we render the data in the user-info-container 

function renderWeatherInfo(weatherInfo){
    // yaha pe hum user-info-container ke element komaceess karenge so that we can pass the data into them

    const cityName=document.querySelector("[data-cityName]");
    const countryIcon=document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-weatherDesc]");
    const weatherIcon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");
      

    const windspeed=document.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");
    const  cloudiness=document.querySelector("[data-cloudiness]");

    // from here we fetch the data 

    cityName.innerText=weatherInfo?.name;

    // this to use to frtch image and for desc fo for chatGpt
    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText=weatherInfo?.weather?.[0]?.description;
    weatherIcon.src=`https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText=`${Math.round(weatherInfo?.main?.temp - 273.15)}°C`; 
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`
};



// ab hum yaha se grant access wale button pe event listner apply karenge
const grantAccessButton=document.querySelector("[data-grantAccess]");


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("location not accessed");
    }
}


function showPosition(position){
   const userCoordinate={
    lat:position.coords.latitude,
    lon:position.coords.longitude
   }

   sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinate));

   fetchUserWeatherInfo(userCoordinate); 
}
grantAccessButton.addEventListener("click",getLocation);

const searchInput=document.querySelector("[data-seachInput]");

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value;

    if(cityName==''){
        return;
    }
    else{
        fetchSearchWeatherInfo(cityName);

    }
})

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    try {
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data=await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (error) {
        loadingScreen.classList.remove("active");
        alert("Failed to fetch weather information");
    }
}