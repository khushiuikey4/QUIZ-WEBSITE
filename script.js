let optionBoxes = document.querySelectorAll(".opt");
let clickAction = (id) => {
    let inp = document.querySelector(`#${id}`);
    inp.checked = true;
}
optionBoxes.forEach((box) => {
    let inp = box.firstElementChild;
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
    });
})
//string decode function 
function decodeHTML(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

let URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
let qArr = [];
let qIndx = 0;
let opts = document.querySelectorAll(".opt");


let qBox = document.querySelector(".question-box");
let fetchData = async () => {
    let promise = await fetch(URL);
    let data = await promise.json();
    console.log(data);
    qArr = data.results;
}

let next = () => {
    qIndx++;
    if (qIndx == qArr.length - 1) {
        let nextButton = document.querySelector(".n");
        qBox.innerText = `${qIndx + 1}. ${decodeHTML(qArr[qIndx].question)}`;
        nextButton.disabled = true;
        nextButton.style.opacity = "0.6";
        nextButton.style.cursor = "not-allowed";

        let prevButton = document.querySelector(".p");
        prevButton.disabled = false;
        prevButton.style.opacity = "1";
        prevButton.style.cursor = "pointer";
    }
    else if (qIndx < qArr.length - 1) {
        let nextButton = document.querySelector(".n");
        qBox.innerText = `${qIndx + 1}. ${decodeHTML(qArr[qIndx].question)}`;
        nextButton.disabled = false;
        nextButton.style.opacity = "1";
        nextButton.style.cursor = "pointer";

        let prevButton = document.querySelector(".p");
        prevButton.disabled = false;
        prevButton.style.opacity = "1";
        prevButton.style.cursor = "pointer";

    }

}

let prev = () => {
    qIndx--;
    if (qIndx == 0) {
        let prevButton = document.querySelector(".p");
        qBox.innerText = `${qIndx + 1}. ${decodeHTML(qArr[qIndx].question)}`;
        prevButton.disabled = true;
        prevButton.style.opacity = "0.6";
        prevButton.style.cursor = "not-allowed";
        let nextButton = document.querySelector(".n");
        nextButton.disabled = false;
        nextButton.style.opacity = "1";
        nextButton.style.cursor = "pointer";
    } else if (qIndx < qArr.length - 1) {
        let prevButton = document.querySelector(".p");
        qBox.innerText = `${qIndx + 1}. ${decodeHTML(qArr[qIndx].question)}`;
        prevButton.disabled = false;
        prevButton.style.opacity = "1";
        prevButton.style.cursor = "pointer";
        let nextButton = document.querySelector(".n");
        nextButton.disabled = false;
        nextButton.style.opacity = "1";
        nextButton.style.cursor = "pointer";

    }
}

const startQuiz = async () => {
    await fetchData();
    console.log(qArr);

    qBox.innerText = `${(qIndx + 1)}. ${decodeHTML(qArr[qIndx].question)}`;
    let prevButton = document.querySelector(".p");
    prevButton.disabled = true;
    prevButton.style.opacity = "0.6";
    prevButton.style.cursor = "not-allowed";
    //adding next button event listener
    let nextButton = document.querySelector(".n");
    nextButton.addEventListener("click", next);
    prevButton.addEventListener("click", prev);
    optLineup();


}
setTimeout(startQuiz, 1500);


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

}
//reset logic
let reset = document.querySelector(".reset");
reset.addEventListener("click", async () => {
    qIndx = 0;
    await fetchData();
    qBox.innerText = `${(qIndx + 1)}. ${decodeHTML(qArr[qIndx].question)}`;
    let prevButton = document.querySelector(".p");
    prevButton.disabled = true;
    prevButton.style.opacity = "0.6";
    prevButton.style.cursor = "not-allowed";

    let nextButton = document.querySelector(".n");
    nextButton.disabled = false;
    nextButton.style.opacity = "1";
    nextButton.style.cursor = "pointer";





})