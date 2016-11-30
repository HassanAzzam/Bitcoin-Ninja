function Move(cell, char) {
    rotate(char, cell);
    char.style.top=""+cell.i*60+"px";
    char.style.left=""+cell.j*60+"px";
}
function rotate(char,cell) {
    var str;
    str = parseInt(char.style.top.split('p')[0],10);
    if (str < cell.i * 60) {//up
        char.style.transform = "rotate(180deg)";
    }
    if (str> cell.i * 60) {//down
        char.style.transform = "rotate(360deg)";
    }
    str = parseInt(char.style.left.split('p')[0],10);
    if (str > cell.j * 60) {//Right
        char.style.transform = "rotate(270deg)";
    }
    if (str < cell.j * 60) {//Left
        char.style.transform = "rotate(90deg)";
    }
}

var path;
function StartGame(){
    path = AStar();
    console.log(path);
    NinjaMove(0);
}
function NinjaMove(i) {
    if(i<path.length){
        Move(path[i], document.getElementById('ninja'));
    }
    else if(i<2*path.length-1){
        try{document.getElementById("coin").remove();}catch(x){};
        Move(path[path.length - 2 - i%path.length], document.getElementById('ninja'));
    }
    else return;
    setTimeout(NinjaMove.bind(null,i+1),300);
}
