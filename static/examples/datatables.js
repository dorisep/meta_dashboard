$(document).ready(function() {
    doWork()
})


$(document).ready(function() {
    $('#example').DataTable( {
        "ajax": "data/arrays.txt"
    } );
} );