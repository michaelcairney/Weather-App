import styled from 'styled-components';
import { BsSun } from 'react-icons/bs';

const Card = styled.div`
  box-shadow: 0 3px 6px 0 #87cefa;
  padding: 20px 0;
  background: white;
  font-family: 'Montserrat';
  width: 7.5rem;
  border-radius: 5px;
  color: white;
  background: rgba(135, 206, 250);
  transition: 0.4s;

  :hover {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.05);
    background: #fff;
    color: #222831;
    cursor: pointer;

    -webkit-box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
  }
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5 rem;
`;

const WeekDay = styled.span`
  margin-bottom: 0.5 rem;
`;

const Condition = styled.span`
  margin-bottom: 0.5 rem;
`;
const WeatherIcon = styled.div`
  margin-bottom: 0.5 rem;
`;
const ForecastLabel = styled.p``;
function CardDetail({ weekday, temperature, weatherIcon, forecastLabel }) {
  return (
    <Card>
      <CardDetails>
        <WeekDay>Mon</WeekDay>
        <WeatherIcon>
          <BsSun
            style={{
              color: '#faeb7c',
              fontSize: '20px',
              padding: '10px',
            }}
          />
        </WeatherIcon>
        <Condition>20°C</Condition>
        <ForecastLabel>Sunny</ForecastLabel>
      </CardDetails>
    </Card>
  );
}

export default CardDetail;
