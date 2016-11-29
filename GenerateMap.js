var treasure={};
function GenerateMap(){
    var arr= new Array(10);
    for(var i=0;i<10;i++)arr[i]=[1,1,1,1,1,1,1,1,1,1];
        var obstacle=0;
            while(obstacle!=10){
                var random_obstacle_position1 = Math.floor(Math.random()*10);
                var random_obstacle_position2 = Math.floor(Math.random()*10);
                if(arr[random_obstacle_position1][random_obstacle_position2]!=0){
                    arr[random_obstacle_position1][random_obstacle_position2]=0;
                    obstacle++;
                }
            }
            do{
                treasure.position_x = Math.floor(Math.random()*10);
                treasure.position_y = Math.floor(Math.random()*10);
    		}while(treasure.position_x > 4 && treasure.position_y > 9)
    return arr;
}
