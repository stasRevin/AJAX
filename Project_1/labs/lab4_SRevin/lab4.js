function init() {

    var btnInline1 = document.getElementById("average");
    var btnInline2 = document.getElementById("good");
    var btnInline3 = document.getElementById("excellent");

    var btnListener1 = document.getElementById("tall");
    var btnListener2 = document.getElementById("averageHeight");
    var btnListener3 = document.getElementById("short");

    btnInline1.onclick = dotNotation;
    btnInline2.onclick = dotNotation;
    btnInline3.onclick = dotNotation;

    if (window.addEventListener) {

        btnListener1.addEventListener("click", w3c, false);
        btnListener2.addEventListener("click", w3c, false);
        btnListener3.addEventListener("click", w3c, false);

    } else {

        btnListener1.attachEvent("onclick", w3c);
        btnListener2.attachEvent("onclick", w3c);
        btnListener3.attachEvent("onclick", w3c);
    }



}

function inline(value) {

    console.log("Value for inline: " + value);

}

function dotNotation() {

    console.log("Value for dotNotation: " + this.value);

}

function w3c() {

    var control;

    if (window.event) {

        control = window.event.srcElement;

    } else {

        control = this;
    }

    console.log("Value for w3c: " + control.value);
}