import * as d3 from 'd3';
import SideBar from './SideBar';
import Radial from './RadialChart';
import styled from 'styled-components';
import CardDetail from './CardDetail';
import ChartUpdate from './ChartUpdate';

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
  return (
    <RowContainer1>
      <SideBar />
      <ColContainer>
        <RowCard>
          <CardDetail />
          <CardDetail />
          <CardDetail />
          <CardDetail />
          <CardDetail />
          <CardDetail />
          <CardDetail />
        </RowCard>
        <ChartUpdate />
        <RowContainer2>
          <Radial percent={22} measure="Humidity" />
          <Radial percent={88} measure="Cloudcover" />
          <Radial percent={55} />
        </RowContainer2>
      </ColContainer>
    </RowContainer1>
  );
}
