$(document).ready(function() {
    const url = "/get_init_data"
    getData(url);
})

function getData(url){
$.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    success: function(data) {
        let tableHeaders = ["Album", "Artist", "Genre", "Year", "Label", "Meta Score", "User Score"]
        let artists = data.map(data => data.artist)

        let metaScores = data.map(data => data.meta_score);
        let userScores = data.map(data => data.user_score);
        let albumGenres = data.map(data => data.album_genre);
        let labels = data.map(data => data.record_label);
        // parse years out of date released for drop down
        let albums = data.map(data => data.album)
        let years = data.map(data => data.date);
        
        

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
            row_html += `<td>${albums[j]}</td>
            <td>${artists[j]}</td>
            <td>${albumGenres[j]}</td>
            <td>${years[j]}</td>
            <td>${labels[j]}</td>
            <td>${metaScores[j]}</td>
            <td>${userScores[j]}</td>`;
            row_html += "</tr>"
            body_html += row_html
        
        }

        $("#meta_table tbody").append(body_html);

        // add class
        var table = $("#meta_table").DataTable();

        table.on( 'draw', function () {
            getTableData(table);
        } );
    },
    error: function(textStatus, errorThrown) {
        console.log("FAILED to get data");
        console.log(textStatus);
        console.log(errorThrown);
    }
    
});
}


function getTableData(table) {
    const bubbleArray = []
 
    const yearArray = []
        genreArray = [],
        labelArray = [];
    // console.log(table.rows)
    // loop table rows
    table.rows({ search: "applied" }).every(function() {
        bubbleObj = {}
        const filteredData = this.data();
        yearArray.push(filteredData[3]);

    });

    
    makeBar(yearArray)

  }

function makeBar(yearData) {
    const barArray = [];
    const count = {};

    for (const element of yearData) {
    if (count[element]) {
        count[element] += 1;
    } else {
        count[element] = 1;
    }
    }

    Object.entries(count).forEach(([label,values])=>{
        let tempArray = []
        tempArray.push(label),
        tempArray.push(values),
        barArray.push(tempArray)
        });
    console.log('here comes the judge')
    console.log(barArray)
    Highcharts.chart('pointyChart', {
        chart: {
          type: 'columnpyramid'
        },
        title: {
          text: 'Number of albums by year'
        },
        colors: ['#808080', '#000000', '#FF0000'],
        xAxis: {
          crosshair: true,
          labels: {
            style: {
              fontSize: '14px'
            }
          },
          type: 'category'
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Height (m)'
          }
        },
        tooltip: {
          valueSuffix: ' m'
        },
        series: [{
          name: 'Height',
          colorByPoint: true,
          data: barArray,
          showInLegend: false
        }]
    });
}
    

