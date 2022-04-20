$(document).ready(function() {
    doWork()
})


// $(document).ready(function() {
//     console.log('page loaded');
//     doWork();
//     $('#table_id').DataTable();
//     $("#yearSelected button").click(function() {
//         console.log(this.value);
//       });
// });


function doWork() {
    var url = "/get_init_data"
    requestD3(url);

    console.log('do work called')
}

function requestD3(url) {
    d3.json(url).then((data) => {
        
        let tableHeaders = ["Album", "Artist", "Genre", "Year", "Label", "Meta Score", "User Score"]
        let artists = data.map(data => data.artist)

        let metaScores = data.map(data => data.meta_score);
        let userScores = data.map(data => data.user_score);
        let albumGenres = data.map(data => data.album_genre);
        let labels = data.map(data => data.record_label);
        // parse years out of date released for drop down
        let albums = data.map(data => data.album)
        let years = data.map(data => data.date.slice(-4));
        let uniqueYears = [...new Set(years)].sort();
        

        // build table
        // table header
        let header_html = "<tr>"
        for (let i=0; i<tableHeaders.length; i++) {
            col = tableHeaders[i];
            header_html += `<th>${col}</th>`
        }
        header_html += "</tr>"

        $("#meta_table thead").append(header_html);

        // same thing, but for tbody
        let body_html = "";
        for (let j = 0; j < data.length; j++) {
            let row_html = "<tr>"
            row_html += `<td>${albums[j]}</td><td>${artists[j]}</td><td>${albumGenres[j]}</td><td>${years[j]}</td><td>${labels[j]}</td><td>${metaScores[j]}</td><td>${userScores[j]}</td>`;
            console.log(row_html)
            row_html += "</tr>"
            body_html += row_html
        }
        console.log(body_html)
        $("#meta_table tbody").append(body_html);

        // add class
        $("#meta_table").attr("class", "table table-striped table-hover");
        $('#meta_table').DataTable();


        createYearDropdown(uniqueYears)
    });

}


function createYearDropdown(uniqueYears) {
    // parse out year from date property

    for (let i = 0; i < uniqueYears.length; i++) {
        let year = uniqueYears[i];
        let html = `<button type="button" class="btn btn-dark" value=${year}>${year}</button>`
        $("#yearSelect").append(html);
    }
}
