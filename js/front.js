/*
      avivace/dailyprogrammer/front.js
      twitter.com/avivace4 - www.avivace.ovh

      Renders the challenge list, with title and a description peek for every
      challenge. Handles difficulty filtering.
*/

var after_string;
var loading = 0;
var cp = 0;
var row_id = 0;
var actual_version = 10;

var diff_obj = {
  easy: true,
  med: true,
  hard: true
}

// Markdown to plain text (.selftext)
function removeMd(md, options) {
  options = options || {};
  options.stripListLeaders = options.hasOwnProperty('stripListLeaders') ? options.stripListLeaders : true;
  options.gfm = options.hasOwnProperty('gfm') ? options.gfm : true;

  var output = md;
  try {
    if (options.stripListLeaders) {
      output = output.replace(/^([\s\t]*)([\*\-\+]|\d\.)\s+/gm, '$1');
    }
    if (options.gfm){
      output = output
        // Header
        .replace(/\n={2,}/g, '\n')
        // Strikethrough
        .replace(/~~/g, '')
        // Fenced codeblocks
        .replace(/`{3}.*\n/g, '');
    }
    output = output
      // Remove HTML tags
      .replace(/<(.*?)>/g, '$1')
      // Remove setext-style headers
      .replace(/^[=\-]{2,}\s*$/g, '')
      // Remove footnotes?
      .replace(/\[\^.+?\](\: .*?$)?/g, '')
      .replace(/\s{0,2}\[.*?\]: .*?$/g, '')
      // Remove images
      .replace(/\!\[.*?\][\[\(].*?[\]\)]/g, '')
      // Remove inline links
      .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, '$1')
      // Remove Blockquotes
      .replace(/>/g, '')
      // Remove reference-style links?
      .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
      // Remove atx-style headers
      .replace(/^\#{1,6}\s*([^#]*)\s*(\#{1,6})?/gm, '$1')
      .replace(/([\*_]{1,3})(\S.*?\S)\1/g, '$2')
      .replace(/(`{3,})(.*?)\1/gm, '$2')
      .replace(/^-{3,}\s*$/g, '')
      .replace(/`(.+?)`/g, '$1')
      .replace(/\n{2,}/g, '\n\n');
  } catch(e) {
    console.error(e);
    return md;
  }
  return output;
};

// Pre render HTML (.selftext_html)
function htmlDecode(input) {
  var e = document.createElement('div');
  e.innerHTML = input;
    return e.childNodes.lenght === 0 ? "" : e.childNodes[0].nodeValue;
  }

