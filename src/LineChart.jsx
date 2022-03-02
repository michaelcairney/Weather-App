import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
import useWindowSize from './useWindowSize';

function LineChart() {
  const forecast = [
    [-1, new Date(2022, 2, 1, 1, 0)],
    [-1.2, new Date(2022, 2, 1, 3, 0)],
    [-1.4, new Date(2022, 2, 1, 5, 0)],
    [-1.7, new Date(2022, 2, 1, 7, 0)],
    [-2, new Date(2022, 2, 1, 9, 0)],
    [-2.3, new Date(2022, 2, 1, 11, 0)],
    [-2.8, new Date(2022, 2, 1, 13, 0)],
    [-2.7, new Date(2022, 2, 1, 15, 0)],
    [-1.9, new Date(2022, 2, 1, 17, 0)],
    [-0.4, new Date(2022, 2, 1, 19, 0)],
    [1.2, new Date(2022, 2, 1, 21, 0)],
    [2.7, new Date(2022, 2, 1, 23, 0)],
    [4.1, new Date(2022, 2, 2, 0, 0)],
    [5, new Date(2022, 2, 2, 1, 0)],
  ];
  // Fetching data from API
  const url =
    'https://api.open-meteo.com/v1/forecast?latitude=51.5002&longitude=-0.1262&hourly=temperature_2m';
  d3.json(url).then(({ hourly }) => {
    const h = hourly.time[0].temperature_2m;
    console.log(h);
  });
  const svgRef = useRef();
  const size = useWindowSize();
  const margin = { top: 40, bottom: 100, left: 20, right: 100 };
  const height = size.height;
  const width = size.width;

  const labels = forecast.map((val) => <text />);
  // Will be called initially and on every data change
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define scales for x and y
    const xScale = d3
      .scaleTime()
      .domain([
        new Date(2022, 2, 1, 1, 0),
        new Date(2022, 2, 1, 23, 0),
      ])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([-10, 20])
      .range([height, 0]);

    // Define axis for x and y
    const xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10);
    // AREA
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
          .y1((d) => yScale(Math.round(d[0]))),
      )
      .attr('font-family', 'sans-serif')
      .style('stroke', 'none')
      .style('stroke-width', '2')
      .style('fill', 'url(#temperature-gradient)');

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
      .attr('y2', margin.top - height / 4)
      .selectAll('stop')
      .data(d3.ticks(0, 1, 10))
      .join('stop')
      .attr('offset', (d) => d)
      .attr('stop-color', color.interpolator());

    // LABELS
    // const labels = d3
    //   .select(svgRef.current)
    //   .selectAll('text')
    //   .data(forecast);

    d3.select(svgRef.current)
      .select('.labels')
      .selectAll('text')
      .data(forecast)
      .text((d) => `${Math.round(d[0])}°`)
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

    // Append x axis
    svg
      .select('.xAxis')
      .call(xAxis)
      .attr(
        'transform',
        `translate(${margin.left}, ${height + margin.top})`,
      )
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
