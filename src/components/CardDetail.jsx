import styled from 'styled-components';
import { WiDayCloudy } from 'react-icons/wi';

const Card = styled.div`
  box-shadow: 0 3px 6px 0 #87cefa;
  padding: 20px 0;
  background: white;
  font-family: 'Montserrat';
  width: 7.5rem;
  border-radius: 5px;
  color: white;
  background: rgba(135, 206, 250);
  transition: 0.2s;

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

const HighTemp = styled.span`
  margin-bottom: 0.5rem;
`;

const LowTemp = styled.span`
  margin-bottom: 1rem;
  opacity: 0.7;
`;
const WeatherIcon = styled.div`
  margin-bottom: 0.5rem;
  font-size: 25px;
  padding: 10px;
`;
const ForecastLabel = styled.div``;
function CardDetail({ weekday, highTemp, lowTemp, emoji, forecastLabel, symbol }) {
  return (
    <Card>
      <CardDetails>
        <WeekDay>{weekday}</WeekDay>
        <WeatherIcon
          dangerouslySetInnerHTML={{ __html: emoji }}
        ></WeatherIcon>
        <HighTemp>{highTemp}°C  </HighTemp>
        <LowTemp>{lowTemp}°C </LowTemp>
        <ForecastLabel>{forecastLabel}</ForecastLabel>
        <ForecastLabel dangerouslySetInnerHTML={{ __html: symbol }}></ForecastLabel>
      </CardDetails>
    </Card>
  );
}

export default CardDetail;
