function draw_map(features) {
  var width = 960,
      height = 500;

  var path = d3.geo.path();

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("path")
        .data(features)
      .enter().append("path")
        .attr("d", path)
  	    .attr("id",function(d){
  		      return "county" + d.properties.GEOID;
  	    });
}
