import * as d3 from 'd3';
import LineChart from './LineChart';
import SideBar from './SideBar';
import Radial from './RadialChart';
import styled from 'styled-components';

const RowContainer1 = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 15px;
  justify-content: center;
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
`;

export default function App() {
  return (
    <RowContainer1>
      <SideBar />
      <ColContainer>
        <LineChart />
        <RowContainer2>
          <Radial percent={22} measure="Humidity"/>
          <Radial percent={88} measure="Cloudcover"/>
          <Radial percent={55} />
        </RowContainer2>
      </ColContainer>
    </RowContainer1>
  );
}
