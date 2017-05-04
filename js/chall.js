/*
      avivace/dailyprogrammer/challenge.js
      twitter.com/avivace4 - www.avivace.ovh

      Renders the challenge passed as query string id.

      0.10
*/

// Pre-render escaped HTML
function htmlDecode(input){
   var e = document.createElement('div');
   e.innerHTML = input;
   return e.childNodes.lenght === 0 ? "" : e.childNodes[0].nodeValue;
 }

// Catch query strings
function getParameterByName(name, url) {  
     if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var id = getParameterByName('id')
var cb = 0;

$.getJSON(
  "https://www.reddit.com/r/dailyprogrammer/comments/"+id+".json?sort=top",
  function foo(data)
  {
    var title = data[0].data.children[0].data.title
    $('#navbar-title').append('Challenge #'+ title.substring(24,27));
    document.title = 'Challenge #'+ title.substring(24,27);
    $('#problem').append(htmlDecode( data[0].data.children[0].data.selftext_html));
    var sol_i = 3;
    for (var i = 0; i <sol_i; i++) {
      $('#solution').append("<h2>Solution "+(i+1)+"</h2> by ");
      $('#solution').append(htmlDecode(data[1].data.children[i].data.author));
      $('#solution').append(htmlDecode(data[1].data.children[i].data.body_html));
      if (i < sol_i-1)
        $('#solution').append("<br> <hr> <br>");
    }

    // Rewrite relative reddit links as absolutes (and open it in a new activity)
    var a_elements = document.getElementsByTagName("a");
    for (var i = 0; i < a_elements.length; i++) {
    //a_elements.forEach(){
       // console.log(a_elements[i].innerHTML);
       if (/\/[\w]\/[\w]*/.test(a_elements[i].innerHTML)){
         console.log("relative link trigger");
         a_elements[i].href='https://reddit.com'+a_elements[i].innerHTML;
         a_elements[i].target='_blank';
         console.log(a_elements[i]);
       }
    }

    // Mh
    setTimeout( function(){ 
          $('pre code').each(function(i, block) {
             hljs.highlightBlock(block);
            cb ++;
          });
          if (cb < 5){
            console.log("Retrying code highlight in 2 seconds.");
            setTimeout( function(){ 
              $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
                });
            }, 2000 );
          }
    }  , 1000 );

})