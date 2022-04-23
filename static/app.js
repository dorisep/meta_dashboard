$(document).ready(function() {
    console.log('page loaded')
    const url = "/get_init_data"
    let hey = getData(url)
    console.log(hey)
})

function getData(url){
    var tData;
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            console.log('data loaded')
            tData = data.response.data;
            return tData
        },
        error: function(textStatus, errorThrown) {
            console.log("FAILED to get data");
            console.log(textStatus);
            console.log(errorThrown);
            alert(errorThrown.response);
        }
        
    });
    console.log('hey')
    console.log(tData)
    }
