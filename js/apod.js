const baseUrl = 'https://api.nasa.gov/planetary/apod';
const key = 'OnIbR9o5oEN0Pq90P3lqRunpOdJhijj5OIzmzLRh';
let url;

//Reference to DOM elements
const dateInput = document.querySelector('.date');
const title = document.querySelector('.title');
const date = document.querySelector('.date');
const apodImg = document.querySelector('.apod');

//Function to fetch APOD
function fetchApod(date = '') { // date may or many not be provided
    url = `${baseUrl}?api_key=${key}`; //base url + api
    //if statement to add date if provided to the url
    if(date) {
        url += `&date=${date}`;
    }

    //fetching using the combined url
    fetch(url)
        .then(result =>{ return result.json()})
        .then(json =>{displayAPOD(json)})
        .catch(error=>{
            console.log('Error getting APOD:',error);
        });
}

