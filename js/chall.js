/*
      avivace/dailyprogrammer/challenge.js
      twitter.com/avivace4 - www.avivace.ovh

      Renders the challenge passed as query string i.

      0.5
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
if (getParameterByName('after')){
  var after_string = getParameterByName('after');
}
else {
  var after_string = ''
}

console.log(after_string);
$.getJSON(
  "https://www.reddit.com/r/dailyprogrammer/new.json"+after_string,
  function foo(data)
  {
    var ci = parseInt(getParameterByName('i'));
    var cb = 0;
    $.each (
      data.data.children.slice(ci,ci+1),
      function (i, post) {
        $('#title2').append('Challenge #'+ post.data.title.substring(24,27));
        $('#title').append('Challenge #'+ post.data.title.substring(24,27));

        $('#problem').append(htmlDecode(post.data.selftext_html));
        $('#problem').append('Challenge created by <b>' +post.data.author+'</b>');
        // Solutions
        var challengeJSON = "https://www.reddit.com/r/dailyprogrammer/comments/"+post.data.id+".json?sort=top";
        $.getJSON(
          challengeJSON,
          function appendComments(comments)
          {
            var sol_i = 3;    // Numbers of solution to show
            //Slice & Print
            for (var i = 0; i <sol_i; i++) {

              $('#solution').append("<a style='color: black; font-size: 24px'>Solution "+(i+1)+"</a> by ");
              $('#solution').append(htmlDecode(comments[1].data.children[i].data.author));
              $('#solution').append(htmlDecode(comments[1].data.children[i].data.body_html));
              if (i < sol_i-1)
                $('#solution').append("<br> <hr> <br>");
              
            }
          })
        
      }
    )

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

    // TODO: really?
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