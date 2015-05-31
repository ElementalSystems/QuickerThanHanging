var game={};
var gamelevel=0;
var forceart=-1;
var forcelevel=-1;

function transformLetterTiles(element,extracls,replace)
{
	var text=element.innerHTML;
	var newtext='';
	for (var i=0;i<text.length;i+=1) {
		var ch=text.charAt(i);
		var cls='b1';
		if ('bdfhklt'.indexOf(ch)>=0) cls='b2';
		if ('gjpqy'.indexOf(ch)>=0) cls='b3';
		if (replace) ch='_';
		newtext=newtext+'<span class="let '+extracls+' '+cls+'">'+ch+'</span>';
	}
	element.innerHTML=newtext;
}

function configureControls()
{
  var items=document.getElementsByClassName('lettercontrols')
  for (var i=0;i<items.length;i+=1)
	transformLetterTiles(items[i],'letterbutton',false);
  
  var items=document.getElementsByClassName('letterbutton')
  for (var i=0;i<items.length;i+=1)
	items[i].onclick=letterButtonClicked;
  
  var details=getUrlVars();
  if (details["art"]) forceart=Number(details["art"]);
  if (details["lev"]) forcelevel=Number(details["lev"]);
  
}

function letterButtonClicked(event)
{
   var ch=event.currentTarget.innerHTML.charAt(0);
   var found=false;
   for (var i=0;i<game.targetword.length;i+=1)
	   if (ch==game.targetword.charAt(i)) {
		   found=true;
		   game.targetletters[i].innerHTML=ch;
		   game.hits+=1;
	   }
  if (found) setElementClass(event.currentTarget,'matched');
  else { 
    setElementClass(event.currentTarget,'error');
    game.errors+=1;
  }
  
  updateGameStatus()  
  
}

function updateGameStatus()
{
	if (game.hits==game.targetletters.length) {
		unsetElementClass(document.getElementById('gamewin'),'hidden');
	    setElementClass(document.getElementById('gamectl'),'hidden');		
	}
	if (game.errors==3) {
	   unsetElementClass(document.getElementById('gameloose'),'hidden');
	   setElementClass(document.getElementById('gamectl'),'hidden');		
	   document.getElementById('targetwordend').innerHTML=game.targetword;
	   document.getElementById('maxlevelend').innerHTML=gamelevel;	   
	   document.getElementById('restartlevel').innerHTML=(gamelevel<5)?gamelevel:gamelevel-gamelevel%5;	   
	   ga('send', 'event', 'FailedOn'+gamelevel);
	}
	game.image.style.backgroundPosition=(-game.errors*100)+"% 0%";
	
}

function startLevel(word)
{
	game.targetword=word;
	var t=document.getElementById('targetword');
	t.innerHTML=word;
	transformLetterTiles(t,'targetletters',true)
	game.targetletters=document.getElementsByClassName('targetletters');
	
	var items=document.getElementsByClassName('letterbutton')
	for (var i=0;i<items.length;i+=1) {
	  unsetElementClass(items[i],'matched');
	  unsetElementClass(items[i],'error');	  
	}
	game.hits=0;
	game.errors=0;	
	game.image=document.getElementById('picture');
	setElementClass(document.getElementById('gamewin'),'hidden');
	setElementClass(document.getElementById('gamemenu'),'hidden');
	setElementClass(document.getElementById('gameloose'),'hidden');
	unsetElementClass(document.getElementById('gamectl'),'hidden');
	
	
	var number=randomInt(1,4);
	if (forceart>-1)
		number=forceart;	
	game.image.style.backgroundImage='url(cartoon_'+number+'.png)';	
    updateGameStatus()  
  
}

var wordlevels=[ //requires at least fifty words in each of 10 levels - hectic
  ["thankfully","thankful","should","gender","garden","player","gloomy","gripped","sharpened","rejected","flatten","pattern","lighter","gathering","pharmacy","geography","photography","tankful","dislodged","packaging","indulging","debugged","mathematics","bearable","forceful","boastful","hearing","herding","hellish","sheepish"],
  ["solution","altercation","filling","bedding","flabby","fleet","addiction","deception","balloon","bellboy","bullets","altar","bolted","firmly","clogged","flogged","struggle","flight","plight","gadget","nudity","celery","cheery","quickly","phasing","bakery","qualify","quantity","finger","cottage","begrudge","flexible","doomed"],
  ["holding","alter","teeth","thump","thank","charged","shrug","shrill","animation","abbey","depiction","false","fumble","pamper","pepper","people","purple","squiggle","gland","hangman","victory","eight","light","fruity","purity","vanity","finery","homophobe","glider","unkempt","leaked","quietly","strength","length","pastry","funny"],
  ["angry","tepid","chirpy","thump","charged","gallop","gullet","gallery","jilted","felony","filch","babble","bubbly","feeble","double","grudge","haughty","hinge","handgun","ejects","backward","deity","aquaphobe","xenophobe","phantom","phantasm","party","photon","question","smitten","caught","jetlagged","pairing"],
  //Late start starts here
  ["cheap","yacht","bread","lofty","ugly","dandy","shrug","badge","dodge","edgy","couple","doubt","drug","sight","triumph","epitaph","kneel","cookbook","quibble","zealot"],
  ["kebab","judge","edge","ninja","banjo","conjure","geek","glyph","queue","slalom","beige","frogs","brown"],
  ["mahjong","kebab"]  
];

var wordsleft=[
 [],[],[],[],[],[],[],[],[],[]
];

function startOne(wordlistindex)
{
	var wordlist=wordsleft[wordlistindex];
	if (wordlist.length==0) wordlist=wordsleft[wordlistindex]=wordlevels[wordlistindex];
	var sel=Math.floor(Math.random()*wordlist.length);	
	var word=wordlist[sel];
	wordlist.splice(sel,1);
    startLevel(word);
}


function start(level)
{
	gamelevel=level;
	document.getElementById('levelid').innerHTML=level;	
	startOne(Math.floor(level/5));
	document.getElementById('helpabove').style.display=(level==0)?'block':'none';
	document.getElementById('helpbelow').style.display=(level==0)?'block':'none';
	ga('send', 'event', 'StartLevel'+level);	
}

function start_restartpoint()
{
	start((gamelevel<5)?gamelevel:gamelevel-gamelevel%5);
}

function reset()
{
	var t=document.getElementById('targetword');
	t.innerHTML="";
	setElementClass(document.getElementById('gamectl'),'hidden');
	setElementClass(document.getElementById('gamewin'),'hidden');
	setElementClass(document.getElementById('gameloose'),'hidden');
	unsetElementClass(document.getElementById('gamemenu'),'hidden');
	document.getElementById('picture').style.backgroundImage='url(cover.png)';	
 	document.getElementById('picture').style.backgroundPosition="0% 0%";
   
	if (forcelevel>-1)
		start(forcelevel);	
}


configureControls();
reset();