let arraySize = 100;
let speedOfSorting = 60;

let arrayOfNumbers;

let swapElement;
let checkElement;

let sortInterval = null;
let isPaused = false;

let sizeSlider = document.getElementById("size-slider");

sizeSlider.onchange = function() {
    arraySize = parseInt(this.value, 10);
    arrayOfNumbers = createRandomArray(0, 100, arraySize);
    updateContainer();
}

window.onload = function() {
    arrayOfNumbers = createRandomArray(0, 100, arraySize);
    updateContainer();
};

function createView() {
    arraySize = document.getElementById("size-slider").value;
    swapElement = 0;
    checkElement = 0;
    clearInterval(sortInterval);
    arrayOfNumbers = createRandomArray(0, 100, arraySize);
    updateContainer();
}

function updateContainer(indexOfSwapElement, indexOfCheckElement) {
    let barsContainer = document.getElementById("bars-container");
    barsContainer.innerHTML = "";

    for (let i = 0; i < arrayOfNumbers.length; i++) {
        numberBar = document.createElement("div");
        numberBar.className = "number-bar";
        numberBar.style.height = arrayOfNumbers[i] / 1.2 + "%";
        numberBar.style.width = 80 / arrayOfNumbers.length + "vw";
        if (indexOfSwapElement === i) {
            numberBar.style.backgroundColor = "#00CC00";
        }
        if (indexOfCheckElement === i) {
            numberBar.style.backgroundColor = "yellow";
        }
        barsContainer.appendChild(numberBar);
    }
}

function checkIsSorted() {
    let barsContainer = document.getElementById("bars-container");
    barsContainer.innerHTML = "";

    for (let i = 0; i < arrayOfNumbers.length - 1; i++) {
        numberBar = document.createElement("div");
        numberBar.className = "number-bar";
        numberBar.style.height = arrayOfNumbers[i] / 1.2 + "%";
        numberBar.style.width = 80 / arrayOfNumbers.length + "vw";
        if (arrayOfNumbers[i] <= arrayOfNumbers[i + 1]) {
            numberBar.style.backgroundColor = "#00CC00";
        } else {
            numberBar.style.backgroundColor = "red";
        }

        barsContainer.appendChild(numberBar);
    }
}

function visualizeSort(sortFunction) {
    clearInterval(sortInterval);

    sortInterval = setInterval(function() {
        if (!isPaused) {
            let finishedSorting = sortFunction();
            updateContainer(swapElement, checkElement);
            if (finishedSorting) {
                clearInterval(sortInterval);
                checkIsSorted();
            }
        }

    }, Math.round(1000 / speedOfSorting));
}



function bubbleSort() {
    for (i = 0; i < arrayOfNumbers.length; i++) {
        for (j = swapElement; j < arrayOfNumbers.length - 1; j++) {
            swapElement = j;
            checkElement = j + 1;
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

function insertionSort() {

    for (let i = 0; i < arrayOfNumbers.length; i++) {

        let current = arrayOfNumbers[i];
        j = i - 1;

        while ((j > -1) && (current < arrayOfNumbers[j])) {
            let temp = arrayOfNumbers[j];
            arrayOfNumbers[j] = arrayOfNumbers[j + 1];
            arrayOfNumbers[j + 1] = temp;
            swapElement = j;
            j--;
            return false;
        }

        arrayOfNumbers[j + 1] = current;
        let max = checkElement;
        if (j > max) {
            max = j;
            checkElement = max + 2;
        }

    }

    j = 0;
    return true;
}

function pauseSorting() {
    let pauseButton = document.getElementById("pause-button");
    if (isPaused) {
        isPaused = false;
        pauseButton.innerText = "Pause";
    } else {
        isPaused = true;
        pauseButton.innerText = "Play";
    }
}

function createRandomArray(min, max, size) {
    let arrayOfNumbers = [];
    for (let i = 0; i < size; i++) {
        arrayOfNumbers.push(getRandomIntInRange(min, max));
    }
    return arrayOfNumbers;
}

function getRandomIntInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function myFunction() {
    var x = document.getElementById("buttons-container");
    if (x.className === "buttons-container-active") {
        x.className = "buttons-container";
    } else {
        x.className = "buttons-container-active";
    }
}