import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import LineChart from './LineChart';
import PrecipitationChart from './PrecipitationChart';
import Radial from './RadialChart';

// STYLES
const theme = {
  spaces: {
    mgl: '30px',
  },
  spaces1: {
    mgl: '10px',
  },
};

const RowContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  flex-wrap: wrap;
  align-items: center;
  gap: 10rem;
`;

const Button = styled.button`
  float: left;
  margin-top: 10px;
  width: 10.37rem;
  border: none;
  font-size: 15px;
  padding: 7px;
  background-color: #61bffa;
  color: white;
  margin-left: ${(props) => theme[props.theme].mgl};
  box-shadow: 0 3px 6px 0 #87cefa;
  border-radius: 5px;
  font-family: 'Montserrat';
  transition: ease 0.2s;
  opacity: 0.5;

  &:hover {
    -webkit-transform: scale(1.05);
    -ms-transform: scale(1.05);
    transform: scale(1.05);
    cursor: pointer;
  }

  // STYLE FOR WHEN BUTTON IS ACTIVE
  ${({ active }) =>
    active &&
    `&:hover {
      background-color: rgba(135, 206, 250);
      color: white;
      box-shadow: 0 3px 6px 0 #87cefa;
      cursor: default;
      transform: scale(1);
    }
    opacity: 1;
  `}
`;
Button.defaultProps = {
  theme: 'spaces',
};
export default function ChartUpdate({ data, cardSelect }) {
  // DEFINE DAYS
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // GET DAYS IN ORDER STARTING FROM CURRENT DAY
  var days = data?.daily?.time?.map(
    (time) => daysOfWeek[new Date(time).getDay()],
  );

  // GET CURRENT CLOUD COVER FOR RADIAL
  const currCloudCover =
    data?.hourly?.cloudcover
      ?.slice(0, 24)
      .reduce((prev, curr) => prev + curr) / 24;

  // GET CURRENT HUMIDITY FOR RADIAL
  const currHumidity =
    data?.hourly?.relativehumidity_2m
      ?.slice(0, 24)
      .reduce((prev, curr) => prev + curr) / 24;

  // SET STATE
  const [cloudCover, setCloudCover] = useState(currCloudCover);
  const [humidity, setHumidity] = useState(currHumidity);

  // CREATE VARIABLE FOR THE AMOUNT OF DAYS THE
  // SELECTED DAY IS AFTER THE CURRENT DAY
  var daysAfter = 0;

  // SIDE EFFECT FOR CHANGING THE INFORMATION BASED ON SELECTED DAY
  useEffect(() => {
    daysAfter = days?.findIndex((day) => day === cardSelect);

    setCloudCover(
      data?.hourly?.cloudcover
        ?.slice(daysAfter * 24, (daysAfter + 1) * 24)
        .reduce((prev, curr) => prev + curr) / 24,
    );

    setHumidity(
      data?.hourly?.relativehumidity_2m
        ?.slice(daysAfter * 24, (daysAfter + 1) * 24)
        .reduce((prev, curr) => prev + curr) / 24,
    );
  }, [cardSelect]);

  const types = ['Temperature °C', 'Precipitation (mm)'];
  const [active, setActive] = useState(types[0]);
  return (
    <div>
      <RowContainer2>
        <div>
          {types.map((type) => (
            <Button
              active={active === type}
              onClick={() => setActive(type)}
            >
              {type}
            </Button>
          ))}
        </div>
        <div style={{ display: 'flex', paddingTop: '20px' }}>
          <Radial
            percent={Math.round(humidity ? humidity : currHumidity)}
            measure='Humidity'
          />
          <Radial
            percent={Math.round(
              cloudCover ? cloudCover : currCloudCover,
            )}
            measure='Cloud cover'
          />
        </div>
      </RowContainer2>

      {active === 'Temperature °C' && (
        <LineChart data={data} cardSelect={cardSelect} />
      )}
      {active === 'Precipitation (mm)' && (
        <PrecipitationChart data={data} cardSelect={cardSelect} />
      )}
    </div>
  );
}
