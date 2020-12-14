const barChart = (section, data) => {
  let width = 600, height = 200;

  let svg = d3.select(section)
              .append('svg')
              .attr('viewBox', `0 0 ${width} ${height}`);


  svg.attr("viewbox", `0 0 ${width} ${height}`);


  let dates = data.map(data => data.date);

  let xScale = d3.scaleBand()
                  .domain(dates)
                  .range([0, width])
                  .padding(0.1);

  let xAxis = d3.axisBottom()
                  .scale(xScale)


  let yScale = d3.scaleLinear()
                  .domain([0, 100])
                  .range([50, height])

  svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => xScale(d.date))
      .attr('y', (d, i) => height - yScale(d.numOunces))
      .attr('width', (d) => xScale.bandwidth())
      .attr('height', (d, i) => yScale(d.numOunces) - 50)
      .attr('fill', '#005AB5')

  svg.append('g')
      .attr('transform', `translate(0, ${height - 50})`)
      .call(xAxis)
      .selectAll('text')
        .attr('transform', 'translate(0, 60) rotate(-90)')
        .style('font-size', '20px')
}
