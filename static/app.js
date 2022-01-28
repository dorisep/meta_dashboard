d3.json('/get_init_data').then((data) => {

    buildTable(data);
    buildLineChart(data);
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

function traceAbove90(data, threshold = 90) {
    let years = []
    let scores = {}
    var trace = {
        x: [],
        y: [],
        mode: 'lines+markers',
        type: 'scatter'
    };
    data.forEach(d => {
        var year = d.date.slice(-4)
        if (d.meta_score >= threshold) {
            scores[year] = (scores[year] + 1) || 1;
        }
    });
    // console.log(Object.values(scores))
    trace["x"].push(Object.keys(scores))
    trace["y"].push(Object.values(scores))
        // console.log(trace["x"])
        // console.log((trace["y"]))

    return trace
}

function buildLineChart(data) {

    data = traceAbove90(data);
    console.log(data)
    var layout = {
        title: 'Metacritic Scores Over Time',

        xaxis: {
            showline: true,
            showticklabels: true,
            autotick: false
        },
        yaxis: {
            showgrid: false,
            zeroline: false,
            showline: false,
            showticklabels: false
        }
    };

    Plotly.newPlot('myDiv', data, layout);
}