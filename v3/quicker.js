var game={};
var gamelevel=0;

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
	
	var number=Math.floor(Math.random()*2)+1;
	game.image.style.backgroundImage='url(cartoon'+number+'.png)';
	
    updateGameStatus()  
  
}

var wordlevels=[ //requires at least fifty words in each of 10 levels - hectic
  ["solution","altercation","filling","bedding","flabby","fleet","addiction","deception","balloon","bellboy","bullets","altar","bolted","firmly","clogged","flogged","struggle"],
  ["alter","teeth","thump","charged","shrug","shrill","animation","abbey","depiction","filch","false","fumble","pamper","pepper","people","purple","squiggle"],
  ["angry","tepid","chirpy","thump","charged","gallop","gullet","gallery","jilted","felony","babble","bubbly","feeble","double"],
  ["cheap","yacht","bread","lofty","ugly","dandy","shrug","badge","dodge","edgy","couple","doubt","drug"],
  ["kebab","judge","edge","ninja","banjo","conjure"],
  ["mahjong"]  
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
}

function reset()
{
	var t=document.getElementById('targetword');
	t.innerHTML="quicker than hanging";
	transformLetterTiles(t,'targetletters',false);	
	setElementClass(document.getElementById('gamectl'),'hidden');
	setElementClass(document.getElementById('gamewin'),'hidden');
	setElementClass(document.getElementById('gameloose'),'hidden');
	unsetElementClass(document.getElementById('gamemenu'),'hidden');
	
}


configureControls();
reset();