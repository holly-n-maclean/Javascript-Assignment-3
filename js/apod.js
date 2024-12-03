//Closely following lesson 11 nytimes lesson example for structure
//https://api.nasa.gov/ - for nasa api getting started and available apis
//https://apod.nasa.gov/apod/astropix.html - APOD website
//https://github.com/nasa/apod-api - provides extra information on the api, including available fields to use
//https://barker.codes/blog/how-to-get-todays-date-in-vanilla-js/ - used to learn to get todays date in yyyy-mm-dd format
//CAN USE DATE 2022-01-25 TO TEST VIDEO (since most entries are images)
//https://dev.to/supunkavinda/javascript-and-iframes-87 - used to learn about iframes for embedding video entries on page

//Base url and api key for APOD
const baseUrl = 'https://api.nasa.gov/planetary/apod';
const key = 'OnIbR9o5oEN0Pq90P3lqRunpOdJhijj5OIzmzLRh';
let url;

//Reference to DOM elements
const dateInput = document.querySelector('#date');
const title = document.querySelector('#title');
const imageDate = document.querySelector('#imageDate');
const apod = document.querySelector('#apod');
const explanation = document.querySelector('#explanation');
const copyright = document.querySelector('#copyright');

//Date handling for min and max date for picking date
//takes min date as the first APOD img, and max is current date
const firstDate = '1995-06-16'; 
const currentDate =new Date().toISOString().slice(0, 10); //gets todays date in yyyy-mm-dd format
dateInput.min = firstDate;
dateInput.max = currentDate;

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
        apod.innerHTML = ''; 

        //checks media type
        if(json.media_type === 'video') { 
            //creates iframe element for video
            const iframe = document.createElement('iframe');
            //iframe attributes
            iframe.src = json.url;
            iframe.width = '100%';
            iframe.height = '450px';
            //append iframe to apod
            apod.appendChild(iframe);
        } 
        else if(json.media_type === 'image') {
            //creates image element for image
            const img = document.createElement('img');
            //image attributes
            img.src = json.url;
            img.alt = json.title;
            //append image to apod
            apod.appendChild(img);
        }
        //display title, date, etc.
        title.textContent = json.title;
        imageDate.textContent = `Date: ${json.date}`;
        explanation.textContent = json.explanation 
        copyright.textContent = json.copyright ? `Credit: ${json.copyright}` : ''; }

//Event listener chosen date
dateInput.addEventListener('change', () => {
    const chooseDate = dateInput.value;
    //if statement to compare dates

    if(chooseDate > currentDate) {
        alert('Please choose a date previous to today');
    } 
    else if(chooseDate < firstDate) {
        alert('Astronomy Picture of the Day started on June 16, 1995');
    } else {
        fetchApod(chooseDate);
    }
});

//Event listener to fetch APOD when page first loads
document.addEventListener('DOMContentLoaded', () => {
    fetchApod();
});