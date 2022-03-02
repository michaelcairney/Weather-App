import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

export default function RadialChart({ percent, measure }) {
  const chartRef = useRef(null);
  const radius = 60;
  const height = radius * 2;
  const width = radius * 2;
  const margin = 40;

  const color = d3.scaleOrdinal().range(['#27a3ebd2', '#d4d4d4']);

  const arcData = [
    { startAngle: 0, endAngle: (percent / 100) * 2 * Math.PI },
    {
      startAngle: (percent / 100) * 2 * Math.PI,
      endAngle: 2 * Math.PI,
    },
  ];

  useEffect(() => {
    d3.select(chartRef.current)
      .select('#pieChart')
      .attr(
        'transform',
        'translate(' + width / 2 + ',' + height / 2 + ')',
      )
      .selectAll('path')

      .data(arcData)

      .join('path')

      .attr(
        'd',
        d3
          .arc()
          .innerRadius(radius * 0.85)
          .outerRadius(radius),
      )
      .attr('fill', (d) => color(d))
      .attr('stroke', 'none')
      .style('stroke-width', '2px')
      .style('opacity', 1);

    d3.select(chartRef.current)
      .select('#pieChart')
      .select('#percentDisplay')
      .text(`${percent}%`)
      .attr('text-anchor', 'middle')
      .attr('font-size', radius / 2.6)
      .attr('font-family', 'sans-serif')
      .attr('opacity', '1')
      .attr('y', '-5%');

    d3.select(chartRef.current)
      .select('#pieChart')
      .select('#measureDisplay')
      .text(`${measure}`)
      .attr('text-anchor', 'middle')
      .attr('font-size', radius / 3.5)
      .attr('font-family', 'sans-serif')
      .attr('opacity', '0.7')
      .attr('y', '15%');
  });

  return (
    <div>
      <svg width={width + margin} height={height} ref={chartRef}>
        <g id='pieChart'>
          <text id='measureDisplay' />
          <text id='percentDisplay' />
        </g>
      </svg>
    </div>
  );
}
