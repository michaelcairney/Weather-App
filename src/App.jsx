import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import LineChart from './components/LineChart';
import SideBar from './components/SideBar';
import Radial from './components/RadialChart';
import styled from 'styled-components';
import CardDetail from './components/CardDetail';
import { fetchData } from './util/API';
import ChartUpdate from './components/ChartUpdate';

const RowContainer1 = styled.div`
  display: flex;
  flex-direction: row;
  padding: 25px 0px;
`;

const RowContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const ColContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #1111;
  padding: 20px 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const RowCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 5px;
  gap: 10px;
`;

export default function App() {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState({
    lat: 51.5002,
    lng: -0.1262,
  });

  const getWeatherData = async (lat, lng) => {
    const response = await fetchData(lat, lng);
    setWeatherData(response);
  };

  useEffect(() => {
    setLoading(true);
    getWeatherData(coords.lat, coords.lng);
    setLoading(false);
  }, [coords]);

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  var days = weatherData?.daily?.time?.map(
    (time) => daysOfWeek[new Date(time).getDay()],
  );

  // GET APPROPRIATE INFO BASED ON API WEATHERCODE
  const getWeatherCode = (code) => {
    switch (code) {
      default:
        var weather = 'Not found';
        var emoji = null;
        var symbol = null;
      case 0:
        weather = 'Clear sky';
        emoji = '&#128526;';
        symbol = '&#x2600';
        break;
      case 1:
        weather = 'Mainly clear';
        emoji = '&#128578;';
        symbol = '&#x2600;';
        break;
      case 2:
        weather = 'Partly cloudy';
        emoji = '&#128527;';
        symbol = '&#x1F324;';
        break;
      case 3:
        weather = 'Overcast';
        emoji = '&#128528;';
        symbol = '&#x2601;';
        break;
      case 61:
        weather = 'Slight rain';
        emoji = '&#128531;';
        symbol = '&#x1F327;';
        break;
      case 63:
        weather = 'Moderate rain';
        break;
      case 65:
        weather = 'Heavy rain';
        break;
      case 80:
        weather = 'Slight rain showers';
        emoji = '&#128546;';
        symbol = '&#x2602;';
        break;
    }
    return { weather, emoji, symbol };
  };

  console.log(coords);

  if (loading) {
    return <p>loading</p>;
  } else {
    return (
      <RowContainer1>
        <SideBar
          data={weatherData}
          forecastLabel={
            getWeatherCode(weatherData?.current_weather?.weathercode)
              .weather
          }
          emoji={
            getWeatherCode(weatherData?.current_weather?.weathercode)
              .emoji
          }
          symbol={
            getWeatherCode(weatherData?.current_weather?.weathercode)
              .symbol
          }
          setCoords={setCoords}
          coords={coords}
        />
        <ColContainer>
          <RowCard>
            {days?.map((day, index) => (
              <CardDetail
                weekday={day}
                forecastLabel={
                  getWeatherCode(
                    weatherData?.daily?.weathercode[index],
                  ).weather
                }
                emoji={
                  getWeatherCode(
                    weatherData?.daily?.weathercode[index],
                  ).emoji
                }
                symbol={
                  getWeatherCode(
                    weatherData?.daily?.weathercode[index],
                  ).symbol
                }
                highTemp={
                  weatherData?.daily?.temperature_2m_max[index]
                }
                lowTemp={
                  weatherData?.daily?.temperature_2m_min[index]
                }
              />
            ))}
          </RowCard>{' '}
          {/* <RowContainer2>
            <Radial
              percent={Math.round(currHumidity)}
              measure='Humidity'
            />
            <Radial
              percent={Math.round(currCloudCover)}
              measure='Cloudcover'
            />
          </RowContainer2> */}
          <ChartUpdate data={weatherData} />
        </ColContainer>
      </RowContainer1>
    );
  }
}
