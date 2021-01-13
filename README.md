# WeatherJournal-app :partly_sunny:
## Table Of Contents
 * Overview (#desc)
 + Server-Side(#server)
 - Client-Side(#client)
<a name="desc"></a>
## Weather Journal App Overview
> this project is a practice on how to use Asynchronous JavaScript to create an asynchronous web app that uses Web API and user data to dynamically update the UI.
> as it's a good way to practice js runtime -> node.js and npm
> so we need to install node.js in our editor , and them install node packages usin cmd "npm install package-name" in the terminal
> ###f files hierarchy
> > create folder that will contain ...  
> > * our local server file server.js
> > * our app folder named website which contains our html page , stylin and js file 
<a name="server"></a>
## Server-Side code
> the local server helps us store and retrieve our stored data by creatin a js object "projectData" that acts as endpoint for all routes and two Routes.. 
> ### Get Route : that gets the data stored in "projectData" 
```javascript
//Get Route named "getdata" to return data stored in projectData object
app.get('/getdata', (request,response) => response.send(projectData).status(200).end());
```
> ### Post Route : that sends/saves the data in "projectData" 
```javascript
//Post Route named "savedata" to save data received from the API
app.post('/savedata', (request,response) => {
 projectData= {
     temp: request.body.temp,
     cont: request.body.cont,
     date: request.body.date
 };
 response.send(projectData).status(200).end();
});
```
<a name="client"></a>
## Client-Side code
> in our client side app.js file we define the apikey and our baseurl
```javascript
const apiKey = "&appid=7c22738f56e50fe06a8d3b4f84b2029f&units=metric";
const baseUrl = "http://localhost:8000/";
```
> we create an EventListener that executes an arrow function on btn click, the created arrow functin...
> > stores the data entered by the user in "maData" object
> > then calls apiRespsne(maData.zip) and checks if the zipcode is valid or nor
> > if the zipcode is invalid it returns an alert
> > if it's valid then it call saveToMyServer(maData)
```javascript
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
```
> there are 3 async functions 
> ##### apiResponse(zip) :
>it takes the zipcode entered by the user give it to the Api and waits till the api respond with temperature info in zipInfo
```javascript
async function apiResponse(zip){
    return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip}${apiKey}`)).json()
```
> ##### saveToMyServer(maData) : 
> it stores the data saved in maData object -which contains the temp sent by the api and the user's previously enterd data feelings and the current data - in our local server
```javascript
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
```
> ##### showmaData() : 
> gets the data stored in projectData object using Get route to dynamically update out application UI
```javascript
//at last update our applocation UI
async function showmaData(){
    let response = await fetch(`${baseUrl}getdata`);
    try{
       response.json().then(maData => {
        tempElem.innerText = `temperature in celisus: ${maData.temp}`;
        dateElem.innerText = `Date: ${maData.date}`;
        contElem.innerText = `feelings: ${maData.cont}`
       }).catch(errorCatcher);
    }catch(error){
      errorCatcher(error);
    }
}
```
