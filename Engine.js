function CreateVisited(){
    var arr = new Array(SizeY);
    for(var i=0;i<SizeY;i++) {
        arr[i]=new Array(SizeX);
        for(var j=0;j<SizeX;j++)
            arr[i][j]=false;
    }
    return arr;
}
function AStar(test){
    var visited = CreateVisited();
    var open_list = new PriorityQueue({ comparator: function(a, b) {
  		if(a.cost+a.heu>b.cost+b.heu||(a.cost+a.heu==b.cost+b.heu&&a.cost>b.cost)) return 1;
  		return -1;
  	}});
    visited[Ninja.Top][Ninja.Left]=1;
    open_list.queue({ Top:Ninja.Top, Left:Ninja.Left, cost:0, heu:Heuristic(Ninja), parent:null });
    while (open_list.length){
        var current = open_list.dequeue();
        visited[current.Top][current.Left]=1;
        if(test==undefined) UI.GetCell(current.Top,current.Left).classList.add("visited");
        if(Heuristic(current)==0)
            return ConstructPath(current);
        var up = JSON.parse(JSON.stringify(current));
        var down = JSON.parse(JSON.stringify(current));
        var left = JSON.parse(JSON.stringify(current));
        var right = JSON.parse(JSON.stringify(current));
        up.Top--,down.Top++,left.Left--,right.Left++;
        up.heu=Heuristic(up),down.heu=Heuristic(down),left.heu=Heuristic(left),right.heu=Heuristic(right);
        up.parent=down.parent=left.parent=right.parent=current;
        //if(isValid(wait)) open_list.queue(wait);
        var uf=0, df=0, lf=0, rf=0;
        for(var k=1;k<=10;k++){
            if(!isValid(current,current.cost+k-1)) continue;
            up.cost=down.cost=left.cost=right.cost=current.cost+k;
            if(isValid(up,up.cost)&&!visited[up.Top][up.Left]) uf=1,open_list.queue(JSON.parse(JSON.stringify(up)));
            if(isValid(down,down.cost)&&!visited[down.Top][down.Left]) df=1,open_list.queue(JSON.parse(JSON.stringify(down)));
            if(isValid(left,left.cost)&&!visited[left.Top][left.Left]) lf=1,open_list.queue(JSON.parse(JSON.stringify(left)));
            if(isValid(right,right.cost)&&!visited[right.Top][right.Left]) rf=1,open_list.queue(JSON.parse(JSON.stringify(right)));
        }
        if(uf) visited[up.Top][up.Left]=1;
        if(df) visited[down.Top][down.Left]=1;
        if(lf) visited[left.Top][left.Left]=1;
        if(rf) visited[right.Top][right.Left]=1;
    }
  return false; // no path exists
}

function ConstructPath(node){
    var path=[];
    path.push(JSON.parse(JSON.stringify(node)));
    do{
        while(node.cost>node.parent.cost) path.push(JSON.parse(JSON.stringify(node.parent))),node.cost--;
        node = node.parent;
    }
    while(node.parent!=null);
    while(node.cost>-1)path.push(JSON.parse(JSON.stringify(node))),node.cost--;
    return path.reverse();
}

function Heuristic(node){
    return Math.abs(Coin.Top-node.Top)+Math.abs(Coin.Left-node.Left);
}
function isValid(node,cost){
    cost+=UI.lastGuardPos;
    cost=Math.max(0,cost);
    if(node.Top<0||node.Top>=SizeX||node.Left<0||node.Left>=SizeY) return 0;
    var sol=true;
    for (var i = 0; i < Guards.length; i++) {
        var length = Guards[i].length;
        var index = GetMoveIndex(cost,length);
        sol&=!AreEqual(Guards[i][index],node);
        if(index>0)sol&=!AreEqual(Guards[i][index-1],node);
        if(index<Guards[i].length-1)sol&=!AreEqual(Guards[i][index+1],node);
    }
    return sol&&Map[node.Top][node.Left];
}
