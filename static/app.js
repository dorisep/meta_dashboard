// var blah;
// let intiData = d3.select("#init_data")
// buildTable(data)
d3.json('/get_init_data').then((data) => {

    console.log(data)
    buildTable(data);
    makePictures(data);

});

// function filterData(data) {
//     data.forEach(element => {
//         buildTable(element)


//     });

// const filteredArr = metaArray.filter(function([album_genre, value]) {
// return value > 89
// })
// }


function buildTable(data) {
    d3.select("tbody")
        .selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .html(function(d) {
            return `<td>${d[1]}</td>
                <td>${d[2]}</td>
                <td>${d[11]}</td>
                <td>${d[3]}</td>
                <td>${d[5]}</td>
                <td>${d[6]}</td>
                <td>${d[10]}</td>`
        });
}

function makePictures(data) {
    d3.select(".MagicScroll")
        .selectAll("img")
        .data(data)
        .enter()
        .append("img")
        .html(function(d) {
            return `<img> src=${d[7]} </img>`
        });
}