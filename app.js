const form = document.querySelector("section.top-banner form")
const input = document.querySelector(".container input")
const msg = document.querySelector("span.msg")
const list = document.querySelector(".ajax-section ul.cities")
// localStorage.setItem("tokenKeyEncrypted", EncryptStringAES("a81e00cee88a20b37ccecaa137895101"))

localStorage.setItem("tokenKey", "fDtZU2IZlGgyfJpODqOw6CrTLR05jpZJTJi/5iJUxnSzwvzRsa7TnCkgerP75szJ")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWeatherDataFormApi();
})

const getWeatherDataFormApi = async() => {
const tokenKey = DecryptStringAES(localStorage.getItem("tokenKey"));
const inputValue = input.value;
const units = "metric"
const lang = "tr"
const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${tokenKey}&units=${units}&lang=${lang}`;

try {
const response = await axios(url)
console.log(response);
const { main, sys, weather, name } = response.data;

const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

const cityNameSpans = list.querySelectorAll(".city span")
const cityNameSpansArray = Array.from(cityNameSpans)
if(cityNameSpansArray.length > 0){
    const filteredArray = cityNameSpansArray.filter((span) => span.innerText == name);
    if(filteredArray.length >0) {
        msg.innerText = `You already know the weather for ${name}, Please search for another city 😊 `;
        setTimeout(()=> {
            msg.innerText = ""
        },5000)
        form.reset();
        return
    }
}



/* Li oluşturma kısmı*/
const createdLi = document.createElement("li")
createdLi.classList.add("city")
createdLi.innerHTML = `<h2 class="city-name" data-name="${name}, ${ sys.country }">
                              <span>${name}</span>
                              <sup>${sys.country}</sup>
                          </h2>
                          <div class="city-temp">${Math.round( main.temp )}<sup>°C</sup></div>
                          <figure>
                              <img class="city-icon" src="${iconUrl}">
                              <figcaption>${ weather[0].description}</figcaption>
                               </figure>`;
                              
                          
list.prepend(createdLi)                 /* başa ve sona ekliyor .append() ve .appendChild() metodları HTML elementlerine eleman eklemek için kullanılır, ancak farklı şekilde çalışırlar:

.append() metodu, belirtilen elementin içine seçilen elementin sonuna verilen elementi ekler.
.appendChild() metodu ise belirtilen elementin içine seçilen elementin sadece ilk çocuğu olarak verilen elementi ekler.
Kısaca, .append() birden çok element eklerken .appendChild() yalnızca bir element ekler.*/

} catch(error){
    console.log(error);
    msg.innerText `404 (City Not Found)`
    setTimeout(()=>{
        msg.innerText = ""
    },5000)
}
form.reset()
}