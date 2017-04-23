var l =document.getElementById('light');
var d =document.getElementById('dark');

function drawCurrentSetting(){
    style = localStorage.getItem("style"); 
    console.log(style);
    if (style==2){
        d.checked = true;
    }
    else {
        style = 1;
        l.checked = true;
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

drawCurrentSetting();
style = localStorage.getItem("style"); 
styler(style);