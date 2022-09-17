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
            console.log(data)
        },
        error: function(textStatus, errorThrown) {
            console.log("FAILED to get data");
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}