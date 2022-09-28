let musicData

d3.json("/get_init_data", function(data) {
        musicData = data;
        buildTable(data);
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
    console.log('--updateFilters called--')
    let changedElement = d3.select(this);
    let elementValue = changedElement.property("value");
    let filterId = changedElement.attr("id");
    if (elementValue) {
        filters[filterId] = elementValue;
    } else {
        delete filters[filterId];
    }
    filterTable();
}
// table filter and rebuild - called by updatedfilters
function filterTable() {
    let filteredData = musicData;
    console.log(filters)
    Object.entries(filters).forEach(([key, value]) => {
        console.log(key, value)
        filteredData = filteredData.filter(row => row[key] == value);
    });

    buildTable(filteredData);

}

function filterScores(score) {
    // filters scores in ranges
    console.log('-----filterScores------')

    if (score >= 90) {
        bin = "90s"
        return bin
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





d3.selectAll("input").on("change", updateFilters);