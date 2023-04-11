import { useState, useEffect } from 'react'
import styled from 'styled-components';
import './App.css'
import sunset from './assets/sunset.jpg';
import misty from './assets/misty.jpg';
import rain from './assets/rain.jpg';
import snow from './assets/snow.jpg';
import cloudy from './assets/cloudy.jpg';

const AppStart = styled.div`
  width: 100%;
  // min-height: -webkit-fill-available;
  height: 100vh;
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;

  :before {
    content: '';
    background: url(${props => props.weatherState}) no-repeat center center/cover;
    position: absolute;
    width: 100%; 
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;
const Container = styled.div`
  max-width: 700px;
  height: 80vh;
  margin: auto;
  padding: 0 1 rem;
  position relative;
  top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TopDiv = styled.div`
  width: 100%;
  margin: 1rem auto;
`;
const BottomDiv= styled.div`
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  width: 100%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.2);
`;

const Location = styled.p``;

const Temp = styled.h1``;

const Description = styled.p`
  position: relative;
  right: -90%;
  transform-origin: 0 0;
  transform: rotate(269deg);
`

const BoldText = styled.p`
  font-weight: 700;
`;

const SearchBar = styled.div`
  text-align: center;
  padding: 1rem;
`;

const SearchBarField = styled.input`
  padding: .7rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.1);

  ::placeholder {
    color: #f8f8f8;
  }
`;



function App() {
  const [data, setData] = useState({})
  const [locationHolder, setLocationHolder] = useState('');
  const [location, setLocation] = useState('Vancouver');
  const [weatherState, setWeatherState] = useState('');

  const url = `https://api.weatherapi.com/v1/current.json?key=41a59b56ef574fc5b2e50908230804&q=${location}`

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        console.log(data);
        setWeatherState(data.current.condition.text.toLowerCase());
    })
    setLocationHolder('');
  }, [location])

  const changeLocation = (event) => {
    if (event.key === 'Enter') {
      setLocation(event.target.value);
    }
  }

  const handleChange = (event) => {
    setLocationHolder(event.target.value);
  }

  function weatherStatePic(weatherState) {
    if (weatherState.includes("mist")) {
      return misty;
    } else if (weatherState.includes("rain")) {
      return rain;
    } else if (weatherState.includes("snow")) {
      return snow;
    } else if (weatherState.includes("cloud")) {
      return cloudy;
    } else {
      return sunset;
    }
  }

  return (

    <AppStart weatherState={weatherStatePic(weatherState)}>
      <SearchBar>
        <SearchBarField
        value={locationHolder}
        onChange={handleChange} 
        onKeyDown={changeLocation}
        placeholder="Enter Location"
        type="text"
      />
      </SearchBar>
      <Container>
        <TopDiv>
          <Location>
            {data.location 
            ? `${data.location.name}, ${data.location.country}`
            : null}
          </Location>
          <Temp>
            {data.current
            ? `${data.current.temp_c.toFixed()}°C`
            : null}
          </Temp>
          <Description>
          {data.current
            ? `${data.current.condition.text}`
            : null}
          </Description>
        </TopDiv>
        <BottomDiv>
          <div className='feels'>
            <BoldText>
            {data.current
            ? `${data.current.feelslike_c.toFixed()}°C`
            : null}
            </BoldText>
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            <BoldText>
            {data.current
            ? `${data.current.humidity}%`
            : null}
            </BoldText>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <BoldText>
            {data.current
            ? `${data.current.wind_kph.toFixed()}km/h`
            : null}
            </BoldText>
            <p>Wind Speed</p>
          </div>
        </BottomDiv>
      </Container>
    </AppStart>
  )
}

export default App
