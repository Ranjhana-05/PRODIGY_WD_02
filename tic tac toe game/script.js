let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let modeButtons = document.querySelectorAll(".mode-button");

let xWinsCount = 0;
let oWinsCount = 0;
let drawsCount = 0;

let xWinsRef = document.getElementById("x-wins");
let oWinsRef = document.getElementById("o-wins");
let drawsRef = document.getElementById("draws");

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]
];

let xTurn = true;
let count = 0;
let gameMode = "";

const disableButtons = () => {
    btnRef.forEach((element) => {
        element.disabled = true;
    });
    popupRef.classList.remove("hide");
};

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.classList.add("hide");
};

const checkWin = () => {
    for (let pattern of winningPattern) {
        let [a, b, c] = [
            btnRef[pattern[0]].innerText,
            btnRef[pattern[1]].innerText,
            btnRef[pattern[2]].innerText,
        ];
        if (a != "" && a == b && b == c) {
            disableButtons();
            if (a == "X") {
                xWinsCount += 1;
                xWinsRef.innerText = xWinsCount;
                msgRef.innerHTML = "'X' Wins";
            } else {
                oWinsCount += 1;
                oWinsRef.innerText = oWinsCount;
                msgRef.innerHTML = "'O' Wins";
            }
            return true;
        }
    }
    return false;
};

const checkDraw = () => {
    if (count == 9) {
        disableButtons();
        drawsCount += 1;
        drawsRef.innerText = drawsCount;
        msgRef.innerHTML = "It's a Draw";
        return true;
    }
    return false;
};

const aiMove = () => {
    let availableMoves = [];
    btnRef.forEach((btn, index) => {
        if (btn.innerText === "") {
            availableMoves.push(index);
        }
    });

    if (availableMoves.length > 0) {
        let aiChoice = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        btnRef[aiChoice].innerText = "O";
        btnRef[aiChoice].disabled = true;
        count += 1;

        if (!checkWin() && !checkDraw()) {
            xTurn = true;
        }
    }
};

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (element.innerText === "") {
            if (gameMode === "2-player") {
                if (xTurn) {
                    element.innerText = "X";
                } else {
                    element.innerText = "O";
                }
                element.disabled = true;
                count += 1;
                if (!checkWin() && !checkDraw()) {
                    xTurn = !xTurn;
                }
            } else if (gameMode === "vs-ai") {
                if (xTurn) {
                    element.innerText = "X";
                    element.disabled = true;
                    count += 1;
                    if (!checkWin() && !checkDraw()) {
                        xTurn = false;
                        setTimeout(aiMove, 500); 
                    }
                }
            }
        }
    });
});


newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});


restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
    xWinsCount = 0;
    oWinsCount = 0;
    drawsCount = 0;
    xWinsRef.innerText = xWinsCount;
    oWinsRef.innerText = oWinsCount;
    drawsRef.innerText = drawsCount;
});


modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        gameMode = button.getAttribute("data-mode");
        console.log("Selected mode:", gameMode);
    });
});
