window.onload = function() {
    visualizer.updateContainer();
};

var visualizer = (function() {

    let arrayOfNumbers = createRandomArray(0, 100, 100);
    let sortInterval = null;

    let pauseButton = document.getElementById("pause-button");
    let speedSlider = document.getElementById("speed-slider");
    let sizeSlider = document.getElementById("size-slider");

    sizeSlider.onchange = function() {
        let size = parseInt(this.value, 10);
        arrayOfNumbers = createRandomArray(0, 100, size);
        visualizer.updateContainer();
    }

    return {
        createView: function() {
            clearInterval(sortInterval);
            algorithms.clearElements();
            arrayOfNumbers = createRandomArray(0, 100, sizeSlider.value);
            visualizer.updateContainer();
        },

        updateContainer: function(indexOfSwapElement, indexOfCheckElement) {
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
        },

        checkIsSorted: function() {
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

        },

        visualizeSort: function(sortFunction) {
            clearInterval(sortInterval);

            sortInterval = setInterval(function() {
                if (pauseButton.innerText === "Pause") {
                    let finishedSorting = sortFunction();
                    visualizer.updateContainer(algorithms.getSwapElement(), algorithms.getCheckElement());
                    if (finishedSorting) {
                        clearInterval(sortInterval);
                        visualizer.checkIsSorted();
                    }
                }

            }, Math.round(1000 / speedSlider.value));
        },
        pauseSorting: function() {
            if (pauseButton.innerText === "Play") {
                pauseButton.innerText = "Pause";
            } else {
                pauseButton.innerText = "Play";
            }
        },

        getArrayOfNumbers: function() {
            return arrayOfNumbers;
        }
    };
})();

function createRandomArray(min, max, size) {
    let arrayOfNumbers = [];
    for (let i = 0; i < size; i++) {
        arrayOfNumbers.push(getRandomIntInRange(min, max));
    }
    return arrayOfNumbers;
}

function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}