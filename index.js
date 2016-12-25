
function GetMoveIndex(cnt, length){
    var div = Math.floor(cnt/length);
    var rem = cnt%length;
    if(div%2) return length - 1 - rem;
    return rem;
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
        game.innerHTML += ('<div class="cell char guard" style="transform:rotate(0deg);width:'+CellSize+'px;height:'+CellSize+'px"></div>');
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

function AreEqual(a,b){
    return a.Left==b.Left&&a.Top==b.Top;
}

function StartGame(ret,visualized){
    if(ret){
        var tmp = Ninja.Top; Ninja.Top = Coin.Top; Coin.Top = tmp;
        tmp = Ninja.Left; Ninja.Left = Coin.Left; Coin.Left = tmp;
    }
    else if(visualized){
        UI.RemoveAddGuard();
    }
    Path=new Array();
    Path = AStar(!visualized);
    console.log(Path);
    if(visualized) {
        UI.RunGame(ret);
        if(!Path) {
            UI.NoPath();
            return;
        }
    }
    //else
    if(!visualized&&!ret) StartGame(1,0);
}

SizeX = prompt("Enter map height:");
SizeX = parseInt(SizeX,10);
SizeY = 2*SizeX;
CellSize = 600/SizeX;
Obstacles = prompt("Enter obstacles(%):");
Obstacles = parseInt(Obstacles,10);
Obstacles = Math.floor(Obstacles*SizeX*SizeY/100);
Map = GenerateMap();
var vis = prompt("Visualized?(1 or 0):");
if(vis=="1") UI.CreateGame();
else StartGame(0,0);
