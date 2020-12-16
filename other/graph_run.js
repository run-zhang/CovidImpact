
//Display specifications
const margin = {top:50, right:50, bottom:50, left:50};
const width = window.innerWidth - margin.left - margin.right;
const height = window.innerHeight - margin.top - margin.bottom;

//Format survival rate
const fsr = d3.format(".2f");

//Total gender checkbox
d3.selectAll(".selector")
       .on("click", function (d) {
	   this.checked ? showCircle(this.id) : hideCircle(this.id);
	   this.checked ? showPath(this.id) : hidePath(this.id);
	   
       });

//Show functions
function showCircle (source) {
   d3.selectAll("circle").filter("."+source).transition().attr('r', 6).duration(1000);
}

function showPath (source) {
   d3.selectAll("path").filter("."+source).transition().attr('stroke-width', 1).duration(1000);
}

//Hide functions
function hideCircle (source) {
   d3.selectAll("circle").filter("."+source).transition().attr('r', 0).duration(1000);
}

function hidePath (source) {
   d3.selectAll("path").filter("."+source).transition().attr('stroke-width', 0).duration(1000);
}

d3.csv("resources/cancerTotal.csv", function (d) {
   return {surv: d.SurvRate,
     year: d.Year
   };
}).then(function (data) {
   
   //Set x scale
   var x = d3.scaleLinear()
       .domain(d3.extent(data, d => d.year))
       .range([0, width]);
   
   //Set y scale
   var y = d3.scaleLinear()
       .domain([0, 1])
       .range([height, 0]);

   //line function
   var line = d3.line()
	  .defined(d => d)
	  .x(d => x(d.year))
	  .y(d => y(d.surv));

   //Create container
   var container = d3.select("#graph")
	       .append("svg")
	       .attr("width", width + margin.left + margin.right)
	       .attr("height", height + margin.top + margin.bottom)
	       .append("g")
	       .attr("class", "container")
	       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   //Title
   container.append("text")
      .attr("x", width * .5)
      .attr("y", margin.top * .1)
      .text("Cancer Survival Rate (1977-2013)")
      .attr("text-anchor", "middle")
      .style("font-family", "sans-serif")
      .style("font-size", margin.top * .4);

   //X axis
   container.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

   //Y axis
   container.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

   //Y label
   container.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.right * .7)
      .style("text-anchor", "middle")
      .text("Survival Rate")
      .attr("font-family", "sans-serif")
      .attr("font-size", margin.right / 4);
   
   //Draw time series
   const path = container.append("g")
		 .selectAll(".total")
		 .data(data)
		 .enter()
		 .append("path")
		 .attr("class", "total")
		 .attr("id", "purpleLine")
		 .attr("fill", "none")
		 .attr("stroke", "purple")
		 .attr("mix-blend-mode", "multiply")
		 .attr("stroke-width", 1)
		 .attr("stroke-linejoin", "round")
		 .attr("d", line(data));

   //Draw year values
   const circle = container.append("g")
		   .selectAll("circle")
		   .data(data)
		   .enter()
		   .append("circle")
		   .attr("class", "total")
		   .attr("id", "purpleCircle")
		   .attr("cx", d => x(d.year))
		   .attr("cy", d => y(d.surv))
		   .attr("r", 6)
		   .attr("fill", "purple")
		   .attr("fill-opacity", .5)
		   .append("title")
		   .text(function (d) {
		       return d.year + " Total Survival Rate: " + fsr(d.surv);
		   });

});

d3.csv("resources/cancerMale.csv", function (d) {
   return {surv: d.SurvRateMale,
     year: d.Year
   };
}).then(function (data) {

   //Set x scale
   var x = d3.scaleLinear()
       .domain(d3.extent(data, d => d.year))
       .range([0, width]);
   
   //Set y scale
   var y = d3.scaleLinear()
       .domain([0, 1])
       .range([height, 0]);

   //line function
   var line = d3.line()
	  .defined(d => d)
	  .x(d => x(d.year))
	  .y(d => y(d.surv));

   //Draw time series
   const path = d3.select(".container")
	  .append("g")
	  .selectAll("path")
	  .data(data)
	  .enter()
	  .append("path")
	  .attr("class", "male")
	  .attr("fill", "none")
	  .attr("stroke", "blue")
	  .attr("mix-blend-mode", "multiply")
	  .attr("stroke-width", 1)
	  .attr("stroke-linejoin", "round")
	  .attr("d", line(data));

   //Draw year values
   const circle = d3.select(".container")
	      .append("g")
	      .selectAll("circle")
	      .data(data)
	      .enter()
	      .append("circle")
	      .attr("class", "male")
	      .attr("cx", d => x(d.year))
	      .attr("cy", d => y(d.surv))
	      .attr("r", 6)
	      .attr("fill", "blue")
	      .attr("fill-opacity", .5)
	      .append("title")
	      .text(function (d) {
		  return d.year + " Male Survival Rate: " + fsr(d.surv);
	      });

});

d3.csv("resources/cancerFemale.csv", function (d) {
   return {surv: d.SurvRateFemale,
     year: d.Year
   };
}).then(function (data) {

   //Set x scale
   var x = d3.scaleLinear()
       .domain(d3.extent(data, d => d.year))
       .range([0, width]);
   
   //Set y scale
   var y = d3.scaleLinear()
       .domain([0, 1])
       .range([height, 0]);

   //line function
   var line = d3.line()
	  .defined(d => d)
	  .x(d => x(d.year))
	  .y(d => y(d.surv));

   //Draw time series
   const path = d3.select(".container")
	  .append("g")
	  .selectAll("path")
	  .data(data)
	  .enter()
	  .append("path")
	  .attr("class", "female")
	  .attr("fill", "none")
	  .attr("stroke", "red")
	  .attr("mix-blend-mode", "multiply")
	  .attr("stroke-width", 1)
	  .attr("stroke-linejoin", "round")
	  .attr("d", line(data));

   //Draw year values
   const circle = d3.select(".container")
	      .append("g")
	      .selectAll("circle")
	      .data(data)
	      .enter()
	      .append("circle")
	      .attr("class", "female")
	      .attr("cx", d => x(d.year))
	      .attr("cy", d => y(d.surv))
	      .attr("r", 6)
	      .attr("fill", "red")
	      .attr("fill-opacity", .5)
	      .append("title")
	      .text(function (d) {
		  return d.year + " Female Survival Rate: " + fsr(d.surv);
	      });

});