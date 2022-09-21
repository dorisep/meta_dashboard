let musicData

d3.json("/get_init_data", function(data) {
        musicData = data;
        buildTable(data);
        drawBarChart(data);


    })
    // start of code for table
var tbody = d3.select("tbody");

function buildTable(tData) {
    tbody.html("");
    tData.forEach(record => {
        let textArray = [record.date, record.album, record.artist, record.album_genre, record.record_label, record.meta_score];
        let row = tbody.append("tr");
        textArray.forEach(val => {
            cell = row.append("td");
            cell.text(val);
        });
    });
}
// start of code for filters
var filters = {};
// updateFilters called by event listener for forms
function updateFilters() {
    let changedElement = d3.select(this);
    let elementValue = changedElement.property("value");
    let filterId = changedElement.attr("id");
    if (elementValue) {
        filters[filterId] = elementValue;
    } else {
        delete filters[filterId];
    }
    console.log(filters[filterId])
    filterTable();
}
// table filter and rebuild - called by updatedfilters
function filterTable() {
    let filteredData = musicData;
    Object.entries(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] === value);
    });

    buildTable(filteredData);
}
d3.selectAll("input").on("change", updateFilters);


// barchart link:https://d3-graph-gallery.com/graph/barplot_stacked_basicWide.html
// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 20, left: 50 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz_bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

function drawBarChart(bData) {
    console.log('----drawBarChart called----')
    let countByDates = bData.reduce((resultSet, item) => ({
        ...resultSet,
        [item.date]: (resultSet[item.date] || 0) + 1,
    }), {});

    console.log(countByDates);

    // let textArray = [record.date, record.album, record.artist, record.album_genre, record.record_label, record.meta_score];

    // textArray.forEach(val => {
    //     cell = row.append("td");
    //     cell.text(val);
    // });
};
console.log(dateArray)
    //     // Parse the Data

//     // List of subgroups = header of the csv files = soil condition here
//     var subgroups = data.columns.slice(1)

//     // List of groups = species here = value of the first column called group -> I show them on the X axis
//     var groups = d3.map(data, function(d) { return (d.group) }).keys()

//     // Add X axis
//     var x = d3.scaleBand()
//         .domain(groups)
//         .range([0, width])
//         .padding([0.2])
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x).tickSizeOuter(0));

//     // Add Y axis
//     var y = d3.scaleLinear()
//         .domain([0, 60])
//         .range([height, 0]);
//     svg.append("g")
//         .call(d3.axisLeft(y));

//     // color palette = one color per subgroup
//     var color = d3.scaleOrdinal()
//         .domain(subgroups)
//         .range(['#e41a1c', '#377eb8', '#4daf4a'])

//     //stack the data? --> stack per subgroup
//     var stackedData = d3.stack()
//         .keys(subgroups)
//         (data)

//     // Show the bars
//     svg.append("g")
//         .selectAll("g")
//         // Enter in the stack data = loop key per key = group per group
//         .data(stackedData)
//         .enter().append("g")
//         .attr("fill", function(d) { return color(d.key); })
//         .selectAll("rect")
//         // enter a second time = loop subgroup per subgroup to add all rectangles
//         .data(function(d) { return d; })
//         .enter().append("rect")
//         .attr("x", function(d) { return x(d.data.group); })
//         .attr("y", function(d) { return y(d[1]); })
//         .attr("height", function(d) { return y(d[0]) - y(d[1]); })
//         .attr("width", x.bandwidth())
//         // })