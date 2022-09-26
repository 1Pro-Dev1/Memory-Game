document.querySelector(".btns span").onclick = function () {
    let userName = prompt("What is your name? >:D");
    
    if (userName == "mohamed" || userName == "Mohamed" || userName == "mayar" || userName == "Mayar") {
        console.log(`Hello ${userName} you are the best :D`)
    }

    if (userName == null || userName == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = userName;
    }

    document.querySelector(".btns").remove();
};


let duration = 1000;

let blocksCon = document.querySelector(".blocks");

let blocks = Array.from(blocksCon.children);

let range = [...Array(blocks.length).keys()];

console.log(range)

function shuffle(array) {

    // Settings Vars
    let current = array.length,
        temp,
        random;
    while (current > 0) {
      // Get Random Number
      random = Math.floor(Math.random() * current);

    current--;

    temp = array[current];

    array[current] = array[random];

    array[random] = temp;

    }
    return array;
}

shuffle(range);


console.log(range)


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

function match(first, second) {
    
    let mistakes = document.querySelector(".tries span");

    if(first.dataset.logo === second.dataset.logo){
        first.classList.remove("flip");
        second.classList.remove("flip");

        first.classList.add("match");
        second.classList.add("match");

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


