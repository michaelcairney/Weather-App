import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
import useWindowSize from '../util/useWindowSize';

function LineChart({ data }) {
  const currHour = new Date().getHours();
  const currDate = new Date().getDate();
  const temps = data?.hourly?.precipitation?.slice(currHour);
  const times = data?.hourly?.time?.slice(currHour);
  const forecast = temps?.map((item, index) => [
    item,
    new Date(times[index]),
  ]);

  const svgRef = useRef();
  const size = useWindowSize();
  const margin = { top: 0, bottom: 50, left: 20, right: 110 };
  const height = size.height;
  const width = size.width;

  const labels = forecast?.map((val) => <text key={Math.random()} />);
  // Will be called initially and on every data change
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define scales for x and y
    const xScale = d3
      .scaleTime()
      .domain([
        new Date(2022, 2, currDate , currHour, 0),
        new Date(2022, 2, currDate + 1, currHour, 0),
      ])
      .range([0, width]);

    const yScale = d3.scaleLinear().domain([-0.1, 2]).range([height, 0]);

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
        .text((d, i) => i % 2 === 0 ? `${d[0]}` : null)
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
