
function GenerateMap(){
var arr = new Array(SizeX);
    for(var i=0;i<SizeX;i++) {
        arr[i]=new Array(SizeY);
        for(var j=0;j<SizeY;j++)
            arr[i][j]=1;
    }
    Coin.Top = Math.floor(Math.random()*(SizeX/4));
    Coin.Left = Math.floor(Math.random()*(SizeY/4));
    Ninja.Top = Math.floor(Math.random()*(SizeX/4)+(3*SizeX/4));
    Ninja.Left = Math.floor(Math.random()*(SizeY/4)+(3*SizeY/4));
    var obstacle=0;
    while(obstacle!=Obstacles){
        var random_obstacle = {
            Top: Math.floor(Math.random()*SizeX),
            Left: Math.floor(Math.random()*SizeY)
        };
        if(arr[random_obstacle.Top][random_obstacle.Left]!=0&&!AreEqual(random_obstacle,Ninja)&&!AreEqual(random_obstacle,Coin)){
            arr[random_obstacle.Top][random_obstacle.Left]=0;
            obstacle++;
        }
    }
    Map = arr;
    //var test = AStar(1);
    return arr;
    if(!test)
    return GenerateMap();
    return arr;
}
