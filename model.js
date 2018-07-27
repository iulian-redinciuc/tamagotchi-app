let PetModel = (function () {
    let myPets = [];
    let myObservers = [];

    function notifySubscribers() {
        myObservers.forEach(function (observer) {
            if (typeof observer.notify === "function") {
                console.log(myPets);
                observer.notify(myPets);
            }
        })
    }

    return {
        addPet: function (petName) { 
            let pet = createPet(petName);
            myPets.push(pet);
            notifySubscribers();
        },
        // removePet: function(pet){

        // },
        subscribe(observer) {
            myObservers.push(observer);
            notifySubscribers();
        }
    }
})();

function createPet(name, food = 100, water = 100, fun = 100, fatigue = 0) {
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
            console.log(pet.name + " is dead :(")
        },
        petNeedsObject: {
            checkStatus: function (petNeed) {
                if (petNeed === 0) {
                    pet.endGame();
                }
            },
            foodNeed: function () {
                let interval = setInterval(function () {
                    pet.food -= 1;
                    pet.petNeedsObject.checkStatus(pet.food);
                }, 5000)
                pet.petNeedsObject.intervalStack.stack.push(interval);
            },
            waterNeed: function () {
                let interval = setInterval(function () {
                    pet.water -= 1;
                    pet.petNeedsObject.checkStatus(pet.water);
                }, 1000)
                pet.petNeedsObject.intervalStack.stack.push(interval);
            },
            restNeed: function () {
                let interval = setInterval(function () {
                    if (!pet.isSleeping) {
                        pet.fatigue += 1;
                        if (pet.fatigue === 100) {
                            pet.isSleeping = true;
                            pet.petNeedsObject.clearIntervals();
                        }
                    } else {
                        pet.fatigue -= 1;
                        if (pet.fatigue === 0) {
                            pet.isSleeping = false;
                            pet.petNeedsObject.foodNeed();
                            pet.petNeedsObject.waterNeed();
                            pet.petNeedsObject.funNeed();
                            pet.petNeedsObject.levelUp();
                        }
                    }
                }, 2000);
                pet.petNeedsObject.intervalStack.sleepIntervalId = interval;
            },

            funNeed: function () {
                let interval = setInterval(function () {
                    pet.fun -= 1;
                }, 20000)
                pet.petNeedsObject.intervalStack.stack.push(interval);
            },

            levelUp: function () {
                let interval = setInterval(function () {
                    pet.level += 1;
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
    
    petActions = {
        getAttr: function(attr){
            return pet[attr];
        },
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
            pet.petNeedsObject.foodNeed();
            pet.petNeedsObject.waterNeed();
            pet.petNeedsObject.funNeed();
            pet.petNeedsObject.levelUp();
        },
        play: function () {
            pet.fun += 5;
        },
        savePet: function () {
            let statsToLocalStorage = {
                name: name,
                isAlive: true,
                isSleeping: false,
                food: food,
                water: water,
                fun: fun,
                fatigue: fatigue,
                level: 1,
            }
            localStorage.setItem(name, JSON.stringify(statsToLocalStorage));
        }

    };

    pet.petNeedsObject.foodNeed();
    pet.petNeedsObject.waterNeed();
    pet.petNeedsObject.funNeed();
    pet.petNeedsObject.levelUp();
    pet.petNeedsObject.restNeed();

    return petActions;
}