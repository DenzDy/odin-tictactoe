document.onload = function (){
    
}
const gameBoard = (() => {
    var board = ["X","X","X","X","X","X","X","X","X"];
    const placeMarker = (index, sign) => {
        if (index > board.length || board[index] != "") return;
        board[index] = sign;

    }
    const getMarker = (index) => {
        if(index > board.length) return;
        return board[index];
    }
    const resetBoard = () => {
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
    return {getSign};
}

const gameController = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    var gameover = false;
    var round = 1;
    const currentPlayerSign = () => {
        return round % 2 == 0 ? player2.getSign() : player1.getSign();
    }
    const playMove = (fieldIndex) => {
        if(gameover){return};
        gameBoard.placeMarker(fieldIndex, currentPlayerSign());
        displayController.updateDisplay();
        if(checkWinner(fieldIndex) && !checkTie()){
            console.log("hello");
            displayController.displayEndScreen(true, `Player ${currentPlayerSign()}`);
            gameover = true;
            return;
        }
        else if(checkTie() && !checkWinner(fieldIndex)){
            displayController.displayEndScreen(false, "");
            gameover = true;
            return;
        }
        else{
            displayController.changeCurrentPlayerDisplay(round);
            round++;
        }
        
    }
    const resetGame = () => {
        round = 1;
        gameover = false;
        gameBoard.resetBoard();
        console.log(gameBoard.accessBoard());
        displayController.resetDisplay();
    }
    const checkWinner = (fieldIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        return winConditions.filter((combination) => combination.includes(parseInt(fieldIndex))).some((possibleCombination) => possibleCombination.every((index) => gameBoard.getMarker(index) === currentPlayerSign()));
    }
    const checkTie = () => {
        return gameBoard.accessBoard().filter((fieldItem) => fieldItem == "").length == 0;
     }
    return {currentPlayerSign, playMove, resetGame, checkWinner};
})();

const displayController = (() => {
    let check = false;
    const updateDisplay = () => {
        let counter = 1;
        let board = gameBoard.accessBoard();
        if(!check){
            let fieldElements = document.getElementsByClassName("board-item");
            
            for(let field of fieldElements){
                field.addEventListener("click", (e) => {
                    gameController.playMove(e.target.dataset.index);
                });
            }
            check = true;
        }
        board.forEach(function(mark){
            document.getElementById(`item-${counter}`).innerHTML = mark;
            counter++;
        });
    }
    const resetDisplay = () => {
        for(let i = 1; i <= 9; i++){
            document.getElementById(`item-${i}`).innerHTML = "";
        }
    }
    const displayEndScreen = (winCondition, winner) => {
        let end_screen = document.getElementById("turn");
        if(winCondition){
            end_screen.innerHTML = `${winner} wins!`;
        }
        else{
            end_screen.innerHTML = "Tie!";
        }
    }
 

    const changeCurrentPlayerDisplay = (currentRound) => {
        let end_screen = document.getElementById("turn");
        end_screen.innerHTML = currentRound % 2 == 0 ? "Player X's turn": "Player O's turn";
    }
     return {updateDisplay, resetDisplay, displayEndScreen, changeCurrentPlayerDisplay};
})();
