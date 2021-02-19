var algorithms = (function() {

    let swapElement = 0;
    let checkElement = 0;

    return {
        bubbleSort: function() {
            let arrayOfNumbers = visualizer.getArrayOfNumbers();
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
        },

        insertionSort: function() {
            let arrayOfNumbers = visualizer.getArrayOfNumbers();

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
                if (j >= max) {
                    max = j;
                    checkElement = max + 2;
                }

            }

            j = 0;
            return true;
        },

        getSwapElement: function() {
            return swapElement;
        },

        getCheckElement: function() {
            return checkElement;
        },

        clearElements: function() {
            swapElement = 0;
            checkElement = 0;
        }
    };

})();