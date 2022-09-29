let musicData

// LINE 164 
// d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv", function(data) {
// CHECK THE RETURNS OF EACH LINE
//   .enter().append("rect")
// .attr("x", function(d) { return x(d.data.group); })
// .attr("y", function(d) { return y(d[1]); })
// .attr("height", function(d) { return y(d[0]) - y(d[1]); })
// .attr("width",x.bandwidth())


// color = ƒ n(n){var o=n+"",u=e.get(o);if(!u){if(i!==yv)return i;e.set(o,u=r.push(n))}return t[(u-1)%t.length]}
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
// moved filtertable functions up-
// table filter and rebuild - called by updatedfilters
function filterTableNotScore() {
    let filteredData = musicData;
    Object.entries(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] === value);
    });

    buildTable(filteredData);
    drawBarChart(filteredData);
}

function filterTableScore() {
    let filteredData = musicData;
    Object.entries(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] >= value);
    });

    buildTable(filteredData);
    drawBarChart(filteredData);
}

// updateFilters called by event listener for forms
function updateFilters() {
    let changedElement = d3.select(this);
    let elementValue = changedElement.property("value");
    let filterId = changedElement.attr("id");
    console.log(filterId)
    if (filterId === "meta_score") {
        console.log(`--filterId=${filterId}--`)
        console.log(filterId)
        elementValue = parseInt(elementValue)
        filters[filterId] = elementValue;
        filterTableScore()
    } else if (filterId === "date") {
        console.log(`--filterId=${filterId}--`)
        console.log(filterId)
        console.log(elementValue)
    } else {
        console.log(`--filterId=${filterId}--`)
        console.log(filterId)
        console.log(elementValue)
    }
    if (elementValue) {
        console.log(elementValue)
        console.log(typeof elementValue)
        filters[filterId] = elementValue;
    } else {
        delete filters[filterId];
    }
    console.log(filters[filterId])
        // filterTable();
}

// barchart link:https://d3-graph-gallery.com/graph/barplot_stacked_basicWide.html
// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 20, left: 50 },
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz_bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

function filterScores(score) {
    // filters scores in ranges
    console.log('-----filterScores------')

    if (score >= 90) {
        return "90s"
    } else if (score < 90 && score >= 80) {
        return "80s"
    } else if (score < 80 && score >= 70) {
        return "70s"
    } else {
        return "60s"
    }
}
let binScoresByYear

function parseDataBar(data) {
    // parse data into an object containing years and range of scores as keys with counts as values
    binScoresByYear = {};
    for (i = 0; i < data.length; i++) {
        let currentYear = data[i].date
        let bin = filterScores(data[i].meta_score)
        if (typeof binScoresByYear[currentYear] === 'undefined') {
            binScoresByYear[currentYear] = {};
            binScoresByYear[currentYear]['year'] = currentYear;
            binScoresByYear[currentYear][bin] = 1;
        } else if (typeof binScoresByYear[currentYear][bin] === 'undefined') {
            binScoresByYear[currentYear][bin] = 1;
        } else {
            binScoresByYear[currentYear][bin] += 1;
        }
    }
    return binScoresByYear
}
let chartDataObj
let subgroups
let groups
let stackedData

function makeBarArray(obj) {
    let anArray = []
    let keyArray = []
    for (const key of Object.keys(chartDataObj)) {
        anArray.push(chartDataObj[`${key}`])
    }
    return anArray
}

function fillInMissingSubgroups() {

}

function drawBarChart(bData) {
    svg.html("")
    console.log('----drawBarChart called----')
    chartDataObj = parseDataBar(bData)
    data = makeBarArray(chartDataObj)
    data['columns'] = Object.keys(data[0])
        // List of subgroups = header of the csv files = soil condition here
    var subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(data, function(d) { return (d.year) }).keys()

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 510])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#fc0505', '#828282', '#C5C5C5', '#000000'])

    //stack the data? --> stack per subgroup
    var stackedData = d3.stack()
        .keys(subgroups)
        (data)

    // Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return x(d.data.year); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth())
}


d3.selectAll("input").on("change", updateFilters);