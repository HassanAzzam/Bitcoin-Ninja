
function GenerateMap(){
var arr = new Array(SizeX);
    for(var i=0;i<SizeX;i++) {
        arr[i]=new Array(SizeY);
        for(var j=0;j<SizeY;j++)
            arr[i][j]=1;
    }
        var obstacle=0;
            while(obstacle!=50){
                var random_obstacle_position_x = Math.floor(Math.random()*SizeX);
                var random_obstacle_position_y = Math.floor(Math.random()*SizeY);
                if(arr[random_obstacle_position_x][random_obstacle_position_y]!=0){
                    arr[random_obstacle_position_x][random_obstacle_position_y]=0;
                    obstacle++;
                }
            }
            do{
                Coin.position_x = Math.floor(Math.random()*SizeX);
                Coin.position_y = Math.floor(Math.random()*SizeY);
            }while((Coin.position_x > 5 || Coin.position_y > 5)
                || (arr[Coin.position_x][Coin.position_y]==0));

            do{
                Ninja.position_x = Math.floor(Math.random()*SizeX);
                Ninja.position_y = Math.floor(Math.random()*SizeY);
            }while((Ninja.position_x < 5 || Ninja.position_y < 15) || (arr[Ninja.position_x][Ninja.position_y]==0));

    return arr;
}
