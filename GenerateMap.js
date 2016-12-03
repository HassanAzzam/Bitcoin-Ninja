
function GenerateMap(){
var arr = new Array(SizeX);
    for(var i=0;i<SizeX;i++) {
        arr[i]=new Array(SizeY);
        for(var j=0;j<SizeY;j++)
            arr[i][j]=1;
    }
        var obstacle=0;
            while(obstacle!=50){
                var random_obstacle_Top = Math.floor(Math.random()*SizeX);
                var random_obstacle_Left = Math.floor(Math.random()*SizeY);
                if(arr[random_obstacle_Top][random_obstacle_Left]!=0){
                    arr[random_obstacle_Top][random_obstacle_Left]=0;
                    obstacle++;
                }
            }
            do{
                Coin.Top = Math.floor(Math.random()*SizeX);
                Coin.Left = Math.floor(Math.random()*SizeY);
            }while((Coin.Top > 5 || Coin.Left > 5)
                || (arr[Coin.Top][Coin.Left]==0));

            do{
                Ninja.Top = Math.floor(Math.random()*SizeX);
                Ninja.Left = Math.floor(Math.random()*SizeY);
            }while((Ninja.Top < 5 || Ninja.Left < 15) || (arr[Ninja.Top][Ninja.Left]==0));

    return arr;
}
