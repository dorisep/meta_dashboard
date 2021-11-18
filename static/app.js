d3.json('/data/scrape_records.json').then((data) => {
    buildTable(data)
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
// d3.select("tbody")
// .selectAll("tr")
// .data(album)
// .enter()
// .append("tr")
// .html(function(d) {
//     return `<td>${d.artist}</td><td>${d.album}</td><td>${d.album_genre}</td><td>${d.date}</td><td>${d.meta_score}</td><td>${d.user_score}</td><td>${d.record_label}</td>`;
// });