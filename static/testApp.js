$(document).ready(function() {
    const url = "/get_init_data"
    getData(url);
})
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            makeTable(data)
        },
        error: function(textStatus, errorThrown) {
            console.log("FAILED to get data");
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
function makeTable(data) {
    let tableHeaders = ["Album", "Artist", "Genre", "Year", "Label", "Meta Score", "User Score"]
    let artists = data.map(data => data.artist)
    let metaScores = data.map(data => data.meta_score);
    let userScores = data.map(data => data.user_score);
    let albumGenres = data.map(data => data.album_genre);
    let labels = data.map(data => data.record_label);
    // parse years out of date released for drop down
    let albums = data.map(data => data.album)
    let years = data.map(data => data.date);
    let header_html = "<tr>"
    for (let i = 0; i < tableHeaders.length; i++) {
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
    table.on('draw', function() {
        // alert( 'Table redrawn' );
        console.log('you rang for table data?')
        getTableData(table);
    });
}
function getTableData(table) {
    const bubbleArray = [];
    const yearArray = [];
    const genreArray = [];
    const labelArray = [];
    // console.log(table.rows)
    // loop table rows
    table.rows({ search: "applied" }).every(function() {
        bubbleObj = {}
        const filteredData = this.data();
        console.log(filteredData)
        yearArray.push(filteredData[3]);
    });
    makeBar(yearArray)
    makeScatterMeta()
    makeScatterUser()
}
function makeScatterUser() {
    Highcharts.chart('scatterUser', {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Height Versus Weight of 507 Individuals by Gender'
        },
        subtitle: {
            text: 'Source: Heinz  2003'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Height (cm)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Weight (kg)'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x} cm, {point.y} kg'
                }
            }
        },
        series: [{
            name: 'Female',
            color: 'rgba(223, 83, 83, .5)',
            data: [161.2, 51.6]
        }, {
            name: 'Male',
            color: 'rgba(119, 152, 191, .5)',
            data: [184.0, 81.6]
        }]
    });
}
function makeScatterMeta() {
    Highcharts.chart('scatterMeta', {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Height Versus Weight of 507 Individuals by Gender'
        },
        subtitle: {
            text: 'Source: Heinz  2003'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Height (cm)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Weight (kg)'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x} cm, {point.y} kg'
                }
            }
        },
        series: [{
            name: 'Female',
            color: 'rgba(223, 83, 83, .5)',
            data: [161.2, 51.6]
        }, {
            name: 'Male',
            color: 'rgba(119, 152, 191, .5)',
            data: [184.0, 81.6]
        }]
    });
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
    Object.entries(count).forEach(([label, values]) => {
        let tempArray = []
        tempArray.push(label),
            tempArray.push(values),
            barArray.push(tempArray)
    });
    console.log('here comes the bar')
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
