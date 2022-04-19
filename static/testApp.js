$(document).ready(function() {
    console.log('page loaded');
    doWork();
    $("#yearSelected button").click(function() {
        console.log(this.value);
      });
});


function doWork() {
    var url = "/get_init_data"
    requestD3(url);
    console.log('do work called')
}

function requestD3(url) {
    d3.json(url).then((data) => {
        let years = data.map(data => data.date.slice(-4));
        console.log(years);
        let uniqueYears = [...new Set(years)].sort();
        console.log(uniqueYears);

        createYearDropdown(uniqueYears) 
        
});



function createYearDropdown(uniqueYears) {
    // parse out year from date property

    for (let i = 0; i < uniqueYears.length; i++) {
        let year = uniqueYears[i];
        let html = `<button type="button" class="btn btn-dark" value=${year}>${year}</button>`
        $("#yearSelect").append(html);
    }
    


// function createGenreDropdown(data) {
//     var genres = data.map(d => d.album_genre);
//     let uniqueGenres = [...new Set(genres)];
//     for (let i = 0; i < uniqueGenres.length; i++) {
//         let genre = uniqueGenres[i];
//         let html = `<a class="dropdown-item" href="#">${genre}</a>`
//         $("#genreDown").append(html);
//     }

// }

// function createLabelDropdown(data) {
//     var labels = data.map(d => d.record_label);
//     let uniqueLabels = [...new Set(labels)];
//     for (let i = 0; i < uniqueLabels.length; i++) {
//         let label = uniqueLabels[i];
//         let html = `<a class="dropdown-item" href="#">${label}</a>`
//         $("#labelDown").append(html);
//     }

// }

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
function stackedBar(data) {
    console.log(data)
}
    // X axis
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
    }
}