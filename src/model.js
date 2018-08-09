

function createPet(name, onUpdateCb, food = 100, water = 100, fun = 100, fatigue = 0) {
    let pet = {
        name,
        isAlive: true,
        isSleeping: false,
        food,
        water,
        fun,
        fatigue,
        level: 1,
        endGame:  () => {
            pet.isAlive = false;
            pet.petNeedsObject.clearIntervals();
            clearInterval(pet.petNeedsObject.intervalStack.sleepIntervalId);
            // console.log(`${pet.name}  is dead :(`)
        },
        petNeedsObject: {
            checkStatus:  (petNeed) => {
                if (petNeed === 0) {
                    pet.endGame();
                }
            },
            foodNeed:  () => {
                let interval = setInterval( () => {
                    pet.food -= 1;
                    pet.petNeedsObject.checkStatus(pet.food);
                    onUpdateCb();
                }, 5000)
                pet.petNeedsObject.intervalStack.stack.push(interval);
            },
            waterNeed:  () => {
                let interval = setInterval( () => {
                    pet.water -= 1;
                    pet.petNeedsObject.checkStatus(pet.water);
                    onUpdateCb();
                }, 1000)
                pet.petNeedsObject.intervalStack.stack.push(interval);
            },
            restNeed:  () => {
                let interval = setInterval( () =>{
                    if (!pet.isSleeping) {
                        pet.fatigue += 1;
                        if (pet.fatigue === 100) {
                            pet.isSleeping = true;
                            pet.petNeedsObject.clearIntervals();
                            onUpdateCb();
                        }
                    } else {
                        pet.fatigue -= 1;
                        if (pet.fatigue === 0) {
                            pet.isSleeping = false;
                            pet.petNeedsObject.foodNeed();
                            pet.petNeedsObject.waterNeed();
                            pet.petNeedsObject.funNeed();
                            pet.petNeedsObject.levelUp();
                            onUpdateCb();
                        }
                    }
                }, 2000);
                pet.petNeedsObject.intervalStack.sleepIntervalId = interval;
            },

            funNeed: () => {
                let interval = setInterval(() => {
                    pet.fun -= 1;
                    onUpdateCb();
                }, 20000)
                pet.petNeedsObject.intervalStack.stack.push(interval);
            },

            levelUp: () => {
                let interval = setInterval(() => {
                    pet.level += 1;
                    onUpdateCb();
                }, 60000)
                pet.petNeedsObject.intervalStack.stack.push(interval);
            },
            intervalStack: {
                stack: [],
                sleepIntervalId: undefined
            },
            clearIntervals: () => {
                for (let i = 0; i < pet.petNeedsObject.intervalStack.stack.length; i+=1) {
                    clearInterval(pet.petNeedsObject.intervalStack.stack[i]);
                }
                pet.petNeedsObject.intervalStack.stack.length = 0;
                // onUpdateCb();
            }
        }
    }
    
    let petActions = {
        getAttr: (attr) => pet[attr]
        ,
        feed: () => {
            pet.food += 2;
        },
        drink: () => {
            pet.water += 2;
        },
        goToSleep: () => {
            pet.isSleeping = true;
            pet.petNeedsObject.clearIntervals();
        },
        wakeUp: () => {
            pet.isSleeping = false;
            pet.petNeedsObject.foodNeed();
            pet.petNeedsObject.waterNeed();
            pet.petNeedsObject.funNeed();
            pet.petNeedsObject.levelUp();
        },
        play: () => {
            pet.fun += 2;
        },
        savePet: () => {
            let statsToLocalStorage = {
                name,
                isAlive: true,
                isSleeping: false,
                food,
                water,
                fun,
                fatigue,
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

let PetModel = (function petModel() {
    let myPets = [];
    let myObservers = [];

    function notifySubscribers() {
        myObservers.forEach( (observer) => {
            if (typeof observer.notify === "function") {
                // console.log(myPets);
                observer.notify(myPets);
            }
        })
    }

    return {
        addPet: (petName) => { 
            let pet = createPet(petName, notifySubscribers);
            myPets.push(pet);
           
            pet.name = petName;
            pet.isAlive = pet.getAttr('isAlive');
            pet.isSleeping = pet.getAttr('isSleeping');
            pet.food = pet.getAttr('food');
            pet.water = pet.getAttr('water');
            pet.fun = pet.getAttr('fun');
            pet.fatigue = pet.getAttr('fatigue');
            pet.level = pet.getAttr('level');
            localStorage.setItem(`${petName}`, JSON.stringify(pet));
            JSON.parse(localStorage.getItem(`${petName}`));
            // console.log(localStorage);
            
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