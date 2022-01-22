// var blah;
// let intiData = d3.select("#init_data")
// buildTable(data)
d3.json('/get_init_data').then((data) => {
    data.forEach(d => {
        dates = d.date
        year = dates[-4]
        console.log(year);
    });
    buildTable(data);
    buildYearMenu(data);
});

// function filterData(data) {
//     data.forEach(element => {
//         buildTable(element)


//     });

// const filteredArr = metaArray.filter(function([album_genre, value]) {
// return value > 89
// })
// }


function buildTable(data) {
    d3.select("tbody")
        .selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .html(function(d) {
            return `<td>${d.artist}</td>
                <td>${d.album}</td>
                <td>${d.album_genre}</td>
                <td>${d.date}</td>
                <td>${d.meta_score}</td>
                <td>${d.user_score}</td>
                <td>${d.record_label}</td>`
        });
}

function buildBarChart(data) {
    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;


    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");
}
xScale.domain(data.map(function(d) { return d.year; }));
yScale.domain([0, d3.max(data, function(d) { return d.meta_score; })]);

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

g.append("g")
    .call(d3.axisLeft(yScale).tickFormat(function(d) {
        return "$" + d;
    }).ticks(10))
    .append("text")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("value");


function makePictures(data) {
    d3.select(".MagicScroll")
        .selectAll("img")
        .data(data)
        .enter()
        .append("img")
        .html(function(d) {
            return `<img> src=${d[7]} </img>`
        });
}