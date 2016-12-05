var SizeX=10, SizeY=20;
var Path;
var Coin={};
var Ninja={};
var Map;
var Guards=[];
var CurrentGuardMoves=[];
var UI={
	lastGuardPos: 0,

    Move: function(cell, char) {
        UI.Rotate(char, cell);
        UI.SetCellPosition(char,cell);
    },

    SimulateNinjaMove: function(i) {
        if(i<Path.length){
            UI.Move(Path[i], document.getElementById('ninja'));
        }
        else return;
		UI.SimulateGuardMove(i);
        setTimeout(UI.SimulateNinjaMove.bind(null,i+1),300);
    },

    SimulateGuardMove: function(cnt) {
	cnt+=UI.lastGuardPos;
        for (var i = 0; i < Guards.length; i++) {
            var length = Guards[i].length;
			var index = GetMoveIndex(cnt,length);
            UI.Move(Guards[i][index], document.getElementsByClassName('guard')[i]);
        }
    },

    Rotate: function(char,cell) {
        var cur, rot,tmp;
        cur = {Left:parseInt(char.style.left.split('p')[0],10) , Top:parseInt(char.style.top.split('p')[0],10)};
        rot = parseInt(char.style.transform.split('(')[1].split('d')[0],10);
        tmp=rot+360;
        if(tmp%360==0){
            if (cur.Left > cell.Left * 60) char.style.transform = "rotate("+(rot-90)+"deg)";
            else if (cur.Left < cell.Left * 60) char.style.transform = "rotate("+(rot+90)+"deg)";
            else if(cur.Top < cell.Top * 60) char.style.transform = "rotate("+(rot+180)+"deg)";
        }
        else if(tmp%360==270){
            if (cur.Top < cell.Top * 60) char.style.transform = "rotate("+(rot-90)+"deg)";
            else if (cur.Top > cell.Top * 60) char.style.transform = "rotate("+(rot+90)+"deg)";
            else if(cur.Left < cell.Left * 60) char.style.transform = "rotate("+(rot+180)+"deg)";
        }
        else if(tmp%360==180){
            if (cur.Left < cell.Left * 60) char.style.transform = "rotate("+(rot-90)+"deg)";
            else if (cur.Left > cell.Left * 60) char.style.transform = "rotate("+(rot+90)+"deg)";
            else if(cur.Top > cell.Top * 60) char.style.transform = "rotate("+(rot+180)+"deg)";
        }
        else{
            if (cur.Top > cell.Top * 60) char.style.transform = "rotate("+(rot-90)+"deg)";
            else if (cur.Top < cell.Top * 60) char.style.transform = "rotate("+(rot+90)+"deg)";
            else if(cur.Left > cell.Left * 60) char.style.transform = "rotate("+(rot+180)+"deg)";
        }
    },

    GetCell: function(i,j){
        return document.getElementById(""+i+"-"+j);
    },

    GetCellPosition: function(cell){
        var IdStr = cell.id;
        var SplittedId = IdStr.split('-');
        var i=parseInt(SplittedId[0],10);
        var j=parseInt(SplittedId[1],10);
        return {Top:i, Left:j};
    },

    SetCellPosition: function(cell,position){
        cell.style.top=""+(position.Top*60)+"px";
        cell.style.left=""+(position.Left*60)+"px";
    },

    HighlightAdjcent: function(cell){
        var position = UI.GetCellPosition(cell);
        var adjcent = [
            UI.GetCell(position.Top-1,position.Left),
            UI.GetCell(position.Top+1,position.Left),
            UI.GetCell(position.Top,position.Left-1),
            UI.GetCell(position.Top,position.Left+1),
        ];
        adjcent.forEach(function(item){
            if(item==null||!item.classList.contains('add')) return;
            item.classList.add('add-active');
            item.setAttribute('onclick',"AddRange(this)");
            CurrentGuardMoves.push(item);
        });
    }
};
