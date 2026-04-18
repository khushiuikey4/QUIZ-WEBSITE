let URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
let qArr = [];
let qIndx = 0;
let opts = document.querySelectorAll(".opt");
let qBox = document.querySelector(".question-box");
let Actualcorrect = new Array(10);
let userCorrect = new Array(10);
let optionBoxes = document.querySelectorAll(".opt");
let labels = document.querySelectorAll(".option-name");
let resultWindow = document.querySelector(".result-window");
let mainWindow = document.querySelector(".main-container");


resultWindow.style.display = "none";
let clickAction = (id) => {
    let inp = document.querySelector(`#${id}`);
    inp.checked = true;
}

//string decode function 
function decodeHTML(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}
optionBoxes.forEach((box) => {
    let inp = box.firstElementChild;
    let label = box.children[1];
    box.addEventListener("click", () => {
        inp.checked = true;
        optionBoxes.forEach((b) => {
            b.style.backgroundColor = "white";
            b.style.color = "black";
            b.style.border = "3px solid rgb(35, 35, 107)";
        })
        box.style.backgroundColor = "green";
        box.style.color = "white";
        box.style.border = "1px solid black";
        userCorrect[qIndx] = (decodeHTML(label.innerText));
    });
})

labels.forEach((label) => {
    let box = label.parentElement;
    let inp = box.firstElementChild;
    label.addEventListener("click", () => {
        inp.checked = true;
        optionBoxes.forEach((b) => {
            b.style.backgroundColor = "white";
            b.style.color = "black";
            b.style.border = "3px solid rgb(35, 35, 107)";
        })
        box.style.backgroundColor = "green";
        box.style.color = "white";
        box.style.border = "1px solid black";
        userCorrect[qIndx] = (decodeHTML(label.innerText));
    });
})



let fetchData = async () => {
    let promise = await fetch(URL);
    let data = await promise.json();
    console.log(data);
    qArr = data.results;
    for (let i = 0; i < qArr.length; i++) {
        Actualcorrect[i] = decodeHTML(qArr[i].correct_answer);
    }
}

let next = () => {
    qIndx++;
    if (qIndx == qArr.length - 1) {
        let nextButton = document.querySelector(".n");
        qBox.innerText = `${qIndx + 1}. ${decodeHTML(qArr[qIndx].question)}`;
        nextButton.disabled = true;
        nextButton.style.opacity = "0.7";
        nextButton.style.color = "grey";
        nextButton.style.cursor = "not-allowed";

        let prevButton = document.querySelector(".p");
        prevButton.disabled = false;
        prevButton.style.opacity = "1";
        prevButton.style.color = "white";
        prevButton.style.cursor = "pointer";
        optLineup();
    }
    else if (qIndx < qArr.length - 1) {
        let nextButton = document.querySelector(".n");
        qBox.innerText = `${qIndx + 1}. ${decodeHTML(qArr[qIndx].question)}`;
        nextButton.disabled = false;
        nextButton.style.opacity = "1";
        nextButton.style.color = "white";
        nextButton.style.cursor = "pointer";

        let prevButton = document.querySelector(".p");
        prevButton.disabled = false;
        prevButton.style.opacity = "1";
        prevButton.style.color = "white";
        prevButton.style.cursor = "pointer";
        optLineup();
    }

}

let prev = () => {
    qIndx--;
    if (qIndx == 0) {
        let prevButton = document.querySelector(".p");
        qBox.innerText = `${qIndx + 1}. ${decodeHTML(qArr[qIndx].question)}`;
        prevButton.disabled = true;
        prevButton.style.opacity = "0.7";
        prevButton.style.color = "grey";
        prevButton.style.cursor = "not-allowed";
        let nextButton = document.querySelector(".n");
        nextButton.disabled = false;
        nextButton.style.opacity = "1";
        nextButton.style.color = "white";
        nextButton.style.cursor = "pointer";
        optLineup();
    } else if (qIndx < qArr.length - 1) {
        let prevButton = document.querySelector(".p");
        qBox.innerText = `${qIndx + 1}. ${decodeHTML(qArr[qIndx].question)}`;
        prevButton.disabled = false;
        prevButton.style.opacity = "1";
        prevButton.style.color = "white";
        prevButton.style.cursor = "pointer";
        let nextButton = document.querySelector(".n");
        nextButton.disabled = false;
        nextButton.style.opacity = "1";
        nextButton.style.color = "white";
        nextButton.style.cursor = "pointer";
        optLineup();

    }
}

