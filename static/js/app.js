let musicData 

// from data.js
d3.json("/get_init_data", function (data) {
    musicData = data;
    buildTable(data);
})
// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
    tbody.html("");
    let body_html = ""
    data.forEach(record => {
        let textArray = [record.date, record.album, record.artist, record.album_genre, record.record_label, record.meta_score];
        let row = tbody.append("tr");
        textArray.forEach(val => {
            cell = row.append("td");
            cell.text(val);
        });
    });
    tbody.append(body_html)
}


// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Create a function that updates the filters. 

function updateFilters() {
    console.log('hey')
  // 4a. Create a variable that saves the element that was changed using d3.select().
  let changedElement = d3.select(this);
  // 4b. Save the value that was changed as a variable.
  let elementValue = changedElement.property("value");
  // 4c. Save the id of the filter that was changed as a variable.
  let filterId = changedElement.attr("id");
  // 5. If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  if (elementValue) {
    filters[filterId] = elementValue;
  }
  else {
    delete filters[filterId];
  }
  console.log(filters[filterId])
  // 6. Call function to apply all filters and rebuild the table
  filterTable();


}

// 7. Create a function that filters the table when data is entered.
function filterTable() {
    console.log('ho')
  // 8. Set the filtered data to the tableData.
  let filteredData = musicData;
  // 9. Loop through all of the filters and keep any data that
  // matches the filter values
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });
  tbody.html("");
  let body_html = ""
  filteredData.forEach(record => {
      let textArray = [record.date, record.album, record.artist, record.album_genre, record.record_label, record.meta_score];
      let row = tbody.append("tr");
      console.log(textArray)
      textArray.forEach(val => {
          cell = row.append("td");
          cell.text(val);
      });
  });
  tbody.append(body_html)
  // 10. Finally, rebuild the table using the filtered data
  buildTable(filteredData);
}

// 2. Attach an event to listen for changes to each filter
d3.selectAll("input").on("change", updateFilters);

// barchart link:https://d3-graph-gallery.com/graph/barplot_stacked_basicWide.html
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 50},
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

// Parse the Data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv", function(data) {

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function(d){return(d.group)}).keys()

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
    .domain([0, 60])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e41a1c','#377eb8','#4daf4a'])

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
        .attr("x", function(d) { return x(d.data.group); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())
})