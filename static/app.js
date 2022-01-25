d3.json('/get_init_data').then((data) => {
    var years = []
    data.forEach(d => {
        var artist = d.artist;
        var album = d.album;
        var genre = d.album_genre;
        var date = d.date;
        var meta_score = d.meta_score;
        var user_score = d.user_score;
        var label = d.record_label;
        var year = d.date.slice(-4);


        // buildYearMenu(year)

    });
    buildTable(data);
});


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

function buildLineChart() {
    var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        mode: 'markers'
    };

    var trace2 = {
        x: [2, 3, 4, 5],
        y: [16, 5, 11, 9],
        mode: 'lines'
    };

    var trace3 = {
        x: [1, 2, 3, 4],
        y: [12, 9, 15, 12],
        mode: 'lines+markers'
    };

    var data = [trace1, trace2, trace3];

    var layout = {
        title: 'Line and Scatter Plot'
    };

    Plotly.newPlot('myDiv', data, layout);
}
buildLineChart()