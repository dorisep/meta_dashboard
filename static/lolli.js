$(document).ready(function() {
    console.log('page loaded')
    initPage()
})

function initPage() {
    var url = "/get_init_data"
    var musicData = requestD3(url);
    console.log(musicData)
    // const score90 = musicData.filter(data => data.meta_score >= 90);
    // console.log(score90)
}



function requestD3(url) {
    d3.json(url).then((data) => {
        createYearDropdown(data)
        console.log(data)
    // const score90 = data.filter(data => data.meta_score >= 90);
    
    // const sorted90 = score90.sort((a, b) => (b.meta_score > a.meta_score ? 1 : -1));
    // buildTable(sorted90);
});
}

function createYearDropdown(data) {
    var years = data.map(d => d.date.slice(-4));
    let uniqueYears = [...new Set(years)];
    console.log(uniqueYears)
    for (let i = 0; i < uniqueYears.length; i++) {
        let year = uniqueYears[i];
        let html = `<a class="dropdown-item" href="#">${year}</a>`
        $("#yearDown").append(html);
    }

}
// // set the dimensions and margins of the graph
// var margin = {top: 10, right: 30, bottom: 90, left: 40},
//     width = 460 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");

// // Parse the Data
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {

// // X axis
// var x = d3.scaleBand()
//     .range([ 0, width ])
//     .domain(data.map(function(d) { return d.Country; }))
//     .padding(1);
// svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
//     .selectAll("text")
//     .attr("transform", "translate(-10,0)rotate(-45)")
//     .style("text-anchor", "end");

// // Add Y axis
// var y = d3.scaleLinear()
//     .domain([0, 13000])
//     .range([ height, 0]);
// svg.append("g")
//     .call(d3.axisLeft(y));

// // Lines
// svg.selectAll("myline")
//     .data(data)
//     .enter()
//     .append("line")
//     .attr("x1", function(d) { return x(d.Country); })
//     .attr("x2", function(d) { return x(d.Country); })
//     .attr("y1", function(d) { return y(d.Value); })
//     .attr("y2", y(0))
//     .attr("stroke", "grey")

// // Circles
// svg.selectAll("mycircle")
//     .data(data)
//     .enter()
//     .append("circle")
//     .attr("cx", function(d) { return x(d.Country); })
//     .attr("cy", function(d) { return y(d.Value); })
//     .attr("r", "4")
//     .style("fill", "#69b3a2")
//     .attr("stroke", "black")
// })

