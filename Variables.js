var SizeX=12, SizeY=24;
var CellSize=50;
var Obstacles=0;
var Path;
var Coin={};
var Ninja={};
var Map;
var Guards=[];
var CurrentGuardMoves=[];
var UI={
	lastGuardPos: 0,
	CellHighlight: "0.2",

    Move: function(cell, char) {
        UI.Rotate(char, cell);
        UI.SetCellPosition(char,cell);
    },

    SimulateNinjaMove: function(i) {
        if(i<Path.length){
            UI.Move(Path[i], document.getElementById('ninja'));
			if(i) UI.GetCell(Path[i-1].Top, Path[i-1].Left).classList.remove('ninja-here');
			//UI.GetCell(Path[i].Top, Path[i].Left).classList.add('ninja-here');
			var here = UI.GetCell(Path[i].Top, Path[i].Left);
			here.style.opacity=UI.CellHighlight;
			if(here.style.backgroundColor=="red") here.style.backgroundColor="rgb(236, 65, 0)"
        }
        else {
			if(UI.CellHighlight=="0.2")
			StartGame(1,1);
			return;
		}
		UI.SimulateGuardMove(i);
        setTimeout(UI.SimulateNinjaMove.bind(null,i+1),300);
    },

    SimulateGuardMove: function(cnt) {
		cnt--;
		cnt+=UI.lastGuardPos;
		if(cnt<0) return;
        for (var i = 0; i < Guards.length; i++) {
			var index;
			var length = Guards[i].length;
			if(cnt>1) {
				index = GetMoveIndex(cnt-2,length);
				UI.GetCell(Guards[i][index].Top,Guards[i][index].Left).classList.remove('danger');
			}

			index = GetMoveIndex(cnt,length);
            UI.Move(Guards[i][index], document.getElementsByClassName('guard')[i]);

			UI.GetCell(Guards[i][index].Top,Guards[i][index].Left).classList.add('danger');
			if(index>0) UI.GetCell(Guards[i][index-1].Top,Guards[i][index-1].Left).classList.add('danger');
	        if(index<Guards[i].length-1) UI.GetCell(Guards[i][index+1].Top,Guards[i][index+1].Left).classList.add('danger');

        }
    },

    Rotate: function(char,cell) {
        var cur, rot,tmp;
        cur = {Left:parseInt(char.style.left.split('p')[0],10) , Top:parseInt(char.style.top.split('p')[0],10)};
        rot = parseInt(char.style.transform.split('(')[1].split('d')[0],10);
        tmp=rot+360;
        if(tmp%360==0){
            if (cur.Left > cell.Left * CellSize) char.style.transform = "rotate("+(rot-90)+"deg)";
            else if (cur.Left < cell.Left * CellSize) char.style.transform = "rotate("+(rot+90)+"deg)";
            else if(cur.Top < cell.Top * CellSize) char.style.transform = "rotate("+(rot+180)+"deg)";
        }
        else if(tmp%360==270){
            if (cur.Top < cell.Top * CellSize) char.style.transform = "rotate("+(rot-90)+"deg)";
            else if (cur.Top > cell.Top * CellSize) char.style.transform = "rotate("+(rot+90)+"deg)";
            else if(cur.Left < cell.Left * CellSize) char.style.transform = "rotate("+(rot+180)+"deg)";
        }
        else if(tmp%360==180){
            if (cur.Left < cell.Left * CellSize) char.style.transform = "rotate("+(rot-90)+"deg)";
            else if (cur.Left > cell.Left * CellSize) char.style.transform = "rotate("+(rot+90)+"deg)";
            else if(cur.Top > cell.Top * CellSize) char.style.transform = "rotate("+(rot+180)+"deg)";
        }
        else{
            if (cur.Top > cell.Top * CellSize) char.style.transform = "rotate("+(rot-90)+"deg)";
            else if (cur.Top < cell.Top * CellSize) char.style.transform = "rotate("+(rot+90)+"deg)";
            else if(cur.Left > cell.Left * CellSize) char.style.transform = "rotate("+(rot+180)+"deg)";
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
        cell.style.top=""+(position.Top*CellSize)+"px";
        cell.style.left=""+(position.Left*CellSize)+"px";
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
    },

	RemoveAddGuard: function(){
		var add = document.getElementsByClassName('add');
	    for(var i=0; i<add.length;) {
	        add[i].setAttribute('onclick','');
	        add[i].classList.remove('add');
	    }
	},

	NoPath: function(){
	        document.getElementsByTagName('section')[1].style.display='block';
	        document.getElementById('ninja').setAttribute('onclick',"");
	},

	RunGame: function(ret){
		if(ret){
	        document.getElementById("coin").remove();
			UI.lastGuardPos=Path.length-1;
	        UI.CellHighlight="0.3";
		}
		else{
	    	document.getElementById('ninja').setAttribute('onclick',"");
		}
		UI.SimulateNinjaMove(0);
	},

	CreateGame: function(){
	    var game=document.getElementById('game');
	    var template="";
	    for(var i=0;i<Map.length;i++){
	        for(var j=0;j<Map[i].length;j++){
	            var s = '<div id="'+i+'-'+j+'" style="width:'+CellSize+'px;height:'+CellSize+'px" class="cell '+((Map[i][j])? 'empty add':'wall');
	            if((i== Coin.Top && j==Coin.Left) || (i== Ninja.Top && j==Ninja.Left))
	                s=s.replace(s.length-1-'empty add'.length,'empty add'.length,'');
	            s+='" onclick="';
	            if(Map[i][j]) s+='AddGuard(this)';
	            s+='"></div>';
	            template+=s;
	        }
	    }
	    template+='<div id="coin" class="cell char" style="width:'+CellSize+'px;height:'+CellSize+'px"></div>';
	    template+='<div id="ninja" class="cell char" style="transform:rotate(0deg);width:'+CellSize+'px;height:'+CellSize+'px" onclick="StartGame(0,1)"></div>';
	    game.innerHTML+=template;
	    UI.SetCellPosition(document.getElementById("coin"),Coin);
	    UI.SetCellPosition(document.getElementById("ninja"),Ninja);
	}
};
