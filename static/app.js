// var blah;
// let intiData = d3.select("#init_data")
// buildTable(data)
d3.json('/get_init_data').then((data) => {
    blah = data;
    console.log(blah);
});

// function filterData(data) {
//     data.forEach(element => {
//         if (element.meta_score > 90) {
//             console.log(element)
//             buildTable(element)
//         }
//         const metaArray = Object.entries(element)

//         const metaScoreObject = metaArray[4]
//             // console.log(typeof metaScoreObject[1])
//             // metaScoreArray.filter(function([key, value]) {
//             //     console.log(value);
//             // });

//     });

//     // const filteredArr = metaArray.filter(function([album_genre, value]) {
//     // return value > 89
//     // })
// }


function buildTable(data) {
    console.log(data)
    d3.select("tbody")
        .selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .html(function(d) {
            console.log(d)
            {
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
// // d3.select("tbody")
// // .selectAll("tr")
// // .data(album)
// // .enter()
// // .append("tr")
// // .html(function(d) {
// //     return `<td>${d.artist}</td><td>${d.album}</td><td>${d.album_genre}</td><td>${d.date}</td><td>${d.meta_score}</td><td>${d.user_score}</td><td>${d.record_label}</td>`;
// // });