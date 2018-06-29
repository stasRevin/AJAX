var init = function() {

    var form = document.createElement("form");
    var div = document.createElement("div");
    var input = document.createElement("input");
    var button = document.createElement("button");
    var lineBreak = document.createElement("br");

    div.className = "form-group";
    input.className = "form-control";
    input.id = "username";
    input.type = "text";
    button.type = "button";

    var buttonValue = document.createTextNode("Click me");
    button.appendChild(buttonValue);

    div.appendChild(input);
    div.appendChild(lineBreak);
    div.appendChild(button);
    form.appendChild(div);
    document.body.appendChild(form);


}