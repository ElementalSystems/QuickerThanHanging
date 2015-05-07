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
	   }
  if (found) setElementClass(event.currentTarget,'matched');
  else setElementClass(event.currentTarget,'error');
  
}

function startLevel(word)
{
	game.targetword=word;
	var t=document.getElementById('targetword');
	t.innerHTML=word;
	transformLetterTiles(t,'targetletters',true)
	game.targetletters=document.getElementsByClassName('targetletters');
}

configureControls();
startLevel('elegant');