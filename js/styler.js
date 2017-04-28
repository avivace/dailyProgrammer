var dark;

function styler(attr){
  var href;
  switch(attr){
    default:
    case '1':
      theme = "css/light.css";
      theme = "dist/light_bundle.css";
      hl_theme = "css/hl_default.css"
      try {
        Android.sbColor(255,158,158,158);
      } catch (e) {
        console.log('not running in a android webview');
      }
      dark = false;
      break;
    case '2':
      theme= "css/dark.css";
      hl_theme = "css/monokai.css"
      try {
        Android.sbColor(255,0,0,0);
      } catch (e) {
        console.log('not running in a android webview');
      }
      dark = true;
      break;
    }
    document.getElementById('styleSheet').href = theme;
    if (document.title == "Challenge")
      document.getElementById('hl_styleSheet').href = hl_theme;
}

// localStorage.clear(); 
style = localStorage.getItem("style"); 
if (style){
  styler(style);
}
else {
  styler(1);
}