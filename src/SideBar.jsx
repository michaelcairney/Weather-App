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
  font-family: 'sans-serif';
  font-size: 1.2rem;
  gap: 2rem;
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

export default function SideBar() {
  return (
    <Container>
      <Dropdown>
        <Option value="London">London</Option>
        <Option value="Paris">Paris</Option>
      </Dropdown>
      <section style={{ paddingBottom: '2rem' }}>
        <li style={{ fontSize: '2rem' }}>Tuesday</li>
        <li style={{ fontWeight: '300', paddingBottom: '1rem' }}>
          01 March 2022
        </li>
        <li style={{ fontWeight: '300' }}>Edinburgh</li>
      </section>

      <section style={{ paddingBottom: '1rem' }}>
        <li style={{ fontSize: '4rem', paddingBottom: '1rem' }}>&#128526;</li>
        <li style={{ fontSize: '4rem', fontWeight: '500' }}>4&#176;C</li>
        <li>Sunny</li>
      </section>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <section>
          <li style={{ fontWeight: '300' }}>Sunrise</li>
          <li>6:46 AM</li>
        </section>
        <section>
          <li style={{ fontWeight: '300' }}>Sunset</li>
          <li>5:40 PM</li>
        </section>
      </div>
    </Container>
  );
}
