import * as d3 from 'd3';
import styled from 'styled-components';

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

const Dropdown = styled.select`
  border: none;
  border-radius: 5px;
  padding: 3px;
  font-size: 1rem;
  color: #ffffff;
  background: #ffffff11;
  :focus {
    outline: none;
  }
  :hover {
    background: #ffffff55;
  }
`;

const Option = styled.option`
  background: #8dcff5;
`;

export default function SideBar({ data, forecastLabel, emoji, symbol }) {
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

  const date = new Date(data?.daily?.time[0]);
  const currDay = days[date?.getDay()];
  const currDate = date?.getDate();
  const currMonth = months[date?.getMonth()];
  const currTemp = data?.current_weather?.temperature;
  
  const currHour =
    new Date().getHours() < 10
      ? '0' + new Date().getHours()
      : new Date().getHours();
  const currMinute =
    new Date().getMinutes() < 10
      ? '0' + new Date().getMinutes()
      : new Date().getMinutes();
  const currTime = currHour + ':' + currMinute;

  const sunrise =
    new Date(data?.daily?.sunrise[0]).getHours() +
    ':' +
    new Date(data?.daily?.sunrise[0]).getMinutes();

  const sunset =
    new Date(data?.daily?.sunset[0]).getHours() -
    12 +
    ':' +
    new Date(data?.daily?.sunset[0]).getMinutes();


  return (
    <Container>
      {currTime}
      <Dropdown>
        <Option value='London'>London</Option>
        <Option value='Paris'>Paris</Option>
      </Dropdown>
      <section style={{ paddingBottom: '2rem' }}>
        <li style={{ fontSize: '2rem' }}>{currDay}</li>
        <li style={{ fontWeight: '300', paddingBottom: '1rem' }}>
          {currDate} {currMonth} 2022
        </li>
        <li style={{ fontWeight: '300' }}></li>
      </section>

      <section style={{ paddingBottom: '1rem' }}>
        <li
          style={{ fontSize: '5rem', paddingBottom: '0.5rem' }}
          dangerouslySetInnerHTML={{ __html: emoji }}
        ></li>
        <li style={{ fontSize: '4rem', fontWeight: '500' }}>
          {currTemp}&#176;C
        </li>
        <li dangerouslySetInnerHTML={{ __html: symbol }}></li>
        <li>{forecastLabel}</li>
      </section>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <section>
          <li style={{ fontWeight: '300' }}>Sunrise</li>
          <li>{sunrise} AM</li>
        </section>
        <section>
          <li style={{ fontWeight: '300' }}>Sunset</li>
          <li>{sunset} PM</li>
        </section>
      </div>
    </Container>
  );
}
