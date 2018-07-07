function createPet(name, food = 10, water = 10, fun = 10, fatigue = 0) {
    let pet = {
        name: name,
        isAlive: true,
        food: food,
        water: water,
        fun: fun,
        fatigue: fatigue,
        isSleeping:false,
        level: 1,
        actions: {
            feed: function () {

            },
            drink: function () {

            },
            goToSleep: function () {

            },
            wakeUp: function () {

            },
            play: function () {

            },
            endGame: function () {
                pet.isAlive = false;
                clearIntervals();
            }
        }
    }

    return pet;
}
function checkStatus(petNeed) {
    // if (petNeed === 0) {
    //     pet.actions.endGame();
    // }
}


let intervalStack = [];
function clearIntervals() {
    for (let i = 0; i < intervalStack.length; i++) {
        clearInterval(i);
    }
}

function startGame(petName) {
    let petNeedsObject = {
        foodNeed: function () {
            let interval = setInterval(function () {
                petName.food -= 1;
                checkStatus(petName.food);
                console.log("food: " + petName.food);
            }, 10000)
            intervalStack.push(interval);
        },

        waterNeed: function () {
            let interval = setInterval(function () {
                petName.water -= 1;
                checkStatus(petName.water);
                console.log("water: " + petName.water);
            }, 5000)
            intervalStack.push(interval);

        },

        restNeed: function () {
            let interval = setInterval(function () {

                if (!petName.isSleeping) {
                    petName.fatigue += 1;
                    if (petName.fatigue === 10) {
                        console.log(intervalStack);
                        petName.isSleeping = true;
                        clearIntervals();
                    }
                }
                else {

                    petName.fatigue -= 1;
                    if (petName.fatigue === 0) {
                        console.log(intervalStack);

                        petName.isSleeping = false;
                        setIntervals();
                    }
                }
                console.log("fatigue: " + petName.fatigue);
                console.log("sleeping status: " + petName.isSleeping);
            }, 2000);

        },

        funNeed: function () {
            let interval = setInterval(function () {
                petName.fun -= 1;
                console.log("fun: " + petName.fun);
            }, 20000)
            intervalStack.push(interval);
        },

        levelUp: function () {
            let interval = setInterval(function () {
                petName.level += 1;
                console.log("level: " + petName.level);
            }, 60000)
            intervalStack.push(interval);
        }


    }
    function setIntervals() {
        petNeedsObject.foodNeed();
        petNeedsObject.waterNeed();
        petNeedsObject.funNeed();
        petNeedsObject.levelUp();
    }
    petNeedsObject.restNeed();
    setIntervals();
}

let Petrica = createPet("Petrica", 3);
console.log(Petrica);
startGame(Petrica);