function isElementInViewport(el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function showEasy(){
  diff_obj = {
    easy: true,
    med: false,
    hard: false
  }
  $("#all").html('');
  renderChallenges('');
}

function showAll(){
  diff_obj = {
    easy: true,
    med: true,
    hard: true
  }
  $("#all").html('');
  renderChallenges('');
}

function showMed(){
  diff_obj = {
    easy: false,
    med: true,
    hard: false
  }
  $("#all").html('');
  renderChallenges('');
}

function showHard(){
  diff_obj = {
    easy: false,
    med: false,
    hard: true,
  }
  $("#all").html('');
  renderChallenges('');
}

function renderChallenges(after){
    $.getJSON(
    "https://www.reddit.com/r/dailyprogrammer/new.json" + after,
    function foo(data)
    {
      $.each(
        // TODO: partial loading
        data.data.children,
        function (i, post) {
          if (post.data.title.indexOf('Challenge') !== -1 || post.data.title.indexOf('Weekly') !== -1){
            // Parse difficulty
            var card_style = 'red';
            var difficulty = 'hard';
            var diff = '<i style="font-size:12px" class=" material-icons">lens</i><i style="font-size:12px" class=" material-icons">lens</i><i style="font-size:12px" class=" material-icons">lens</i>';
            if (post.data.title.indexOf('Easy') !== -1) {
              difficulty = 'easy';
              card_style='green';
              diff='<i style="font-size:12px" class=" material-icons">lens</i>';
            } else if (post.data.title.indexOf('Intermediate') !== -1) {
              difficulty = 'med';
              card_style='orange';
              diff='<i style="font-size:12px" class=" material-icons">lens</i><i style="font-size:12px" class=" material-icons">lens</i>';
            } else if (post.data.title.indexOf('Weekly') !== -1) {
              difficulty = 'weekly';
              card_style='blue';
              diff='<i style="font-size:12px" class=" material-icons">lens</i>';
            }
            
            if (diff_obj[difficulty]){
              var id = post.data.id;
              console.log('Rendering challenge '+id);
              var link = 'chall.html?id='+id;

              // Beautify title
              var header = post.data.title.substring(27, post.data.title.lenght).replace("[Easy]", '').replace("[Easy/Med]", '').replace("[Easy/Intemerdiate]", '').replace("[Easy/Intermediate]", '').replace("[Hard]", '').replace("[Intermediate]", '');
              // Description peek
              var body = removeMd(post.data.selftext).replace('Description','').substring(0,300)+ ' ...';

              // Full title for weekly  (non-standard)
              if (card_style == 'blue') header = post.data.title.substring(0, post.data.title.lenght);

              // Let's build the card
              if (card_style == 'white'){
                var card_color = 'white';
                var text_color = 'black-text';
              }
              else if (card_style == 'red') {
                var card_color = 'white';
                var text_color = 'black-text';
                var diff_col = '#F22613'; 
              }
              else if (card_style == 'green') {
                var diff_col = '#26C281'; 
                var card_color = 'white';
                var text_color = 'black-text';

              }
              else if (card_style == 'orange') {
                var diff_col = 'orange'; 
                var card_color = 'white';
                var text_color = 'black-text';
              }
              else if (card_style == 'blue') {
                var diff_col = 'lightblue'; 
                var card_color = 'white';
                var text_color = 'black-text';
              }

              var title_color = 'black';
              if (dark){
                card_color = 'black'
                text_color = 'white-text'
                title_color = 'white'
              }

              
              var p1 = '<div id="'+ id +'" class="col s12 m6 l5 xl4"><div class="card ' + difficulty + ' ';

              var card = p1+card_color+'" >  <div class="card-content"><span class="truncate card-title '+text_color+'"><a style="color: '+ title_color +'; text-shadow: 1px 1px 2px #BBB;">'+ header+'</a><div class="chip" style="font-size: 12px ;color:'+ diff_col +'; position: absolute; right: 3%"><b> '+diff+'</b> </div></span><p class="'+text_color+'">'+body+'</p></div></div></div></div>';
              var card_nodiff = p1+card_color+'">  <div class="card-content" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"><span class="truncate card-title '+text_color+'"><a  style="color: '+ title_color +'; text-shadow: 1px 1px 2px #BBB;">'+ header+'</a><a style="font-size: 14px ;color:'+ diff_col +'; position: absolute; right: 3%"><b></b> </a></span><p class="'+text_color+'">'+body+'</p></div></div></div>';
              
              console.log("row " + row_id);
              
              if (cp == 0){
                card2 = '<div class="hide-on-med-and-down col m1 l1 xl2"></div>' + card
                console.log("lx");
                cp = 1;
                var row = '<div class="row" id="'+row_id+'"></div>'
                $("#all").append(row);
                $("#"+row_id).append(card2);
                row_id++;
              }
              else if (cp == 1) {
                console.log("rx")
                cp = 0;
                card2 = card + '<div class="hide-on-med-and-down col m1 l1 xl2"></div>'
                $("#"+(row_id-1)).append(card2);
              }

              $("#"+id).click(function(e){
                //e.preventDefault();
                window.location = link;    
              });

            }            
          }
        }
      );
      after_string = '?after='+ data.data.after;
      loading = 0;
      $("#loading").hide();
      // NOTE: maybe this needs to be checked one time only
      if ( isElementInViewport($("#bottom")[0]) ){
        console.log("I can see the light with after_string ="+after_string);
        renderChallenges(after_string);
        $("#loading").show();
        loading = 1;
      }
    }
  )
}

function hideN(){
  localStorage.setItem("hideN", true);
  Materialize.toast('You can still find those links in the About page', 5000)
  hidePost();
}

function hidePost(){
  if (localStorage.getItem("hideN")){
    var Post = document.getElementById('notification');
    Post.style.display='none';
  }
}

function notifyUpdate(){
  vs = localStorage.getItem("version");
  if (vs < actual_version){
    Materialize.toast('Application updated to version 0.10! Enjoy the new features', 5000)
  }
  localStorage.setItem("version", actual_version);
}

// NOTE: give a ~5% tolerance to avoid having to bump to the bottom
$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height() && !loading) {
       console.log("reached bottom with after_string ="+after_string);
       renderChallenges(after_string);
       $("#loading").show();
       loading = 1;
   }
});

hidePost();
notifyUpdate();
renderChallenges('');