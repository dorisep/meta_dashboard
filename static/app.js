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

function buildLineChart(data) {
    let years = []
    let scores = {}
    var trace1 = {
        x: [],
        y: [],
        mode: 'lines'
    };
    data.forEach(d => {
        var year = d.date.slice(-4)

        console.log(year)

        if (!trace1["x"].includes(year)) {
            trace1["x"].push(year);
        }

        if (d.meta_score >= 90) {
            scores[year] = (scores[year] + 1) || 1;
        }
    });
    trace1["y"].push(object.values(scores))
    console.log(trace1)


    var data = [trace1];

    var layout = {
        title: 'Line and Scatter Plot'
    };

    Plotly.newPlot('myDiv', data, layout);
}