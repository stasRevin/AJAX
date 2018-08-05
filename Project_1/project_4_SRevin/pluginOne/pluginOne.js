$(document).ready(function() {


    $("button").click(function(){
        $(".table2excel").table2excel({
        name: "Worksheet Name",
        filename: "SomeFile"
      });

    });

});
