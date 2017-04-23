/*
      avivace/dailyprogrammer/front.js
      twitter.com/avivace4 - www.avivace.ovh

      Renders the challenge list, with title and a description peek for every
      challenge.

      0.4
*/

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
function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
    return e.childNodes.lenght === 0 ? "" : e.childNodes[0].nodeValue;
  }

var after_string;

function renderChallenges(after){
    $.getJSON(
    "https://www.reddit.com/r/dailyprogrammer/new.json" + after,
    function foo(data)
    {
      $.each(
        data.data.children.slice(0, 100),
        function (i, post) {
          if (post.data.title.indexOf('Challenge') !== -1 || post.data.title.indexOf('Weekly') !== -1){
            var card_style = 'red';
            var diff = '<i style="font-size:12px" class=" material-icons">lens</i><i style="font-size:12px" class=" material-icons">lens</i><i style="font-size:12px" class=" material-icons">lens</i>';
            if (post.data.title.indexOf('Easy') !== -1) {
              card_style='green';
              diff='<i style="font-size:12px" class=" material-icons">lens</i>';
            } else if (post.data.title.indexOf('Intermediate') !== -1) {
              card_style='orange';
              diff='<i style="font-size:12px" class=" material-icons">lens</i><i style="font-size:12px" class=" material-icons">lens</i>';
            } else if (post.data.title.indexOf('Weekly') !== -1) {
              card_style='blue';
              diff='<i style="font-size:12px" class=" material-icons">lens</i>';
            }
            
            if (after_string) {
              var link = 'chall.html?i='+i+'&after='+after_string;
            }
            else{
              var link = 'chall.html?i='+i;
            }
            var header = post.data.title.substring(27, post.data.title.lenght).replace("[Easy]", '').replace("[Easy/Med]", '').replace("[Easy/Intemerdiate]", '').replace("[Easy/Intermediate]", '').replace("[Hard]", '').replace("[Intermediate]", '');
            var body = removeMd(post.data.selftext).replace('Description','').substring(0,300)+ ' ...';

            // Weekly
            if (card_style == 'blue') header = post.data.title.substring(0, post.data.title.lenght);

            // border-bottom: 1px solidf rgba(0, 0, 0, 0.12);

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
            var p1 = '<div id='+'"CH'+i+'"'+'class="col s12 m6 card ';

            //var card_o = p1+card_color+'">  <div class="card-content" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"><span class="card-title '+text_color+'">'+header+'</span><p class="'+text_color+'">'+body+'</p></div><div class="card-action"><a href="'+link+'" style="font-weight: 500;" class="'+text_color+'">GO TO CHALLENGE &nbsp;<i style="vertical-align: -15%; font-size: 16px;" class="material-icons">launch</i></a>  <a style="font-size: 14px ;color:'+ diff_col +'; position: absolute; right: 0px"><b> '+diff+'</b> </a></div></div>';

            var card = p1+card_color+'">  <div class="card-content" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"><span class="truncate card-title '+text_color+'"><a style="color: '+ title_color +'; text-shadow: 1px 1px 2px #BBB;">'+ header+'</a><div class="chip" style="font-size: 12px ;color:'+ diff_col +'; position: absolute; right: 3%"><b> '+diff+'</b> </div></span><p class="'+text_color+'">'+body+'</p></div></div></div>';
            var card_nodiff = p1+card_color+'">  <div class="card-content" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"><span class="truncate card-title '+text_color+'"><a  style="color: '+ title_color +'; text-shadow: 1px 1px 2px #BBB;">'+ header+'</a><a style="font-size: 14px ;color:'+ diff_col +'; position: absolute; right: 3%"><b></b> </a></span><p class="'+text_color+'">'+body+'</p></div></div></div>';

            var idd = after_string +'_'+ i;
            $("#all").append('<div id="'+idd.substring(7, idd.lenght)+'">'+card+'</div>');
            
            $("#"+idd.substring(7, idd.lenght)).click(function(e){
              //e.preventDefault();
              window.location = link;    
            });

            if (post.data.title.indexOf('Easy') !== -1) {
              $("#easy").append('<div id="a'+i+'">'+card_nodiff+'</div>');
            } else if (post.data.title.indexOf('Intermediate') !== -1) {
              $("#med").append('<div id="a'+i+'">'+card_nodiff+'</div>');
            } else if (post.data.title.indexOf('Hard') !== -1) {
              $("#hard").append('<div id="a'+i+'">'+card_nodiff+'</div>');
            }

            $("#a"+i).click(function(e){
              //e.preventDefault();
              window.location = link;    
            });


            /*$("#cc").append('<div class="row">  <div class="col s12 m6"><div class="card blue-grey darken-1">  <div class="card-content white-text">');
            $("#cc").append('<span class="card-title">'+ header + '</span>');
            $("#cc").append('<p>Description PLACEHOLDER</p> </div> <div class="card-action"> <a href="#">GO TO CHALLENGE</a> </div> </div>  </div> </div>');

            $("#cards").append('  <div class="card card-'+diff_col+'"> <div class="card-main"> <div class="card-inner"> <p class="card-heading" id="heading2">'+ header +'</p> <p>'+ body + '</p> </div> <div class="card-action"> <div class="card-action-btn pull-left"> <a class="btn btn-flat waves-attach" href="'+ link +'">&nbsp;GO TO CHALLENGE<span class="icon margin-left-sm">open_in_new</span></a></div></div></div> </div>');*/
          }
        }
      )
      after_string = '?after='+ data.data.after;
    }
  )
}

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       //alert("bottom!");
       renderChallenges(after_string);
   }
});

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
    Materialize.toast('Application updated to version 0.8! Enjoy the new features', 5000)
  }
  localStorage.setItem("version", actual_version);
}

actual_version = 9;
notifyUpdate();
renderChallenges('');
hidePost();