const renderWeatherData=(data)=>{
    console.log(data)

}

// const getWeatherData=async([lat,long])=>{
//    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a9df065b8ef53dfce113062db0874296`)
//    // console.log(response)
//     //console.log(response.weather)
//    const data=await response.json()
//     console.log(data)
//     console.log(data.weather)
//   // renderWeatherData(data)
    
   
// }

const renderData=(data)=>{
let maindivElem=document.getElementById("countryData")
for(let country of data)
{
    let divElem=document.createElement('div');
    divElem.classList.add('col-12')
    divElem.classList.add("col-md-4")
    divElem.classList.add("col-lg-4")
    divElem.classList.add('card')
//for name
    let nameElem=document.createElement('p')
    nameElem.innerHTML=country.name
    nameElemClass=["nameElem"]
    nameElemClass.forEach((style) => nameElem.classList.add(style));
    divElem.appendChild(nameElem)

    //for image
    let flagElement= document.createElement("img")
    flagElement.src=country.flag
  
    //styling for image
    flagClass=["m-2", "img-fluid", "rounded" ,"h-100"]
    flagClass.forEach((style) => flagElement.classList.add(style));
    divElem.appendChild(flagElement)
 

    //displaying captial name
    let capitalElem= document.createElement("h6")
    capitalElem.innerHTML=country.capital
    capitalClass=["capName"]
    capitalClass.forEach((style) => capitalElem.classList.add(style));
    divElem.appendChild(capitalElem)

    //creating a button
    let weatherButton= document.createElement("button")
    weatherButton.innerHTML="Get Weather deets"
    buttonClass=["btn" , "btn-outline-dark" , "w-50" , "d-block" , "mx-auto" , "my-4"]
    buttonClass.forEach((style) => weatherButton.classList.add(style));
   
   //weatherButton.onclick="getWeatherData(country.latlng)"
 //weatherButton.addEventListener("click", () => { getWeatherData(country.latlng); })
 weatherButton.addEventListener("click",function(name){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+country.capital+'&appid=a9df065b8ef53dfce113062db0874296')
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        var modalWrap=null

        if (modalWrap !== null) {
            modalWrap.remove();
          }
        var x=data.weather[0].icon
        console.log(x)
          modalWrap = document.createElement('div');
          modalWrap.innerHTML = `
            <div class="modal fade" tabindex="-1">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Weather Status &#128166 &#128171</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  
                        <h2 class="cname">&#127757 ${data.name} </h2>
                        <h2 class="temp"> <i class="fa-solid fa-temperature-three-quarters p-1"></i>${data.main.temp}&#176F</h2>
                        <p class="feels">Feels like: ${data.main.feels_like}</p>
                        <p class="desc">${data.weather[0].description}</p>

                        <img src='https://openweathermap.org/img/wn/${x}@4x.png' class="weaicon">

                        <p class="bottom">&#x1F31E Sunrise: ${data.sys.sunrise}</p>
                        <p class="bottom">&#x1F31E Sunset: ${data.sys.sunset}</p>
                        <p class="bottom">&#127756 Wind speed${data.wind.speed}</p>
                  </div>
                </div>
              </div>
            </div>
          `;
        
        //  modalWrap.querySelector('.modal-success-btn').onclick = callback;
        
          divElem.append(modalWrap);
        
          var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
          modal.show();
    })

 })






   divElem.appendChild(weatherButton)
   

    maindivElem.appendChild(divElem);
}
}


const url="https://restcountries.com/v2/all"
const getCountries=async(url)=>{
    const resp=await fetch(url)
    const data=await resp.json()
    renderData(data)
    
}
//document.write(getData(url))
console.log(getCountries(url))
