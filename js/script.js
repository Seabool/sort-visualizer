let arrayOfNumbers = createRandomArray(0, 100, 50);
let swapElement;
let FRAMES_PER_SECOND = 60;
let sortInterval = null;

function createView() {
    swapElement = 0;
    arrayOfNumbers = createRandomArray(0, 100, 50);
    updateContainer();
}

function updateContainer(id) {
    let barsContainer = document.getElementById("bars-container");
    barsContainer.innerHTML = "";

    for (let i = 0; i < arrayOfNumbers.length; i++) {
        numberBar = document.createElement("div");
        numberBar.className = "number-bar";
        numberBar.style.height = arrayOfNumbers[i] / 1.2 + "%";

        if (id === i) {
            numberBar.style.backgroundColor = "green";
        }
        if (id + 1 === i) {
            numberBar.style.backgroundColor = "yellow";
        }
        barsContainer.appendChild(numberBar);
    }
}

function bubbleSort() {
    clearInterval(sortInterval);

    sortInterval = setInterval(function() {
        let finishedSorting = sortUntilNextSwap();
        updateContainer(swapElement);

        if (finishedSorting) clearInterval(sortInterval);
    }, Math.round(1000 / FRAMES_PER_SECOND));
}

function sortUntilNextSwap() {
    for (i = 0; i < arrayOfNumbers.length; i++) {
        for (j = swapElement; j < arrayOfNumbers.length - 1; j++) {
            swapElement = j;
            if (arrayOfNumbers[j] > arrayOfNumbers[j + 1]) {
                let temp = arrayOfNumbers[j];
                arrayOfNumbers[j] = arrayOfNumbers[j + 1];
                arrayOfNumbers[j + 1] = temp;
                return false;
            }
        }
        swapElement = 0;
    }

    return true;
}

function createRandomArray(min, max, size) {
    let arrayOfNumbers = [];
    for (let i = 0; i < size; i++) {
        let rand = getRandomIntInRange(min, max)
        arrayOfNumbers.push(rand);
    }
    return arrayOfNumbers;
}

function getRandomIntInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}