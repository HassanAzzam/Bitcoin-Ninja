var SizeX=10, SizeY=20;
var GuardMove=[];
function ClearQueue(){
    for(var k = GuardMove.length - 1; k >= 0; k--) {
        GuardMove[k].classList.remove('empty-active');
        GuardMove[k].setAttribute('onclick',"AddGuard(this)");
        GuardMove.splice(k, 1);
    }
}
function Extend(cell,add){
    cell.classList.remove('empty');
    ClearQueue();
    cell.style.backgroundColor= "rgba(255,0,0,0.025)";
    cell.style.outline="1px solid rgba(255,0,0,0.2)";
    var i=parseInt(cell.id[0],10);
    var j=parseInt(cell.id[1],10);
    if(add){
        game.innerHTML += ('<div class="cell char guard"></div>');
        game.lastChild.style.top=(i*60)+"px";
        game.lastChild.style.left=(j*60)+"px";
    }
    cell.setAttribute('onclick',"");
    var adj=[
        document.getElementById(""+(i-1)+j),
        document.getElementById(""+(i+1)+j),
        document.getElementById(""+i+(j-1)),
        document.getElementById(""+i+(j+1)),
    ];
    adj.forEach(function(item){
        if(item==null||!item.classList.contains('empty')) return;
        item.classList.add('empty-active');
        item.setAttribute('onclick',"AddRange(this)");
        GuardMove.push(item);
    });
}
function AddRange(cell){
    Extend(cell,0);
    var i=parseInt(cell.id[0],10);
    var j=parseInt(cell.id[1],10);
    guards[guards.length-1].push({i,j});
    cell.style.backgroundImage= null;
}
function AddGuard(cell){
    Extend(cell,1);
    var i=parseInt(cell.id[0],10);
    var j=parseInt(cell.id[1],10);
    guards.push([{i,j}]);
    console.log(guards[guards.length-1]);
}
function CreateMap(){
    var game=document.getElementById('game');
    for(var i=0;i<map.length;i++){
        for(var j=0;j<map[i].length;j++){
            game.innerHTML += ('<div id="'+i+'-'+j+'" class="cell '+((map[i][j])? 'empty':'wall')+'"></div>');

            if(map[i][j])
            game.lastChild.setAttribute('onclick',"AddGuard(this)");
        }
    }
    game.innerHTML += ('<div id="ninja" class="cell char"></div>');
    game.innerHTML += ('<div id="coin" class="cell char"></div>');
    //game.innerHTML += ('<div class="cell char guard"></div>');
            document.getElementById("coin").style.top=""+coin.position_x*60+"px";
            document.getElementById("coin").style.left=""+coin.position_y*60+"px";

            document.getElementById("ninja").style.top=""+ninja.position_x*60+"px";
            document.getElementById("ninja").style.left=""+ninja.position_y*60+"px";
}
var map = GenerateMap();
var guards=[];
CreateMap();
