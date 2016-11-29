function Move(cell, char) {
    rotate(char, cell);
    char.style.top = cell.j * 60;
    char.style.left = cell.i * 60;
}
function rotate(char,cell) {
    if (char.style.top < cell.j * 60) {//up
        char.style.rotate = "rotate(0deg)";
    }
    if (char.style.top > cell.j * 60) {//down
        char.style.rotate = "rotate(180deg)";
    }
    if (char.style.left > cell.i * 60) {//Right
        char.style.rotate = "rotate(90deg)";
    }
    if (char.style.left < cell.i * 60) {//Left
        char.style.rotate = "rotate(270deg)";
    }
}
