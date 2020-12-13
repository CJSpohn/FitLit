const barChart = (section, data) => {
  let svg = d3.select(section);

  let width = 600, height = 200;

  svg.attr('width', width)
      .attr('height', height);

  let dates = data.map(data => data.date);

  let xScale = d3.scaleBand()
                  .domain(dates)
                  .range([50, width])
                  .padding(0.1);


  let yScale = d3.scaleLinear()
                  .domain([0, 100])
                  .range([50, height])

  svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(d.date))
      .attr('y', (d, i) => height - yScale(d.numOunces))
      .attr('width', (d) => xScale.bandwidth())
      .attr('height', (d, i) => yScale(d.numOunces) - 50)
}
