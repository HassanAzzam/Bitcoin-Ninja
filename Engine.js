var SizeX=10, SizeY=20;
function CreateVisited(){
    var arr = new Array(SizeY);
    for(var i=0;i<SizeY;i++) {
        arr[i]=new Array(SizeX);
        for(var j=0;j<SizeX;j++)
            arr[i][j]=false;
    }
    return arr;
}
function GetCell(i,j){
    return document.getElementById(""+i+"-"+j);
}
var visited = CreateVisited();
function AStar(){
    var open_list = new PriorityQueue({ comparator: function(a, b) {
  		if(a.cost+a.heu>b.cost+b.heu||(a.cost+a.heu==b.cost+b.heu&&a.cost>b.cost)) return 1;
  		return -1;
  	}});
    visited[ninja.position_x][ninja.position_y]=1;
    open_list.queue({ i:ninja.position_x, j:ninja.position_y, cost:0, heu:Heuristic(ninja), parent:null });
    while (open_list.length){
        var current = open_list.dequeue();
        GetCell(current.i,current.j).classList.add("visited");
        if(Heuristic(current)==0)
            return ConstructPath(current);
        var up = JSON.parse(JSON.stringify(current));
        var down = JSON.parse(JSON.stringify(current));
        var left = JSON.parse(JSON.stringify(current));
        var right = JSON.parse(JSON.stringify(current));
        up.i--,down.i++,left.j--,right.j++;
        up.heu=Heuristic(up),down.heu=Heuristic(down),left.heu=Heuristic(left),right.heu=Heuristic(right);
        up.parent=down.parent=left.parent=right.parent=current;
        //if(isValid(wait)) open_list.queue(wait);
        for(var k=1;k<=10;k++){
            up.cost=down.cost=left.cost=right.cost=current.cost+k;
            if(isValid(up)&&!visited[up.i][up.j]) open_list.queue(JSON.parse(JSON.stringify(up)));
            if(isValid(down)&&!visited[down.i][down.j]) open_list.queue(JSON.parse(JSON.stringify(down)));
            if(isValid(left)&&!visited[left.i][left.j]) open_list.queue(JSON.parse(JSON.stringify(left)));
            if(isValid(right)&&!visited[right.i][right.j]) open_list.queue(JSON.parse(JSON.stringify(right)));
        }
        if(isValid(up)) visited[up.i][up.j]=1;
        if(isValid(down)) visited[down.i][down.j]=1;
        if(isValid(left)) visited[left.i][left.j]=1;
        if(isValid(right)) visited[right.i][right.j]=1;
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
    while(node.cost>-1) path.push(node),node.cost--;
    return path.reverse();
}

function Heuristic(node){
    return Math.abs(coin.position_x-node.i)+Math.abs(coin.position_y-node.j);
}
function isValid(node){
    if(node.i<0||node.i>=SizeX||node.j<0||node.j>=SizeY) return 0;
    return map[node.i][node.j];
}
