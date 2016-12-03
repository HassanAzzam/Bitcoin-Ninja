function CreateVisited(){
    var arr = new Array(SizeY);
    for(var i=0;i<SizeY;i++) {
        arr[i]=new Array(SizeX);
        for(var j=0;j<SizeX;j++)
            arr[i][j]=false;
    }
    return arr;
}
function AStar(){
    var visited = CreateVisited();
    var open_list = new PriorityQueue({ comparator: function(a, b) {
  		if(a.cost+a.heu>b.cost+b.heu||(a.cost+a.heu==b.cost+b.heu&&a.cost>b.cost)) return 1;
  		return -1;
  	}});
    visited[Ninja.Top][Ninja.Left]=1;
    open_list.queue({ Top:Ninja.Top, Left:Ninja.Left, cost:0, heu:Heuristic(Ninja), parent:null });
    while (open_list.length){
        var current = open_list.dequeue();
        UI.GetCell(current.Top,current.Left).classList.add("visited");
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
        for(var k=1;k<=10;k++){
            up.cost=down.cost=left.cost=right.cost=current.cost+k;
            if(isValid(up,up.cost)&&!visited[up.Top][up.Left]) open_list.queue(JSON.parse(JSON.stringify(up)));
            if(isValid(down,down.cost)&&!visited[down.Top][down.Left]) open_list.queue(JSON.parse(JSON.stringify(down)));
            if(isValid(left,left.cost)&&!visited[left.Top][left.Left]) open_list.queue(JSON.parse(JSON.stringify(left)));
            if(isValid(right,right.cost)&&!visited[right.Top][right.Left]) open_list.queue(JSON.parse(JSON.stringify(right)));
        }
        if(isValid(up,up.cost)) visited[up.Top][up.Left]=1;
        if(isValid(down,down.cost)) visited[down.Top][down.Left]=1;
        if(isValid(left,left.cost)) visited[left.Top][left.Left]=1;
        if(isValid(right,right.cost)) visited[right.Top][right.Left]=1;
    }
  return false; // no path exists
}

function ConstructPath(node){
    var path=[];
    do{
        while(node.cost>node.parent.cost) path.push(JSON.parse(JSON.stringify(node))),node.cost--;
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
    cost--;
	cost=Math.max(0,cost);
    if(node.Top<0||node.Top>=SizeX||node.Left<0||node.Left>=SizeY) return 0;
    for(var j=cost-2; j<=cost+2;j++){ //Ignore 2steps before and 2steps after
        for (var i = 0; i < Guards.length; i++) {
            var length = Guards[i].length;
            var position;
            if (Math.floor(cost / length) % 2){
                position = Guards[i][length - 1 - cost%length];
                if(AreEqual(position,node)) 
return false;
            }
            else {
                position = Guards[i][cost%length];
                if(AreEqual(position,node)) 
return false;
            }
        }
    }
    return Map[node.Top][node.Left];
}
