document.onload = function (){
    
}
const gameBoard = (() => {
    var board = ["X","X","X","X","X","X","X","X","X"];
    const placeMarker = (index, sign) => {
        if (index > board.length) return;
        board[index] = sign;
    }
    const getMarker = (index) => {
        if(index > board.length) return;
        return board[index];
    }
    const resetBoard = (index) => {
        board = ["", "", "", "", "", "", "", "", ""];
    }
    const accessBoard = () => {
        return board;
    }
    return {placeMarker, getMarker, resetBoard, accessBoard};
})();
const Player = (sign) => {
    var sign = sign;
    const getSign = () => {return sign;};
}

const displayController = (() => {
    const updateDisplay = () => {
        let counter = 1;
        let board = gameBoard.accessBoard();
        board.forEach(function(mark){
            console.log(mark);
            document.getElementById(`item-${counter}`).innerHTML = mark;
            counter++;
        });
    }
    const resetDisplay = () => {
        for(let i = 1; i <= 9; i++){
            document.getElementById(`item-${i}`).innerHTML = "";
        }
    }
    return {updateDisplay, resetDisplay};
})();