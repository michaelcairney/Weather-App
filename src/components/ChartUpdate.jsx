import { useState } from 'react';
import styled from 'styled-components';
import LineChart from './LineChart';
import PrecipitationChart from './PrecipitationChart';
import Radial from './RadialChart';

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
  background-color: rgba(135, 206, 250);
  color: white;
  margin-left: ${(props) => theme[props.theme].mgl};
  box-shadow: 0 3px 6px 0 #87cefa;
  border-radius: 5px;
  font-family: 'Montserrat';
  transition: ease 0.4s;
  opacity: 0.5;
  &:hover {
    -webkit-transform: scale(1.05);
    -ms-transform: scale(1.05);
    transform: scale(1);
    background: #fff;
    color: #222831;
    cursor: pointer;

    -webkit-box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
  }
  ${({ active }) =>
    active &&
    `
    opacity: 1;
    border: 1px solid;
  `}
`;
Button.defaultProps = {
  theme: 'spaces',
};
export default function ChartUpdate({ data }) {

 // CLOUDCOVER RADIAL
 const currCloudCover =
 data?.hourly?.cloudcover
   ?.slice(0, 24)
   .reduce((prev, curr) => prev + curr) / 24;

// HUMIDITY RADIAL
const currHumidity =
 data?.hourly?.relativehumidity_2m
   ?.slice(0, 24)
   .reduce((prev, curr) => prev + curr) / 24;

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
          <Radial percent={Math.round(currHumidity)} measure='Humidity' />
          <Radial percent={Math.round(currCloudCover)} measure='Cloud cover' />
        </div>
      </RowContainer2>

      {active === 'Temperature °C' && <LineChart data={data} />}
      {active === 'Precipitation (mm)' && (
        <PrecipitationChart data={data} />
      )}
    </div>
  );
}
