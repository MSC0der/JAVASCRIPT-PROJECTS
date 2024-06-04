let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let players = document.querySelector("#players");
let vsComputer = document.querySelector("#vsComputer");
let choosePlayer = document.querySelector(".choose-player");
let clickCount = 0;

let turnO = true; // player x, player y

const winPatterns = [
    [0,1,2], [0,3,6],
    [0,4,8], [1,4,7], 
    [2,4,6], [2,5,8],
    [3,4,5], [6,7,8], 
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    window.scrollTo(0, 1000);
    clickCount = 0;
};

players.addEventListener("click", () => {
    players.classList.add("hide");
    vsComputer.classList.add("hide");
    window.scrollTo(0, 1000);
    console.log("2 players were clicked");
    boxes.forEach((box) => {
        box.addEventListener("click", () =>{
            if(turnO){
                box.innerText = "O";
                turnO = false;
            }
            else{
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            checkDraw();
            checkWinner();
            clickCount++;
        })
    });
})

vsComputer.addEventListener("click", () => {
    players.classList.add("hide");
    vsComputer.classList.add("hide");
    window.scrollTo(0, 1000);
    console.log("VS Computer were clicked");
    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            clickCount++;
            if(turnO) {
                box.innerText = "O";
                turnO = false;
                box.disabled = true;
                checkWinner();
                checkDraw();
                if(!turnO) {
                    setTimeout(computerMove, 100); // Add a delay for better UX
                }
            }
        })
    })
})

const compMove = () => {
    let indx;
    do {
        indx = Math.floor(Math.random() * 9);
    } while (boxes[indx].innerText !== "");
    return indx;
};

const computerMove = () => {
    let indx = compMove();
    boxes[indx].innerText = "X";
    boxes[indx].disabled = true;
    console.log("reached computer move");
    turnO = true;
    checkWinner();
};

checkDraw = () => {
    if(clickCount === 8)
        {
            window.scrollTo(0,0);
            msg.innerText = `Oops!!, The game is draw`;
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
}


const showWinner = (winner) => {
    window.scrollTo(0,0);
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const checkWinner =() => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText; 
        let pos2Val = boxes[pattern[1]].innerText; 
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" & pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){ 
                showWinner(pos1Val);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);