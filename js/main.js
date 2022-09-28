

let timer = document.querySelector(".info .time span");
let sec = 000;
let interval;

let duration = 1000;
let blocksCon = document.querySelector(".blocks");
let blocks = Array.from(blocksCon.children);
let matched = 0;

document.querySelector(".btns span").onclick = function () {
    let userName = prompt("What is your name?");
    if (userName == null || userName == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = userName;
    }
    document.querySelector(".btns").remove();

    blocks.forEach(box => {
        box.classList.add("start-flip")
    });

    setTimeout(() =>{
        blocks.forEach(box => {
            box.classList.remove("start-flip");
            box.classList.toggle("no-event");
        });

        setTimeout(() =>{
            blocks.forEach(box => {
                box.classList.toggle("no-event");
            });
        }, 750)
        interval = setInterval(starTime, 1000);
    }, 1500)

    function starTime(){
        sec++;
        timer.innerHTML = `${sec} seconds`;
    }
};


let range = [...Array(blocks.length).keys()];

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {
      random = Math.floor(Math.random() * current);

    current--;

    temp = array[current];

    array[current] = array[random];

    array[random] = temp;

    }
    return array;
}

shuffle(range);

blocks.forEach((block, i) => {

    block.style.order = range[i];

    block.addEventListener("click", function () {
        flipBox(block);
    })

});

function flipBox(selectBox) {
    selectBox.classList.add("flip")

    let selectedBoxs = blocks.filter(selected => selected.classList.contains("flip"));


    if (selectedBoxs.length == 2) {
        stopClick();

        match(selectedBoxs[0], selectedBoxs[1]);
    }
}

function stopClick(){
    blocksCon.classList.add("no-clicking");

    setTimeout(() => {
        blocksCon.classList.remove("no-clicking");
    }, duration)
}

let correct = document.getElementById("correct");
let wrong = document.getElementById("wrong");
let win = document.getElementById("win");

function match(first, second) {
    
    let mistakes = document.querySelector(".tries span");

    if(first.dataset.logo === second.dataset.logo){
        first.classList.remove("flip");
        second.classList.remove("flip");

        first.classList.add("match");
        second.classList.add("match");

        matched = matched + 2;

        if (matched ==  20){
            clearInterval(interval);
            win.play();
            let end = document.createElement("div");
            let container = document.createElement("div");
            let congrats = document.createElement("span");
            let time = document.createElement("span");
            let wrongA = document.createElement("span");
            let restart = document.createElement("span");
            end.classList.add("btns");
            container.classList.add("end-con");
            congrats.classList.add("congrats");
            time.classList.add("content");
            wrongA.classList.add("content");
            restart.classList.add("restart");
            congrats.innerHTML = "Congratulations";
            time.innerHTML = `Time: ${sec} Second`;
            wrongA.innerHTML = `Wrong Tries: ${mistakes.innerHTML}`;
            restart.innerHTML = `Play Again`;
            document.body.appendChild(end);
            end.appendChild(container);
            container.appendChild(congrats);
            container.appendChild(time);
            container.appendChild(wrongA);
            container.appendChild(restart);

            restart.addEventListener("click",function (){
                location.reload();
            });
        }

        correct.play();
    } else {
        mistakes.innerHTML = parseInt(mistakes.innerHTML) + 1;
        wrong.play();
        setTimeout(function (){
            first.classList.remove("flip");
            second.classList.remove("flip");
        }, duration)

    }
}









