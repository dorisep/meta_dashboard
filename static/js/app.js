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