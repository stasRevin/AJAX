(function($) {
    $(document).ready(function() {

        $("body").append($("<input type='button' value='click me'>"));
        $("input[type='button']").click(function(){

            console.log("cubs stink");
        });

        /*
        $("li").mouseover(function() {
            $(this).css("backgroundColor", "yellow");
        }).mouseout(function() {
            $(this).css("backgroundColor", "white");
        });
        */

        $("ul").on("mouseover", "li", function() {
            $(this).css("backgroundColor", "yellow");
        });

        $("ul").on("mouseout", "li", function() {
            $(this).css("backgroundColor", "white");
        });

        $("ul").append($("<li>new task</li>"));

        $("body").append("<input id='eventsOffbtn' type='button' value='remove mouse events'>");

        $("body").on("click", "#eventsOffbtn", function() {

            $("ul").off("mouseover", "li").off("mouseout", "li");

        });

    })


})(jQuery)