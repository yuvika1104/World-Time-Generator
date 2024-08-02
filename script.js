const nd= document.querySelector('.delhi');
const tok= document.querySelector('.tokyo');
const ny=document.querySelector('.york');
const lon=document.querySelector('.london');
const search=document.getElementById('search');
const boxtime=document.querySelector('.boxtime');
const boxdate=document.querySelector('.boxdate');
const boxcity=document.querySelector('.boxcity');
const boxlan=document.querySelector('.boxlat');
const boxlon=document.querySelector('.boxlon');
const boxtz=document.querySelector('.boxtimez');
const boxday=document.querySelector('.boxday');
const box=document.getElementById('box');
const invalid = document.getElementById('invalidbox');
const loading= document.getElementById('loading');
const values=document.getElementById('values');


const apikeycity='Insert API Key';

async function updateAllCities() {
    Delhi();
    Tokyo();
    NewYork();
    London();
  }
  
 //Initialize and update every second
  updateAllCities();
  setInterval(updateAllCities, 1000);

async function getCityTime (cityname){
    const cityresponse = await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${cityname}`, {
        method: 'GET', 
        headers: {
          'X-Api-Key': apikeycity
        }
      });
    const data= await cityresponse.json();

    if (data[0]?.latitude === undefined || data[0]?.longitude === undefined) {
    console.error('Latitude or longitude data is missing.');
    
    
  }else
  {
    const latitude=data[0]?.latitude;
    const longitude= data[0]?.longitude;

    const timeresponse=await fetch(`https://api.api-ninjas.com/v1/worldtime?lat=${latitude}&lon=${longitude}`, {
        method: 'GET', 
        headers: {
          'X-Api-Key': apikeycity
        }
        });
    const timedata= await timeresponse.json();
    return [timedata,data];
  }
}
async function Delhi() {
    const data = await getCityTime('New Delhi');
    if (data[0]) {
        const hr = data[0]?.hour;
        const min = data[0]?.minute;
        const time = `${hr}:${min}`;
        nd.innerHTML = time;
    }
}

async function Tokyo() {
    const data = await getCityTime('Tokyo');
    if (data[0]) {
        const hr = data[0]?.hour;
        const min = data[0]?.minute;
        const time = `${hr}:${min}`;
        tok.innerHTML = time;
    }
}

async function NewYork() {
    const data = await getCityTime('New York');
    if (data[0]) {
        const hr = data[0]?.hour;
        const min = data[0]?.minute;
        const time = `${hr}:${min}`;
        ny.innerHTML = time;
    }
}

async function London() {
    const data = await getCityTime('London');
    if (data[0]) {
        const hr = data[0]?.hour;
        const min = data[0]?.minute;
        const time = `${hr}:${min}`;
        lon.innerHTML = time;
    }
}
search.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
      event.preventDefault();
      const city = search.value.trim();
      values.style.display = 'none';
      box.style.display = 'block';
      loading.style.display = 'block';

      // Call the function to start updating the time
      startUpdatingTime(city);
  }
});

function startUpdatingTime(city) {
  // Clear any existing intervals to prevent multiple intervals running at the same time
  if (window.updateInterval) {
      clearInterval(window.updateInterval);
  }

  // Set up an interval to update the time every second
  window.updateInterval = setInterval(async function () {
      const data = await getCityTime(city);
          const hr = data[0]?.hour;
          const min = data[0]?.minute;
          const sec = data[0]?.second;
          const time = `${hr}:${min}:${sec}`;
          const date = data[0]?.date;
          const day = data[0]?.day_of_week;

          boxtime.innerHTML = time;
          boxdate.innerHTML = date;
          boxday.innerHTML = day;
          boxcity.innerHTML = data[1][0]?.name || 'Unknown City';
          boxlan.innerHTML = data[1][0]?.latitude || 'Unknown Latitude';
          boxlon.innerHTML = data[1][0]?.longitude || 'Unknown Longitude';
          boxtz.innerHTML = data[0]?.timezone || 'Unknown Timezone';

          console.log(data);
          loading.style.display = 'none';
          values.style.display = 'block';
  }, 1000); // 1000 milliseconds = 1 second
}
