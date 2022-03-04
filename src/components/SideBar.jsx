import styled from 'styled-components';
import cities from 'cities.json';
import { useEffect, useState } from 'react';

// STYLES
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(25deg, #0378bdd2, #83deffd2);
  color: white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 10px 15px;
  width: 15rem;
  font-family: 'Montserrat';
  font-size: 1.2rem;
  gap: 1rem;
  list-style: none;
`;

const Dropdown = styled.input`
  border: none;
  border-radius: 5px;
  padding: 3px;
  font-size: 1rem;
  color: #ffffff;
  background: #ffffff55;
  :focus {
    outline: none;
  }
  :hover {
    background: #ffffffa0;
  }
  ::placeholder {
    color: #ffffffa7;
  }
`;

export default function SideBar({
  data,
  forecastLabel,
  emoji,
  symbol,
  setCoords,
}) {
  // DEFINE DAYS AND MONTHS
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // GET CURRENT CALENDAR INFORMATION
  const date = new Date();
  const currDay = days[date.getDay()];
  const currDate = date.getDate();
  const currMonth = months[date.getMonth()];

  // GET CURRENT TEMPERATURE USING API
  const currTemp = data?.current_weather?.temperature;

  // GET CURRENT TIME INFORMATION
  const currHour =
    new Date().getHours() < 10
      ? '0' + new Date().getHours()
      : new Date().getHours();
  const currMinute =
    new Date().getMinutes() < 10
      ? '0' + new Date().getMinutes()
      : new Date().getMinutes();
  const currTime = currHour + ':' + currMinute;

  // GET SUNRISE INFO FROM API
  const sunrise = new Date(data?.daily?.sunrise[0]);
  const sunriseHour =
    sunrise?.getHours() < 10
      ? '0' + sunrise?.getHours()
      : sunrise?.getHours();
  const sunriseMinute =
    sunrise?.getMinutes() < 10
      ? '0' + sunrise?.getMinutes()
      : sunrise?.getMinutes();

  // GET SUNSET INFO FROM API
  const sunset = new Date(data?.daily?.sunset[0]);
  const sunsetHour =
    sunset?.getHours() < 10
      ? '0' + sunset?.getHours()
      : sunset?.getHours();
  const sunsetMinute =
    sunset?.getMinutes() < 10
      ? '0' + sunset?.getMinutes()
      : sunset?.getMinutes();

  const [input, setInput] = useState('London, GB');
  const [myCities, setMyCities] = useState(cities);

  // SIDE EFFECT FOR CHANGING SEARCH BAR AUTOCOMPLETE SUGGESTIONS
  useEffect(() => {
    setMyCities(
      cities.filter((city) =>
        input
          ? city.name.toLowerCase().includes(input.toLowerCase())
          : city,
      ),
    );
    const cityAlt = cities.map(
      (city) => city.name + ', ' + city.country,
    );
    if (cityAlt.includes(input)) {
      const cityIndex = cityAlt.findIndex((city) => city === input);
      const citySelected = cities[cityIndex];
      setCoords({ lat: citySelected.lat, lng: citySelected.lng });
    }
  }, [input]);

  return (
    <Container>
      {currTime}
      <li> Current weather</li>
      <Dropdown
        id='searchbar'
        list='cities'
        placeholder='Search for location...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <datalist type='text' placeholder='Search..' id='cities'>
        {myCities.slice(0, 10).map((city) => (
          <option
            value={city.name + ', ' + city.country}
            key={city.name}
          />
        ))}
      </datalist>
      <section style={{ paddingBottom: '1rem' }}>
        <li style={{ fontSize: '2rem' }}>{currDay}</li>
        <li style={{ fontWeight: '300', paddingBottom: '1rem' }}>
          {currDate} {currMonth} 2022
        </li>
      </section>
      <section style={{ paddingBottom: '2rem' }}>
        <li
          style={{ fontSize: '5rem', paddingBottom: '2rem' }}
          dangerouslySetInnerHTML={{ __html: emoji }}
        ></li>
        <li style={{ fontSize: '4rem', fontWeight: '500' }}>
          {currTemp}&#176;C
        </li>
        <li dangerouslySetInnerHTML={{ __html: symbol }}></li>
        <li>{forecastLabel}</li>
      </section>
      <div style={{ display: 'flex', gap: '3rem' }}>
        <section>
          <li style={{ fontWeight: '300' }}>Sunrise</li>
          <li>{sunriseHour + ':' + sunriseMinute} </li>
        </section>
        <section>
          <li style={{ fontWeight: '300' }}>Sunset</li>
          <li>{sunsetHour + ':' + sunsetMinute} </li>
        </section>{' '}
      </div>{' '}
      <li style={{fontSize: '1rem', fontWeight: '100'}}>GMT</li>
    </Container>
  );
}
