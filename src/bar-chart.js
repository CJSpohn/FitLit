const barChart = (section, data, att, color) => {
  let svg = d3.select(section);
  svg.selectAll("*").remove();

  let width = parseInt(d3.select(".chart-wrapper").style("width"));
  let height =  parseInt(d3.select(".chart-wrapper").style("height"));

  svg.attr('width', width)
    .attr('height', height)

  let dates = data.map(data => data.date.slice(5));
  let atts = data.map(data => data[att])

  let xScale = d3.scaleBand()
                  .domain(dates)
                  .range([25, width - 25])
                  .padding(0.1);

  let xAxis = d3.axisBottom(xScale)
                  .tickValues(dates.filter((d, i) => (i === 0 || i === data.length - 1)))

  let yScale = d3.scaleLinear()
                  .domain([0, d3.max(atts)])
                  .range([50, height])

  //creating our bars
  svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => xScale(d.date.slice(5)))
      .attr('y', 0)
      .attr('width', (d) => xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', `${color}`)

  //animation
  svg.selectAll("rect")
    .transition()
    .duration(800)
      .attr('y', (d, i) => height - yScale(d[att]))
      .attr('height', (d, i) => yScale(d[att]) - 50)
      .delay((d, i) => i * 100)

  //numbers in bars
  svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d[att])
      .style('font-size', '0.8em')
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr('fill', 'black')
        .attr('x', (d, i) => {
          if (data.length > 15) {
            return xScale(d.date.slice(5))
          } else {
            return (xScale(d.date.slice(5)) + xScale.bandwidth() / 2)
          }
        })
        .attr('y', (d, i) => {
          if (yScale(d[att]) < 100) {
            return height - yScale(d[att])
          } else {
            return height - yScale(d[att]) + (height * .1)
          }
        })

  //append the x Axis
  svg.append('g')
      .attr('transform', `translate(0, ${height - 50})`)
      .call(xAxis)
      .selectAll('text')
        .style('font-size', '1em')
}
