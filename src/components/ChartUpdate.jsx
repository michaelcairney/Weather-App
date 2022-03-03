import { useState } from 'react';
import styled from 'styled-components';
import LineChart from './LineChart';
import PrecipitationChart from './PrecipitationChart';

const theme = {
  spaces: {
    mgl: '30px',
  },
  spaces1: {
    mgl: '10px',
  },
};

const Button = styled.button`
  float: left;
  margin-top: 10px;
  width: 9.37rem;
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
  const types = ['Temperature', 'Precipitation'];
  const [active, setActive] = useState(types[0]);
  return (
    <div>
      {types.map((type) => (
        <Button active={active === type} onClick={() => setActive(type)}>
          {type}
        </Button>
      ))}
      {active === 'Temperature' && <LineChart data={data} />}
      {active === 'Precipitation' && <PrecipitationChart data={data}/>}
    </div>
  );
}
