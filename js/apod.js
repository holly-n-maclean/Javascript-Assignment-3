//Closely following lesson 11 nytimes lesson example for structure
//https://api.nasa.gov/ - for nasa api getting started and available apis
//https://apod.nasa.gov/apod/astropix.html - APOD website
//https://github.com/nasa/apod-api - provides extra information on the api, including available fields


const baseUrl = 'https://api.nasa.gov/planetary/apod';
const key = 'OnIbR9o5oEN0Pq90P3lqRunpOdJhijj5OIzmzLRh';
let url;

//Reference to DOM elements
const dateInput = document.querySelector('#date');
const title = document.querySelector('#title');
const imageDate = document.querySelector('#imageDate');
const apodImg = document.querySelector('#apod');

//Function to fetch APOD
function fetchApod(date = '') { // date may or many not be provided
    url = `${baseUrl}?api_key=${key}`; //base url + api
    //if statement to add date if provided to the url
    if(date) {
        url += `&date=${date}`;
    }

    //fetching data using the combined url
    fetch(url)
        .then(result =>{ return result.json()})
        .then(json =>{displayAPOD(json)})
        .catch(error=>{
            console.log('Error getting APOD:',error);
        });
}

//Function displays the APOD
function displayAPOD(json) {
    title.textContent = json.title;
    imageDate.textContent = json.date;
    apodImg.src = json.url;
    apodImg.alt = json.title;
}

//Event listener chosen date
dateInput.addEventListener('change', () => {
    const chooseDate = dateInput.value;
    if(chooseDate) {
        fetchApod(chooseDate);
    }
});

//Event listener to fetch APOD when page first loads
document.addEventListener('DOMContentLoaded', () => {
    fetchApod();
});