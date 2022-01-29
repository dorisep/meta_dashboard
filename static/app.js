d3.json('/get_init_data').then((data) => {

    buildTable(data);
    // buildLineChart(data);
    graph(traceAbove90(data));
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
    trace["x"] = [Object.keys(scores)];
    trace["y"] = [Object.values(scores)];
        // console.log(trace["x"])
        // console.log((trace["y"]))

    return trace
}

function graph (trace1) {
    
    var xData = trace1.x;
      
      var yData = trace1.y;
      
      var colors = ['rgba(67,67,67,1)', 'rgba(115,115,115,1)', 'rgba(49,130,189, 1)',
        'rgba(189,189,189,1)'
      ];
      
      var lineSize = [2, 2, 4, 2];
      
      var labels = ['Television', 'Newspaper', 'Internet', 'Radio'];
      
      var data = [];
      
      for ( var i = 0 ; i < xData.length ; i++ ) {
        var result = {
          x: xData[i],
          y: yData[i],
          type: 'scatter',
          mode: 'lines',
          line: {
            color: colors[i],
            width: lineSize[i]
          }
        };
        var result2 = {
          x: [xData[i][0], xData[i][11]],
          y: [yData[i][0], yData[i][11]],
          type: 'scatter',
          mode: 'markers',
          marker: {
            color: colors[i],
            size: 12
          }
        };
        data.push(result, result2);
      }
      
      var layout = {
        // showlegend: false,
        // height: 600,
        // width: 600,
        xaxis: {
          showline: true,
          showgrid: false,
          showticklabels: true,
          linecolor: 'rgb(204,204,204)',
          linewidth: 2,
          autotick: false,
          ticks: 'outside',
          tickcolor: 'rgb(204,204,204)',
          tickwidth: 2,
          ticklen: 5,
          tickfont: {
            family: 'Arial',
            size: 12,
            color: 'rgb(82, 82, 82)'
          }
        },
        yaxis: {
          showgrid: false,
          zeroline: false,
          showline: false,
          showticklabels: false
        },
        autosize: false,
        margin: {
          autoexpand: false,
          l: 100,
          r: 20,
          t: 100
        },
        annotations: [
          {
            xref: 'paper',
            yref: 'paper',
            x: 0.0,
            y: 1.05,
            xanchor: 'left',
            yanchor: 'bottom',
            text: 'Main Source for News',
            font:{
              family: 'Arial',
              size: 30,
              color: 'rgb(37,37,37)'
            },
            showarrow: false
          },
          {
            xref: 'paper',
            yref: 'paper',
            x: 0.5,
            y: -0.1,
            xanchor: 'center',
            yanchor: 'top',
            showarrow: false,
            font: {
              family: 'Arial',
              size: 12,
              color: 'rgb(150,150,150)'
            }
          }
        ]
      };
      
      for( var i = 0 ; i < xData.length ; i++ ) {
        var result = {
          xref: 'paper',
          x: 0.05,
          y: yData[i][0],
          xanchor: 'right',
          yanchor: 'middle',
          text: labels[i] + ' ' + yData[i][0] +'%',
          showarrow: false,
          font: {
            family: 'Arial',
            size: 16,
            color: 'black'
          }
        };
        var result2 = {
          xref: 'paper',
          x: 0.95,
          y: yData[i][11],
          xanchor: 'left',
          yanchor: 'middle',
          text: yData[i][11] +'%',
          font: {
            family: 'Arial',
            size: 16,
            color: 'black'
          },
          showarrow: false
        };
      
        layout.annotations.push(result, result2);
      }
      
      Plotly.newPlot('myDiv', data, layout);
}