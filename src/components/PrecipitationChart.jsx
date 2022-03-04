import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
import useWindowSize from '../util/useWindowSize';

function LineChart({ data, cardSelect }) {
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
  const days = data?.daily?.time?.map(
    (time) => daysOfWeek[new Date(time).getDay()],
  );

  // GET CURRENT TIME
  const currHour = new Date().getHours();
  const currDate = new Date().getDate();

  // GET PRECIPITATION FOR THE WEEK
  const temps = data?.hourly?.precipitation?.slice(currHour);
  const times = data?.hourly?.time?.slice(currHour);
  const forecast = temps?.map((item, index) => [
    item,
    new Date(times[index]),
  ]);
  var daysAfter = 0;

  const svgRef = useRef();
  const size = useWindowSize();
  const margin = { top: 0, bottom: 50, left: 20, right: 110 };
  const height = size.height;
  const width = size.width;

  // INSERT TEXT TAGS ON INITIALISATION
  const labels = forecast?.map((val) => <text key={Math.random()} />);

  useEffect(() => {
    const Tooltip = d3
    .select('.div_temp')
    .append('div')
    .style('display', 'none')
    .attr('class', 'tooltip')
    .style('font-family', 'Montserrat')
    .style('font-size', '15px')
    .style('background-color', '#0378bdd2')
    .style('border', 'none')
    .style('border-radius', '5px')
    .style('padding', '8px')
    .style('position', 'absolute')
    .style('opacity', 0.8)
    .style('color', 'white');

    // Function for displaying tool tip
    const mouseover = function (d) {
      Tooltip.style('display', 'block');
    };
    // Function to change the tooltip information and position
    const mousemove = function (e, d) {
      const index = d3.bisect(
        times.map((time) => new Date(time)),
        xScale.invert(e.pageX - 290),
      );
      const xValue =
        xScale.invert(e.pageX - 290).getHours() +
        ':' +
        xScale.invert(e.pageX - 290).getMinutes();
      const yValue = temps[index];
      Tooltip.html(
        `<strong>Precipitation:</strong> ${yValue}mm <br/> <strong>Time:</strong> ${xValue}`,
      )
        .style('left', `${e.pageX - 30}px`)
        .style('top', `${e.pageY - 70}px`);
      console.log('display');
    };

    // Function to hide tooltip and restore dot style to default
    const mouseleave = function (d) {
      Tooltip.style('display', 'none');
    };
    const svg = d3.select(svgRef.current);

    // Define scales for x and y
    daysAfter = days?.findIndex((day) => day === cardSelect);
    const xScale =
      daysAfter === 6
        ? d3
            .scaleTime()
            .domain([
              new Date(2022, 2, currDate + daysAfter, currHour, 0),
              new Date(
                2022,
                2,
                currDate + daysAfter,
                currHour + 9,
                0,
              ),
            ])
            .range([0, width])
        : d3
            .scaleTime()
            .domain([
              new Date(2022, 2, currDate + daysAfter, currHour, 0),
              new Date(
                2022,
                2,
                currDate + daysAfter + 1,
                currHour,
                0,
              ),
            ])
            .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([-0.1, 3])
      .range([height, 0]);

    // Define axis for x and y
    const xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10);
    // AREA
    if (forecast) {
      d3.select(svgRef.current)
        .select('.areaChart')
        .datum(forecast)
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr(
          'd',
          d3
            .area()
            .curve(d3.curveCardinal)
            .x((d) => xScale(d[1]))
            .y0(height)
            .y1((d) => yScale(d[0])),
        )
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseleave', mouseleave)
        .attr('opacity', '0')
        .transition()
        .duration(300)
        .attr('opacity', '1')
        .attr('font-family', 'sans-serif')
        .style('stroke', 'none')
        .style('stroke-width', '2')
        .style('fill', 'url(#temperature-gradient)');
    }

    // Linear gradient
    const color = d3.scaleSequential(
      yScale.domain(),
      d3.interpolateTurbo,
    );
    d3.select(svgRef.current)
      .select('.linGrad')
      .attr('id', 'temperature-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', height + margin.bottom)
      .attr('x2', 0)
      .attr('y2', margin.top - height)
      .selectAll('stop')
      .data(d3.ticks(0, 1, 10))
      .join('stop')
      .attr('offset', (d) => d)
      .attr('stop-color', color.interpolator());

    // Labels
    if (forecast) {
      d3.select(svgRef.current)
        .select('.labels')
        .selectAll('text')
        .data(forecast)
        .text((d, i) => (i % 2 === 0 ? `${d[0]}` : null))
        .attr('text-anchor', 'middle')
        .attr('x', (d) => xScale(d[1]))
        .attr('y', (d) => yScale(d[0]))
        .attr('font-family', 'sans-serif')
        .attr('font-size', '13px')
        .attr('opacity', '0.65')
        .attr(
          'transform',
          `translate(${margin.left}, ${margin.top - 12})`,
        )
        .style('cursor', 'default');
    }
    // Append x axis
    svg
      .select('.xAxis')
      .call(xAxis)
      .attr(
        'transform',
        `translate(${margin.left}, ${height + margin.top})`,
      )
      .attr('opacity', '0')
      .transition()
      .attr('opacity', '1')
      .select('path')
      .attr('opacity', '0');
  }, [forecast]);
  return (
    <div className='div_temp'>
      <svg
        height={height + margin.bottom}
        width={width + margin.right}
        ref={svgRef}
      >
        <linearGradient className='linGrad' />
        <g className='xAxis' />
        <path className='areaChart' />
        <g className='labels'>{labels}</g>
      </svg>
    </div>
  );
}

export default LineChart;
