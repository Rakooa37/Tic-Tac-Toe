const Computer = ()=>{
    let computerSymbol = "";


    function randomPos(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    function makeMove(){
        if(gameBoard.board.length > 0){
            let pos = randomPos(1,9);
            let cell = document.querySelector(`[data-index= "${pos}"]`);
        while(cell.innerHTML !== "" && (gameBoard.board.length < 8)){
            pos = randomPos(1,9);
            cell = document.querySelector(`[data-index= "${pos}"]`);
        }
        if(cell.innerHTML === ""){
            return pos.toString();
        }
        }
        
    }
    


    
    return {computerSymbol, makeMove};
}



//Player

const Player = (name)=>{
    const computer = Computer();
    let playerSymbol = "";
    

    const symbolO = document.querySelector("#o");
    const symbolX = document.querySelector("#x");
    
    

    symbolO.addEventListener("click", ()=>{
        
        playerSymbol = symbolO.innerHTML;
        computer.computerSymbol = "X";
        symbolO.style.backgroundColor = "cyan";
        symbolX.disabled = true;
        
    })

    symbolX.addEventListener("click", ()=>{
       
        
        playerSymbol = symbolX.innerHTML;
        computer.computerSymbol = "O";
        symbolX.style.backgroundColor = "cyan";
        symbolO.disabled = true;

    })

    const cells = document.querySelectorAll(".item");
    cells.forEach((cell)=>cell.addEventListener('click', ()=>{
        if(cell.innerHTML === ""){
            if(symbolX.disabled === true || symbolO.disabled === true){
                gameBoard.add(playerSymbol, cell.dataset.index);
                gameBoard.render();
                if(gameBoard.board.length < 9){
                    const pos = computer.makeMove();
                    gameBoard.add(computer.computerSymbol, pos);
                    gameBoard.render();
                }
                
               
            }
            
        }
        
    }))

    const reset = document.querySelector(".reset");
    reset.addEventListener("click", ()=>{
        gameBoard.clear();
        playerSymbol = "";
        computer.computerSymbol = "";
        gameBoard.render();
        
    })

    const resetGame = document.querySelector(".reset-game");
    resetGame.addEventListener("click", ()=>{
        gameBoard.clear();
        playerSymbol = "";
        computer.computerSymbol = "";
        gameBoard.render();
        const modal = document.querySelector(".modal-container");
        modal.style.display = "none";  
    })



    return {playerSymbol,computer}
}



//GAMEBOARD
const gameBoard = (()=>{
    const player = Player("realPlayer");

    const board = [];
    const add = (symbol, pos)=>{
        board.push({symbol, pos});
        board.sort((a,b)=>{return a.pos - b.pos});
    }

    const render = () =>{
        console.log(gameBoard.board);
        if(board.length === 0){
            const cells = document.querySelectorAll(".item")
            cells.forEach(cell=>{
                cell.innerHTML = "";
        })
        }else{
            board.forEach(element=>{
                const cell = document.querySelector(`[data-index= "${element.pos}"]`);
                cell.innerHTML = element.symbol;
            })
        }


        const symbolO = document.querySelector("#o");
        const symbolX = document.querySelector("#x");
        let computerSymbol = "";
        if(symbolO.style.backgroundColor === "cyan"){
            player.playerSymbol = "O";
            player.computer.computerSymbol = "X";

        }else{
            player.playerSymbol = "X";
            player.computer.computerSymbol = "O";
        }

        
        if(checkWinner() === player.playerSymbol){
            const modal = document.querySelector(".modal-container");
            modal.style.display = "flex";
            const content = document.querySelector(".content");
            content.innerHTML =`<span class ="congratulations">Congratulations! </span><br>
            You win!` ;
            const close = document.querySelector('.close');
            close.addEventListener("click", ()=>{
                modal.style.display = "none";
            })
        }

        if(checkWinner() === player.computer.computerSymbol){
            const modal = document.querySelector(".modal-container");
            const content = document.querySelector(".content");
            content.innerHTML =`<span class ="congratulations">Oh well... </span><br>
            You lost!` ;
            modal.style.display = "flex";
            const close = document.querySelector('.close');
            close.addEventListener("click", ()=>{
                modal.style.display = "none";
            })
        }   

        if(board.length === 9 && checkWinner() === undefined){
            const modal = document.querySelector(".modal-container");
            const content = document.querySelector(".content");
            content.innerHTML =`<span class ="congratulations">Ha ha... </span><br>
            It's a draw!` ;
            modal.style.display = "flex";
            const close = document.querySelector('.close');
            close.addEventListener("click", ()=>{
                modal.style.display = "none";
            })
        }
        
    }

    const clear = () =>{
        board.length = 0;
        const symbolO = document.querySelector("#o");
        const symbolX = document.querySelector("#x");
        symbolX.disabled = false;    
        symbolO.disabled = false;
        symbolX.style.backgroundColor = "grey";
        symbolO.style.backgroundColor = "grey";
    }

    const checkWinner= ()=>{
        possibilities = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
        const xElements = [];
        const oElements = [];
        board.forEach(element=>{
            if(element.symbol === "X"){
                xElements.push(element.pos);
            }else{
                oElements.push(element.pos);
            }
        })

        let counter = 0;
        for(let i = 0; i < possibilities.length; i++){
            
             counter = 0;
            for(let j = 0; j < 3; j++){
                for(let k = 0; k < xElements.length; k++){
                    if(xElements[k] == possibilities[i][j]){
                        counter++;
                        if(counter === 3){
                            return "X";
                        }
                    }
                }
            }
        }

        counter = 0;
        for(let i = 0; i < possibilities.length; i++){
            
             counter = 0;
            for(let j = 0; j < 3; j++){
                for(let k = 0; k < oElements.length; k++){
                    if(oElements[k] == possibilities[i][j]){
                        counter++;
                        if(counter === 3){
                            return "O";
                        }
                    }
                }
            }
        }

        

    }

    return{board, add, clear, render, checkWinner};

})();




