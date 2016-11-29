function CreateVisited(){
    var arr = new Array(SizeY);
    for(var i=0;i<SizeY;i++) {
        arr[i]=new Array(SizeX);
        for(var j=0;j<SizeX;j++)
            arr[i][j]=false;
    }
    return arr;
}
var visited = CreateVisited();
function AStar(){
    var open_list = new PriorityQueue({ comparator: function(a, b) {
  		if(a.cost+a.heu>b.cost+b.heu) return 1;
  		return -1;
  	}});
    open_list.queue({ i:ninja.position_x, j:ninja.position_y cost:0, heu:Heuristic(ninja), parent:null });
    while (open_list.length){
        var current = open_list.top();
        if(Heuristic(current)==0)
            return ConstructPath();
        open_list.dequeue();
        var wait = current;
        var up = current;
        var down = current;
        var left = current;
        var right = current;
        up.i--,down.i++,left.j--,right.j++;
        wait.cost=up.cost=down.cost=left.cost=right.cost=current.cost+1;
        up.heu=Heuristic(up),down.heu=Heuristic(down),left.heu=Heuristic(left),right.heu=Heuristic(right);
        up.parent=down.parent=left.parent=right.parent=current;
        if(isValid(wait)) open_list.queue(wait);
        if(isValid(up)&&!visited[up.i][up.j]) visited[up.i][up.j]=1,open_list.queue(up);
        if(isValid(down)&&!visited[up.i][up.j]) visited[up.i][up.j]=1,open_list.queue(up);
        if(isValid(left)&&!visited[up.i][up.j]) visited[up.i][up.j]=1,open_list.queue(up);
        if(isValid(right)&&!visited[up.i][up.j]) visited[up.i][up.j]=1,open_list.queue(up);
    }
  return false; // no path exists
}

function ConstructPath(node){
    var path=[];
    do{
        while(node.cost>node.parent.cost) path.push(node),node.cost--;
        node = node.parent;
    }
    while(node.parent!=null);
    while(node.cost>0) path.push(node),node.cost--;
    return path;
}

function Heuristic(node){
    return Math.abs(coin.position_x-node.i)+Math.abs(coin.position_y-node.j);
}
function isValid(node){
    if(i<0||i>=SizeX||j<0||j>=SizeY) return 0;
    return map[node[i]][node[i]];
}
