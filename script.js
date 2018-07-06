function startGame() {
    let pet = {
        isAlive: true,
        isSleeping: false,
        isHungry: false,
        isThirsty: false,
        isSad: false,
        food: 10,
        water: 10,
        fun: 10,
        fatigue: 0,
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

    function checkStatus(petNeed) {
        if (petNeed === 0) {
            pet.actions.endGame();
        }
    }

    let intervalStack = [];
    function clearIntervals() {
        for(let i = 0; i < intervalStack.length; i++) {
            clearInterval(i);
        }
    }
    function setIntervals() {
        petNeedsObject.foodNeed();
        petNeedsObject.waterNeed();
        petNeedsObject.funNeed();
        petNeedsObject.levelUp();
    }
    
    let petNeedsObject = {
        foodNeed: function () {
        let interval = setInterval(function () {
                pet.food -= 1;
                checkStatus(pet.food);
                console.log("food: " + pet.food);
            }, 10000)
            intervalStack.push(interval);
        },

        waterNeed: function () {
            let interval =  setInterval(function () {
                pet.water -= 1;
                checkStatus(pet.water);
                console.log("water: " + pet.water);
            }, 5000)
            intervalStack.push(interval);

        },

        restNeed: function () {
            let interval =  setInterval(function () {

                if (!pet.isSleeping) {
                    pet.fatigue += 1;
                    if (pet.fatigue === 10) {
                        console.log(intervalStack);
                        pet.isSleeping = true;
                        clearIntervals();
                    }
                }
                else {

                    pet.fatigue -= 1;
                    if (pet.fatigue === 0) {
                        console.log(intervalStack);
                        
                        pet.isSleeping = false;
                        setIntervals();
                    }
                }
                console.log("fatigue: " + pet.fatigue);
                console.log("sleeping status: " + pet.isSleeping);
            }, 2000);
        
        },

        funNeed: function () {
            let interval = setInterval(function () {
                pet.fun -= 1;
                console.log("fun: " + pet.fun);
            }, 20000)
            intervalStack.push(interval);
        },

        levelUp: function () {
            let interval = setInterval(function () {
                pet.level += 1;
                console.log("level: " + pet.level);
            }, 60000)
            intervalStack.push(interval);
        }


    }

   
    setIntervals();
    petNeedsObject.restNeed();






}

startGame();