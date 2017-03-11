var l =document.getElementById('light');
var d =document.getElementById('dark');

function drawCurrentSetting(){
    style = localStorage.getItem("style"); 
    console.log(style);
    if (style==1) {
        l.checked = true;
        console.log("drawinLightRadio");
    }
    if (style==2) {
        d.checked = true;
        console.log("drawingDarkRadio");
    }
}   

function apply() {
    if (l.checked) localStorage.setItem("style", 1);
    if (d.checked) localStorage.setItem("style", 2);
    console.log(l.checked);
    style = localStorage.getItem("style"); 
    styler(style);
    Materialize.toast('Settings applied', 4000)
}

function styler(attr){
    var href;
    switch (attr) {
        case '1':
            href = "css/style.css";
            break;
        case '2':
            href = "css/dark.css";
            console.log("df");
            break;
        default:;break;
    }
    document.getElementById('styleSheet').href = href;
}


drawCurrentSetting();
style = localStorage.getItem("style"); 
styler(style);