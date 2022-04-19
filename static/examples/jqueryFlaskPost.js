
function send_response_to_other_url(data) {
    // here comes code that uses $.ajax and POST to another URL
}
$(function() {
    $("#generate_transaction").click(function(){
        $.ajax({
            url:"/new/transaction",
            type:"POST",
            dataType: 'json',
            headers: {'Access-Control-Allow-Origin': '*'},
            data:$('#transaction_form').serialize(),

            success: function(response){
                //setting the Amount field empty
                document.getElementById('Amount').value = ''
                //we assume that 'response' contains the data 
                // you want to send to another url - right?
                send_response_to_other_url(response)
                


            },
            error: function(error){

                console.log(error);
            }
        });

    });

    });

