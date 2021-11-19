d3.json('/data/scrape_records.json').then((data) => {
    buildTable(data)

});

function filterData(data) {
    data.forEach(element => {
        if (element.meta_score > 90) {
            console.log(element)
            buildTable(element)
        }
        const metaArray = Object.entries(element)

        const metaScoreObject = metaArray[4]
            // console.log(typeof metaScoreObject[1])
            // metaScoreArray.filter(function([key, value]) {
            //     console.log(value);
            // });

    });

    // const filteredArr = metaArray.filter(function([album_genre, value]) {
    // return value > 89
    // })
}


function buildTable(data) {
    d3.select("tbody")
        .selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .html(function(d) {
            if (d.meta_score > 89) {
                return `<td>${d.artist}</td>
                <td>${d.album}</td>
                <td>${d.album_genre}</td>
                <td>${d.date}</td>
                <td>${d.meta_score}</td>
                <td>${d.user_score}</td>
                <td>${d.record_label}</td>`
            }

        });
}
// d3.select("tbody")
// .selectAll("tr")
// .data(album)
// .enter()
// .append("tr")
// .html(function(d) {
//     return `<td>${d.artist}</td><td>${d.album}</td><td>${d.album_genre}</td><td>${d.date}</td><td>${d.meta_score}</td><td>${d.user_score}</td><td>${d.record_label}</td>`;
// });