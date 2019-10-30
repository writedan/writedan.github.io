function draw_map(features) {

  var path = d3.geo.path();

  var svg = d3.select("#map_container").append("svg");

    svg.selectAll("path")
        .data(features)
      .enter().append("path")
        .attr("d", path)
  	    .attr("id",function(d){
  		      return "county" + d.properties.GEOID;
  	    });
}
