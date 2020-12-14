const barChart = (section, data, att) => {

  let svg = d3.select(section);

  let width = parseInt(d3.select(".chart-wrapper").style("width"));
  let height = parseInt(d3.select(".chart-wrapper").style("height"));

  svg.attr('width', width)
      .attr('height', height);

  let dates = data.map(data => data.date.slice(5));
  let atts = data.map(data => data[att]);

  let xScale = d3.scaleBand()
                  .domain(dates)
                  .range([25, width - 25])
                  .padding(0.1);

  let xAxis = d3.axisBottom(xScale)
                  .tickValues(dates.filter((d, i) => (i === 0 || i === data.length - 1)))


  let yScale = d3.scaleLinear()
                  .domain([0, d3.max(atts) + 5])
                  .range([50, height])

  svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => xScale(d.date.slice(5)))
      .attr('y', (d, i) => height - yScale(d[att]))
      .attr('width', (d) => xScale.bandwidth())
      .attr('height', (d, i) => yScale(d[att]) - 50)
      .attr('fill', '#005AB5');

  svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d[att])
        .attr('fill', 'white')
        .style('font-size', '.5em')
        .attr('x', (d, i) => xScale(d.date.slice(5)) + (width * .02))
        .attr('y', (d, i) => height - yScale(d[att]) + (height * .1));

  svg.append('g')
      .attr('transform', `translate(0, ${height - 50})`)
      .call(xAxis)
      .selectAll('text')
        .style('font-size', '1em')
}
