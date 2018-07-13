function createPet(name, food = 10, water = 2, fun = 10, fatigue = 0) {
    let pet = {
        name: name,
        isAlive: true,
        isSleeping: false,
        food: food,
        water: water,
        fun: fun,
        fatigue: fatigue,
        level: 1,
        endGame: function () {
            
            pet.isAlive = false;
            pet.petNeedsObject.clearIntervals();
            clearInterval(pet.petNeedsObject.intervalStack.sleepIntervalId);
            console.log("Your pet is dead :(")
        },
        petNeedsObject: {
            checkStatus: function (petNeed) {
                if (petNeed === 0) {
                    pet.endGame();
                }
            },
            foodNeed: function () {
                let interval = setInterval(function () {
                    console.log("food: " + pet.food);
                    pet.food -= 1;
                    pet.petNeedsObject.checkStatus(pet.food);
                }, 10000)
                pet.petNeedsObject.intervalStack.stack.push(interval);
            },

            waterNeed: function () {
                let interval = setInterval(function () {
                    console.log("water: " + pet.water);
                    pet.water -= 1;
                    pet.petNeedsObject.checkStatus(pet.water);                   
                }, 5000)
                pet.petNeedsObject.intervalStack.stack.push(interval);

            },

            restNeed: function () {
                let interval = setInterval(function () {

                    if (!pet.isSleeping) {

                        pet.fatigue += 1;
                        if (pet.fatigue === 10) {
                            console.log(pet.petNeedsObject.intervalStack.stack);
                            pet.isSleeping = true;
                            pet.petNeedsObject.clearIntervals();

                        }

                    } else {

                        pet.fatigue -= 1;
                        if (pet.fatigue === 0) {
                            console.log(pet.petNeedsObject.intervalStack.stack);

                            pet.isSleeping = false;
                            pet.petNeedsObject.foodNeed();
                            pet.petNeedsObject.waterNeed();
                            pet.petNeedsObject.funNeed();
                            pet.petNeedsObject.levelUp();
                        }
                    }
                    console.log("fatigue: " + pet.fatigue);
                    console.log("sleeping status: " + pet.isSleeping);
                }, 2000);
                pet.petNeedsObject.intervalStack.sleepIntervalId = interval;
            },

            funNeed: function () {
                let interval = setInterval(function () {
                    pet.fun -= 1;
                    console.log("fun: " + pet.fun);
                }, 20000)
                pet.petNeedsObject.intervalStack.stack.push(interval);
            },

            levelUp: function () {
                let interval = setInterval(function () {
                    pet.level += 1;
                    console.log("level: " + pet.level);
                }, 60000)
                pet.petNeedsObject.intervalStack.stack.push(interval);
            },

            intervalStack: {
                stack: [],
                sleepIntervalId: undefined
            },
            clearIntervals: function () {
                for (let i = 0; i < pet.petNeedsObject.intervalStack.stack.length; i++) {
                    clearInterval(pet.petNeedsObject.intervalStack.stack[i]);
                }
                pet.petNeedsObject.intervalStack.stack.length = 0;
            }



        }
    }

    let actions = {
        feed: function () {
            pet.food += 5;
        },
        drink: function () {
            pet.water += 5;
        },
        goToSleep: function () {
            pet.isSleeping = true;
            pet.petNeedsObject.clearIntervals();
        },
        wakeUp: function () {
            pet.isSleeping = false;
        },
        play: function () {
            pet.fun += 5;
        },


    };
    pet.petNeedsObject.foodNeed();
    pet.petNeedsObject.waterNeed();
    pet.petNeedsObject.funNeed();
    pet.petNeedsObject.levelUp();
    pet.petNeedsObject.restNeed();
    return actions;
}




// function startGame(petName) {

//     function setIntervals() {
//         petName.actions.petNeedsObject.foodNeed();
//         petName.actions.petNeedsObject.waterNeed();
//         petName.actions.petNeedsObject.funNeed();
//         petName.actions.petNeedsObject.levelUp();
//         petName.actions.petNeedsObject.restNeed();
//     }
//     console.log(petName);
//     setIntervals();
// }

let Petrica = createPet("Petrica", 3);

// startGame(Petrica);