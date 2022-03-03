import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import LineChart from './components/LineChart';
import SideBar from './components/SideBar';
import Radial from './components/RadialChart';
import styled from 'styled-components';
import CardDetail from './components/CardDetail';
import { fetchData } from './util/API';

const RowContainer1 = styled.div`
  display: flex;
  flex-direction: row;
  padding: 25px 0px;
`;

const RowContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  justify-content: space-around;
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

  const getWeatherData = async () => {
    const response = await fetchData();
    setWeatherData(response);
  };

  useEffect(() => {
    setLoading(true);
    getWeatherData();
    setLoading(false);
  }, []);

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

  // CLOUDCOVER RADIAL
  const currCloudCover =
    weatherData?.hourly?.cloudcover
      ?.slice(0, 24)
      .reduce((prev, curr) => prev + curr) / 24;

  // HUMIDITY RADIAL
  const currHumidity =
    weatherData?.hourly?.relativehumidity_2m
      ?.slice(0, 24)
      .reduce((prev, curr) => prev + curr) / 24;

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
    }
    return { weather, emoji, symbol };
  };

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
          </RowCard>
          <LineChart data={weatherData} />
          <RowContainer2>
            <Radial
              percent={Math.round(currHumidity)}
              measure='Humidity'
            />
            <Radial
              percent={Math.round(currCloudCover)}
              measure='Cloudcover'
            />
            <Radial percent={55} />
          </RowContainer2>
        </ColContainer>
      </RowContainer1>
    );
  }
}
