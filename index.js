function GetMoveIndex(cnt, length){
    if(length==1) return 0;
    var double = 2*(length-1);
    cnt -= Math.floor(cnt/double)*double;
    if (cnt<length)
        return cnt;
    else return double-cnt;
}
function ClearQueue(){
    for(var k = CurrentGuardMoves.length - 1; k >= 0; k--) {
        CurrentGuardMoves[k].classList.remove('add-active');
        CurrentGuardMoves[k].setAttribute('onclick',"AddGuard(this)");
        CurrentGuardMoves.splice(k, 1);
    }
}
function Extend(cell,add){
    cell.classList.remove('add');
    ClearQueue();
    cell.style.backgroundColor= "red";
    cell.style.outline="1px solid red";
    cell.setAttribute('onclick',"");
    if(add){
        game.innerHTML += ('<div class="cell char guard" style="transform:rotate(0deg)"></div>');
        UI.SetCellPosition(game.lastChild,UI.GetCellPosition(cell));
    }
    UI.HighlightAdjcent(cell);
}


function AddRange(cell){
    Extend(cell,0);
    Guards[Guards.length-1].push(UI.GetCellPosition(cell));
    cell.style.backgroundImage= null;
}
function AddGuard(cell){
    Extend(cell,1);
    Guards.push([UI.GetCellPosition(cell)]);
}
function CreateMap(){
    var game=document.getElementById('game');
    for(var i=0;i<Map.length;i++){
        for(var j=0;j<Map[i].length;j++){
            game.innerHTML += ('<div id="'+i+'-'+j+'" class="cell '+((Map[i][j])? 'empty add':'wall')+'"></div>');
            if((i== Coin.Top && j==Coin.Left) || (i== Ninja.Top && j==Ninja.Left))
                game.lastChild.classList.remove("empty"), game.lastChild.classList.remove("add");
            if(Map[i][j])
            game.lastChild.setAttribute('onclick',"AddGuard(this)");
        }
    }
    game.innerHTML += ('<div id="coin" class="cell char"></div>');
    game.innerHTML += ('<div id="ninja" class="cell char" style="transform:rotate(0deg)" onclick="StartGame()"></div>');
    UI.SetCellPosition(document.getElementById("coin"),Coin);
    UI.SetCellPosition(document.getElementById("ninja"),Ninja);
}

function AreEqual(a,b){
    return a.Left==b.Left&&a.Top==b.Top;
}

function StartGame(){
    var add = document.getElementsByClassName('add');
    for(var i=0; i<add.length;) {
        add[i].setAttribute('onclick','');
        add[i].classList.remove('add');
    }
    Path = AStar();
    console.log(Path);
        //Path.splice(0,1);
    if(document.getElementById('ninja').getAttribute('onclick')=="") {
        //Path.splice(0,1);
        UI.SimulateNinjaMove(0);
        return;
    }
    UI.SimulateNinjaMove(0);
    document.getElementById('ninja').setAttribute('onclick',"");
    setTimeout(function(){
        if(!AreEqual(Path[Path.length-1],Coin)) return;
	    UI.lastGuardPos=Path.length-1;
        Path=new Array();
        document.getElementById("coin").remove();
        var tmp = Ninja.Top; Ninja.Top = Coin.Top; Coin.Top = tmp;
        tmp = Ninja.Left; Ninja.Left = Coin.Left; Coin.Left = tmp;
        StartGame();
    },(Path.length+0.5)*300);
}

Map = GenerateMap();
CreateMap();
