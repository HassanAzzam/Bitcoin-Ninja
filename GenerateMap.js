var coin={};
var ninja={};
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
                coin.position_x = Math.floor(Math.random()*SizeX);
                coin.position_y = Math.floor(Math.random()*SizeY);
            }while((coin.position_x > 5 || coin.position_y > 5)
                || (arr[coin.position_x][coin.position_y]==0));

            do{
                ninja.position_x = Math.floor(Math.random()*SizeX);
                ninja.position_y = Math.floor(Math.random()*SizeY);
            }while((ninja.position_x < 5 || ninja.position_y < 15) || (arr[ninja.position_x][ninja.position_y]==0));

    return arr;
}
