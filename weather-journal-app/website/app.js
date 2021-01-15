/* Global Variables */
//variables for elements
const zipElem = document.getElementById('zip');
const btnElem = document.getElementById('generate');
const feelingsElem = document.getElementById('feelings');
const dateElem = document.getElementById('date');
const tempElem = document.getElementById('temp');
const contElem = document.getElementById('content');
//Api and localserver url
const apiKey = "&appid=7c22738f56e50fe06a8d3b4f84b2029f&units=metric";
const baseUrl = "http://localhost:8000/";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();
//add Eventlistener on click on myBtn to send zipcode to api and save/post the response of api to our local server 
btnElem.addEventListener('click',() => {
 let maData = {
     zip: zipElem.value,
     cont: feelingsElem.value,
     date: newDate
 };
 //get temp info 
 apiResponse(maData.zip).then(zipInfo => {
     //checks if zip is correct 
  if(zipInfo.cod != 200){                     //  if not ,alert with place not found  
      alert('place not found')
  }else{
    maData.temp = zipInfo.list[0].main.temp;    // if exist,then add temp to maData and save data to the server
    saveToMyServer(maData);
  }
     
}).catch(errorCatcher);
 
});

/*functions*/
function errorCatcher(error){
    console.error('ERROR',error)
}
//-----------
async function apiResponse(zip){
    return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip}${apiKey}`)).json()
}
//------------
async function saveToMyServer(maData){
    let response = await fetch(`${baseUrl}savedata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maData),
    });
    try{
        response.json().then( maData => {
            if(!response.ok){
                alert('data not saved')
            }else{
                showmaData();
            }
        }).catch(errorCatcher);
    }catch(error){
      errorCatcher(error);
    }
}
//at last update out applocation UI
async function showmaData(){
    let response = await fetch(`${baseUrl}getdata`);
    try{
       response.json().then(maData => {
        tempElem.innerHtml = `temperature in celisus: ${maData.temp}`;
        dateElem.innerHtml = `Date: ${maData.date}`;
        contElem.innerHtml = `feelings: ${maData.cont}`
       }).catch(errorCatcher);
    }catch(error){
      errorCatcher(error);
    }
}
