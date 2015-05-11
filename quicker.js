var game={};

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
	setElementClass(document.getElementById('gameloose'),'hidden');
	unsetElementClass(document.getElementById('gamectl'),'hidden');
	
    updateGameStatus()  
  
}

function startOneOf(wordlist)
{
  var sel=Math.floor(Math.random()*wordlist.length);	
  startLevel(wordlist[sel]);
}

function start()
{
	startOneOf(["cheap","alter","yacht","teeth","bread","angry","lofty","tepid","chirpy","thump","charged","ugly","dandy","shrug"]);
}


configureControls();
start();