var dark;

function styler(attr){
  var href;
  switch(attr){
    case '1':
      theme = "css/style.css";
      hl_theme = "css/hl_default.css"
      dark = false;
      break;
    case '2':
      theme= "css/dark.css";
      hl_theme = "css/monokai.css"
      dark = true;
      break;
    default:;break;
    }
    document.getElementById('styleSheet').href = theme;
    if (document.title == "Challenge")
      document.getElementById('hl_styleSheet').href = hl_theme;
  }


style = localStorage.getItem("style"); 
styler(style);