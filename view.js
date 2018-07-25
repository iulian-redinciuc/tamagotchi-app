function createPet(myModel, name, food = 100, water = 100, fun = 100, fatigue = 0) {
    
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
                        console.log(pet.name + "\'s food: " + pet.food);
                        pet.food -= 1;
    
                        pet.petNeedsObject.checkStatus(pet.food);
                    }, 10000)
                    pet.petNeedsObject.intervalStack.stack.push(interval);
                },
    
                waterNeed: function () {
                    let interval = setInterval(function () {
                        console.log(pet.name + "\'s water: " + pet.water);
                        pet.water -= 1;
    
                        pet.petNeedsObject.checkStatus(pet.water);
                    }, 5000)
                    pet.petNeedsObject.intervalStack.stack.push(interval);
    
                },
    
                restNeed: function () {
                    let interval = setInterval(function () {
    
                        if (!pet.isSleeping) {
    
                            pet.fatigue += 1;
                            if (pet.fatigue === 100) {
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
    
                        console.log(pet.name + "\'s fatigue: " + pet.fatigue);
                        console.log(pet.name + "\'s sleeping status: " + pet.isSleeping);
                    }, 2000);
                    pet.petNeedsObject.intervalStack.sleepIntervalId = interval;
                },
    
                funNeed: function () {
                    let interval = setInterval(function () {
                        pet.fun -= 1;
    
                        console.log(pet.name + "\'s fun: " + pet.fun);
                    }, 20000)
                    pet.petNeedsObject.intervalStack.stack.push(interval);
                },
    
                levelUp: function () {
                    let interval = setInterval(function () {
                        pet.level += 1;
    
                        console.log(pet.name + "\'s level: " + pet.level);
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
                localStorage.setItem(pet.name, JSON.stringify(statsToLocalStorage));
            }
    
        };
    
        pet.petNeedsObject.foodNeed();
        pet.petNeedsObject.waterNeed();
        pet.petNeedsObject.funNeed();
        pet.petNeedsObject.levelUp();
        pet.petNeedsObject.restNeed();
        // actions.savePet();
        let pets = document.createElement("div");
        
        pets.notify = function(petsList) {
            pets.innerHTML = null;
            petsList.forEach(function(animal) {
                let child = document.createElement("div");
                child.className = "pet";


                let petName = document.createElement("h1");
                petName.innerText =  animal;

                let foodStatus = document.createElement("div");
                foodStatus.innerHTML = `<div class="status">Food </div><progress id="${pet.name}-food" value="100" max="100"></progress><br>`;
                let waterStatus = document.createElement("div");
                waterStatus.innerHTML = `<div class="status">Water </div><progress id="${pet.name}-water" value="100" max="100"></progress><br>`
                let funStatus = document.createElement("div");
                funStatus.innerHTML = `<div class="status">Fun </div><progress id="${pet.name}-fun" value="100" max="100"></progress><br>`;
                let fatigueStatus = document.createElement("div");
                fatigueStatus.innerHTML = ` <div class="status">Fatigue </div><progress id="${pet.name}-fatigue" value="0" max="100"></progress><br>`;
                let levelStatus = document.createElement("div");
                levelStatus.innerHTML = `<div class="status">Level </div><progress id="${pet.name}-level" value="1" max="100"></progress>`;
                let actions = document.createElement("div")
                actions.classList.add("call-to-actions");
                actions.innerHTML = `
                <button id="${pet.name}-feed">Feed</button>
                <button id="${pet.name}-give-water">Give Water</button>
                <button id="${pet.name}-play">Play</button>
                <button id="${pet.name}-sleep">Go to sleep</button>
                <button id="${pet.name}-wake">Wake up!</button>`
                child.appendChild(foodStatus);
                child.appendChild(waterStatus);
                child.appendChild(funStatus);
                child.appendChild(fatigueStatus);
                child.appendChild(levelStatus);
                child.appendChild(actions);
                pets.appendChild(child)

            });
            
        }
        myModel.subscribe(pets);
        // let feedBtn = document.getElementById(pet.name + "-feed");
        // feedBtn.addEventListener("click", function(){
        //     actions.feed();
        // });
        // let waterBtn = document.getElementById(pet.name + "-give-water");
        // waterBtn.addEventListener("click", function(){
        //     actions.drink();
        // });
        // let playBtn = document.getElementById(pet.name + "-play");
        // playBtn.addEventListener("click", function(){
        //     actions.play();
        // });
        // let sleepBtn = document.getElementById(pet.name + "-sleep");
        // sleepBtn.addEventListener("click", function(){
        //     actions.goToSleep();
        // });
        // let wakeBtn = document.getElementById(pet.name + "-wake");
        // wakeBtn.addEventListener("click", function(){
        //     actions.wakeUp();
        // });
        return pets;
    }