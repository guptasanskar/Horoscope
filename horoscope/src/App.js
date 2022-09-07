
import './App.css';
import $ from 'jquery'; 
import { useState } from 'react';

function App() {
  const [userData, setUserData] = useState({
    day:null,
    month:null,
    year:null,
    hour:null,
    min:null,
    lat:null,
    lon:null,
    tzone:null
  });

  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(null);
  console.log(response)
  const DOB = () =>{
    var api = 'planets';
    var userId = '620556';
    var apiKey = 'a9c84b61c6fa75536e134b14d3b68130';
    var data = {
    day:userData.day,
    month:userData.month,
    year:userData.year,
    hour:userData.hour,
    min:userData.min,
    lat:userData.lat,
    lon:userData.lon,
    tzone:userData.tzone
    };
    var request = $.ajax({
    url: "https://json.astrologyapi.com/v1/"+api,
    method: "POST",
    dataType:'json',
    headers: {
    "authorization": "Basic " + btoa(userId+":"+apiKey),
    "Content-Type":'application/json'
    },
    data:JSON.stringify(data)
    });

    request.then( function(resp){
    // console.log(resp);
    setResponse(resp);
    setPage(2);
    }, function(err){
    console.log(err);
    });
  }

  const handleInput = (e) => {
    let variable = e.target.name;
    let value = e.target.value;

    setUserData({...userData, [variable]:value})
  }

  return (
    <div className="App">
      <div className={page !== 1 && 'pagehide'}>
        <h1 className='horoHead'>Horoscope Details</h1>
        <h1>Please Enter your date of birth.</h1>
        
        <div className='input-container'>
          <div>
            <h2>Date</h2>
            <input className='inputNumber' onChange={handleInput} name="day" type="number" placeholder='Date'/>
          </div>
          <div>
            <h2>Month</h2>
            <input className='inputNumber' onChange={handleInput}  type="number" name="month" placeholder='Month'/>
          </div>
          <div>
            <h2>Year</h2>
            <input className='inputNumber' onChange={handleInput}  type="number" name="year" placeholder='Year'/>
          </div>
        </div>

        <div className='inputTime'>
          <h3>Enter birth time</h3>
          <div>
            <input className='inputNumber' onChange={handleInput} name="hour" placeholder='Hour' type="number"/>
            <input className='inputNumber' onChange={handleInput} name="min" placeholder='Minutes' type="number"/>
          </div>
        </div>

        <div className='inputTime'>
          <h3>Enter logitude and latitude of your birth place</h3>
          <div>
            <input className='inputNumber' onChange={handleInput}  name="lon" placeholder='Longitude' type="number"/>
            <input className='inputNumber' onChange={handleInput}  name="lat" placeholder='Latitude' type="number"/>
          </div>
        </div>

        <div className='inputTime'>
          <h3>tZone</h3>
          <div>
            <input className='inputNumber' onChange={handleInput}  name="tzone" placeholder='tZone' type="number"/>
          </div>
        </div>
        <button id="submit" onClick={DOB}>SUBMIT</button>
      </div>

      {response!== null &&
        <div className={page === 1 && 'pagehide'}>
          <h1 className='horoHead'>Horoscope Details</h1>
          <div className='horoscope-container'>
            {response.map((item) => (
            <div className='horoscope'>
              {console.log("dsfa",item)}
              <h1>{item.name}</h1>
              <h3>Nakshatra: {item.nakshatra}</h3>
              <h3>Nakshatra Lord: {item.nakshatraLord}</h3>
              <h3>Planet awastha: {item.planet_awastha}</h3>
              <h3>Sign: {item.sign}</h3>
              <h3>Sign Lord: {item.signLord}</h3>
            </div>
            ))}
          </div>

          <button id='back' onClick={() => setPage(1)}>BACK</button>
        </div>
      }
      <div>

      </div>
    </div>
  );
}

export default App;
