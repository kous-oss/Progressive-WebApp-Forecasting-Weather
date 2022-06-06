import React,{useState} from 'react';

import { fetchData } from './fetchData';

import './App.css';

const App = () => {

    const [query,setQuery]  = useState('');
    const [waetherData,setWaetherData] = useState('');

    const search = async(e) => {
        if(e.key === 'Enter'){

            fetchData(query).then(res => {
                console.log(res);
                setWaetherData(res);
                
            })
            .catch(err => {
                console.log(err);
            })
        }
    }


    return (
        <div className='main-container'>
            <input className='search' type='text' placeholder='Enter A Location/City...' value={query} onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
            />

            {waetherData && (
                <div className='city'>
                    <h2 className='city-name'>
                        <span>{waetherData.name}</span>
                        <sup>{waetherData.sys.country}</sup>
                    </h2>

                    <div className='city-temp'>
                       <span> Temp: {Math.round(waetherData.main.temp)} <sup>&deg;K</sup></span>
                      <span> Wind Speed : {waetherData.wind.speed} kmph</span> 

                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${waetherData.weather[0].icon}@2x.png`} alt={waetherData.weather[0].description} />
                        <p>{waetherData.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;