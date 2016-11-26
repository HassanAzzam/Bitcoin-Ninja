
function CreateMap(){
    var game=document.getElementById('game');
    for(var i=0;i<map.length;i++){
        for(var j=0;j<map[i].length;j++){
            game.append('<div class="cell '++'"></div>');
        }
    }
}
var map = GenerateMap();
/*
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000



*/
