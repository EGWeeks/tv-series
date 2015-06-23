var WikiClient = function(showName, elementId){

  var wikiApi = 'http://en.wikipedia.org/w/api.php?format=json&action=query&titles=' + showName +'&prop=revisions&rvprop=content&callback=parseResponse&requestid=' + elementId;

  if (showName === 'Simpsons') {
    wikiApi = 'http://en.wikipedia.org/w/api.php?action=expandtemplates&text={{Template:The_Simpsons_episode_count}}&format=json&callback=parseSimpsons&requestid=' + elementId;
  }

  var script = document.createElement('script');
  script.src = wikiApi;
  document.body.appendChild(script);
}

var trash = [
  '([[Doctor Who missing episodes|97 missing]])',
  '([[List of MacGyver episodes|List of episodes]])<br />2 TV [[List of MacGyver episodes#TV Movies|films]]',
  '+ [[Burn Notice: The Fall of Sam Axe|1 movie]]',
  '+ original pilot<ref>{{cite web |url=http://www.eonline.com/news/117929/will-fox-air-dollhouse-s-final-episode-or-not |title=Will Fox Air Dollhouse\'s Final Episode or Not? |date=April 9, 2009 |accessdate=January 14, 2013',
  '+ (82 aired)',
  '<ref>This includes the special episodes "Documentary Special" and "Isaac and Ishmael".</ref>',
  '([[List of The Pacific episodes|List of episodes]])',
  '(and 1 pilot)',
  '(and 9 specials)'
];

var untrashData = function(data) {
  trash.forEach(function(trEl) {
    data = data.replace(trEl, '');
  });

  data = data.replace(/<!--(.*?)-->/gm, "");

  return data.replace(/( ?)=( ?)/gmi, ' ');
}

function parseResponse(response) {
  //console.log(response);
  try {
    var name = document.getElementById(response.requestid).dataset.name;
    var pages = response.query.pages;
    var page = Object.keys(pages);
    var content = pages[page].revisions[0]['*'];
    var index = content.indexOf('num_episodes');
    var content = content.slice(index, index+ (name === "Gomorrah" ? 30 : 300));

    content = untrashData(content);

    //OMG it's so ugly that I don't actually believe it will work
    content = parseInt(content.split('|')[0].trim().split(' ').pop(), 10);

    // console.log('a', content);
    if (name === 'Doctor Who') {
      // There are almost 700 episodes of Classic Dr Who. It shares Wiki
      // page with the series form 2005, so numbers are not correct.
      content -= 697;
    }

    parseWikiResponse({
    // console.log({
      id: response.requestid,
      content: content
    });
  } catch (e) {
    // Polish TV Shows don't have proper page on
    // English Wikipedia, so we will fill the data
    // during the rendering part
    console.log(e);
    console.log(response);
  }
}

function parseSimpsons(response) {
  parseWikiResponse({
    id: response.requestid,
    content: response.expandtemplates['*']
  });
}
