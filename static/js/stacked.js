// color = ƒ n(n){var o=n+"",u=e.get(o);if(!u){if(i!==yv)return i;e.set(o,u=r.push(n))}return t[(u-1)%t.length]}
d3.json("/get_init_data", function(data) {
        musicData = data;
        buildTable(data);
        drawStackedChart(data);
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
    filteredData = musicData;
    Object.entries(filters).forEach(([key, value]) => {
        console.log('--traversing filtered data')
        console.log(key)
        console.log(value)
        filteredData = filteredData.filter(row => row[key] === value);
    });
    console.log('--filteredTableNotScore--')
        // console.log(filteredData)
    buildTable(filteredData);
    drawStackedChart(filteredData);
}

function filterTableScore() {
    filteredData = musicData;
    Object.entries(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] >= value);
    });
    buildTable(filteredData);
    drawStackedChart(filteredData);
}

function updateFilters() {
    changedElement = d3.select(this);
    elementValue = changedElement.property("value");
    filterId = changedElement.attr("id");

    if (elementValue) {
        if (filterId === "meta_score") {
            filters[filterId] = elementValue;
            return filterTableScore()
        } else if (filterId != "meta_score") {
            filters[filterId] = elementValue;
            return filterTableNotScore()
        }
    } else {
        delete filters[filterId];
        return filterTableNotScore()
    }

}
// barchart link:https://d3-graph-gallery.com/graph/barplot_stacked_basicWide.html
// set the dimensions and margins of the graph
var margin = { top: 10, right: 20, bottom: 20, left: 20 },
    width = 900 - margin.left - margin.right,
    height = 475 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz_bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

function setColorRange(arr) {
    colorObj = {}
    colorRange = []

    sortedArr = arr.sort((a, b) => { return b - a })
    sortedArr.forEach(e => {
        if (e === '90') {
            colorRange.push('red')
        } else if (e === '80') {
            colorRange.push('silver')
        } else if (e == '70') {
            colorRange.push('grey')
        } else {
            colorRange.push('black')
        }
    })
    colorObj['colorDomain'] = arr
    colorObj['colorRange'] = colorRange

    return colorObj
}

function filterScores(score) {
    // filters scores in ranges
    console.log('-----filterScores------')

    if (score >= 90) {
        return "90"
    } else if (score < 90 && score >= 80) {
        return "80"
    } else if (score < 80 && score >= 70) {
        return "70"
    } else {
        return "60"
    }
}
let binScoresByYear
let binGroups
let bin

function parseDataBar(data) {
    // parse data into an object containing years and range of scores as keys with counts as values
    binScoresByYear = {
        'parseDataBar': {},
        'binCount': {
            '90': 0,
            '80': 0,
            '70': 0,
            '60': 0
        }
    };
    binGroups = []
    for (i = 0; i < data.length; i++) {
        let currentYear = data[i].date
        bin = filterScores(data[i].meta_score)
        if (binGroups.includes(bin) === false) {
            binGroups.push(bin)
            binScoresByYear['binCount'][bin] = 1
        } else {
            binScoresByYear['binCount'][bin] += 1
        }
        if (typeof binScoresByYear['parseDataBar'][currentYear] === 'undefined') {
            binScoresByYear['parseDataBar'][currentYear] = {};
            binScoresByYear['parseDataBar'][currentYear]['year'] = currentYear;
            binScoresByYear['parseDataBar'][currentYear]['count'] = 1;
            binScoresByYear['parseDataBar'][currentYear][bin] = 1;
        } else if (typeof binScoresByYear['parseDataBar'][currentYear][bin] === 'undefined') {
            binScoresByYear['parseDataBar'][currentYear][bin] = 1;
            binScoresByYear['parseDataBar'][currentYear]['count'] += 1
        } else {
            binScoresByYear['parseDataBar'][currentYear][bin] += 1;
            binScoresByYear['parseDataBar'][currentYear]['count'] += 1;
        }
        binScoresByYear['binGroups'] = binGroups
    }
    populateKPI(binScoresByYear.binCount)
    delete binScoresByYear["binCount"]
    return binScoresByYear
}
// takes and obj and returns an array
// traverses an object and counts the 
// number of occurences for each bin
function makeBarArray(obj) {
    countArray = []
    anArray = []


    for (const key of Object.keys(obj.parseDataBar)) {
        // console.log('--traversing chartDataObj--')
        // console.log(key)
        // console.log(chartDataObj[`${key}`]['count'])
        countArray.push(obj.parseDataBar[`${key}`]['count'])
        delete obj.parseDataBar[`${key}`]['count']
        anArray.push(obj.parseDataBar[`${key}`])
            // console.log('--anArray for you--')
            // console.log(countArray)
    }
    max = Math.max(...countArray);
    // console.log(max)
    // console.log(max)
    anArray['yDomain'] = max
    return anArray
}

function drawStackedChart(bData) {
    svg.html("")
    console.log('----drawStackedChart called----')
    chartDataObj = parseDataBar(bData)
    colorPalateObj = setColorRange(chartDataObj.binGroups)

    data = makeBarArray(chartDataObj)
    data['columns'] = Object.keys(data[0])

    // List of subgroups = header of the csv files = soil condition here
    subgroups = data.binGroups

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    groups = d3.map(data, function(d) { return (d.year) }).keys()

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
        .domain([0, data.yDomain + 5])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(colorPalateObj.colorDomain)
        .range(colorPalateObj.colorRange)

    //stack the data? --> stack per subgroup
    var stackedData = d3.stack()
        .keys(chartDataObj.binGroups)
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

function populateKPI(bData) {
    console.log("--populate KPI called--")
    for (const [key, value] of Object.entries(bData)) {
        if (key == 90) {
            d3.select('#count90').text(value)
        } else if (key == 80) {
            d3.select('#count80').text(value)
        } else if (key == 70) {
            d3.select('#count70').text(value)
        } else {
            d3.select('#count60').text(value)
        }
    }
    // d3.select("#count90").text(bdata["90"])
}

d3.selectAll("input").on("change", updateFilters);