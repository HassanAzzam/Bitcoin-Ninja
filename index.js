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
    console.log(Guards[Guards.length-1]);
}
function CreateMap(){
    var game=document.getElementById('game');
    for(var i=0;i<Map.length;i++){
        for(var j=0;j<Map[i].length;j++){
            game.innerHTML += ('<div id="'+i+'-'+j+'" class="cell '+((Map[i][j])? 'empty add':'wall')+'"></div>');
            if((i== Coin.position_x && j==Coin.position_y) || (i== Ninja.position_x && j==Ninja.position_y))
                game.lastChild.classList.remove("empty"), game.lastChild.classList.remove("add");
            if(Map[i][j])
            game.lastChild.setAttribute('onclick',"AddGuard(this)");
        }
    }
    game.innerHTML += ('<div id="coin" class="cell char"></div>');
    game.innerHTML += ('<div id="ninja" class="cell char" style="transform:rotate(0deg)" onclick="StartGame()"></div>');
    //game.innerHTML += ('<div class="cell char guard"></div>');
            document.getElementById("coin").style.top=""+Coin.position_x*60+"px";
            document.getElementById("coin").style.left=""+Coin.position_y*60+"px";

            document.getElementById("ninja").style.top=""+Ninja.position_x*60+"px";
            document.getElementById("ninja").style.left=""+Ninja.position_y*60+"px";
}
Map = GenerateMap();
CreateMap();

function StartGame(){
    var add = document.getElementsByClassName('add');
    for(var i=0; i<add.length;) {
        add[i].setAttribute('onclick','');
        add[i].classList.remove('add');
    }
    document.getElementById('ninja').setAttribute('onclick',"");
    Path = AStar();
    console.log(Path);
    UI.SimulateNinjaMove(0);
    UI.SimulateGuardMove(0);
}