//random options linup generator
let optLineup = () => {
    let randomIndx = Math.floor(Math.random() * 4);
    let indx = 0;
    let incorrectArr = qArr[qIndx].incorrect_answers;
    for (let i = 0; i < 4; i++) {
        if (i == randomIndx) {
            opts[i].children[1].innerText = decodeHTML(qArr[qIndx].correct_answer);
        } else {
            opts[i].children[1].innerText = decodeHTML(incorrectArr[indx++]);
        }
    }
    opts.forEach((box) => {
        box.style.backgroundColor = "white";
        box.style.color = "black";;
        box.style.border = "3px solid rgb(35, 35, 107)";
        box.style.checked = false;
    })
    if (userCorrect[qIndx]) {
        optionBoxes.forEach((b) => {
            if (b.children[1].innerText == userCorrect[qIndx]) {
                b.style.backgroundColor = "green";
                b.style.color = "white";
                b.style.border = "1px solid black";
            } else {
                b.style.backgroundColor = "white";
                b.style.color = "black";
                b.style.border = "3px solid rgb(35, 35, 107)";
            }

        })

    }
}

const startQuiz = async () => {
    await fetchData();
    console.log(qArr);

    qBox.innerText = `${(qIndx + 1)}. ${decodeHTML(qArr[qIndx].question)}`;
    let prevButton = document.querySelector(".p");
    prevButton.disabled = true;
    prevButton.style.opacity = "0.7";
    prevButton.style.color = "grey";
    prevButton.style.cursor = "not-allowed";
    //adding next button event listener
    let nextButton = document.querySelector(".n");
    nextButton.addEventListener("click", next);
    prevButton.addEventListener("click", prev);
    optLineup();


}
setTimeout(startQuiz, 1500);



//reset logic
let resets = document.querySelectorAll(".reset");
resets.forEach((reset) => {
    reset.addEventListener("click", async () => {
        qIndx = 0;
        await fetchData();
        qBox.innerText = `${(qIndx + 1)}. ${decodeHTML(qArr[qIndx].question)}`;
        opts.forEach((box) => {
            box.style.backgroundColor = "white";
            box.style.color = "black";;
            box.style.border = "3px solid rgb(35, 35, 107)";
            box.style.checked = false;
        })
        let prevButton = document.querySelector(".p");
        prevButton.disabled = true;
        prevButton.style.opacity = "0.7";
        prevButton.style.color = "grey";
        prevButton.style.cursor = "not-allowed";

        let nextButton = document.querySelector(".n");
        nextButton.disabled = false;
        nextButton.style.opacity = "1";
        nextButton.style.color = "white";
        nextButton.style.cursor = "pointer";
        resultWindow.style.display = "none";
        mainWindow.style.opacity = "1";
        mainWindow.style.pointerEvents = "auto";

    })
})


//submit logic
let submit = document.querySelector(".submit");
submit.addEventListener("click", () => {
    let correctCount = 0;
    for (let i = 0; i < 10; i++) {
        if (Actualcorrect[i] == userCorrect[i]) correctCount++;
    }
    correctCount = (correctCount / 10) * 100;
    let scr = document.querySelector(".score");
    scr.innerText = decodeHTML("&star;") + correctCount + "%";
    resultWindow.style.display = "flex";
    mainWindow.style.opacity = "0.5";
    mainWindow.style.pointerEvents = "none";
})