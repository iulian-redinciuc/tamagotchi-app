function Pet(name, food = 100, water = 100, fun = 100, fatigue = 0) {

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
                    document.getElementById(pet.name+"-food").value = pet.food;
                }, 10000)
                pet.petNeedsObject.intervalStack.stack.push(interval);
            },

            waterNeed: function () {
                let interval = setInterval(function () {
                    console.log(pet.name + "\'s water: " + pet.water);
                    pet.water -= 1;

                    pet.petNeedsObject.checkStatus(pet.water);
                    document.getElementById(pet.name+"-water").value = pet.water;
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
                    document.getElementById(pet.name+"-fatigue").value = pet.fatigue;
                }, 2000);
                pet.petNeedsObject.intervalStack.sleepIntervalId = interval;
            },

            funNeed: function () {
                let interval = setInterval(function () {
                    pet.fun -= 1;

                    console.log(pet.name + "\'s fun: " + pet.fun);
                    document.getElementById(pet.name+"-fun").value = pet.fun;
                }, 20000)
                pet.petNeedsObject.intervalStack.stack.push(interval);
            },

            levelUp: function () {
                let interval = setInterval(function () {
                    pet.level += 1;

                    console.log(pet.name + "\'s level: " + pet.level);
                    document.getElementById(pet.name+"-level").value = pet.level;
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
    actions.savePet();
    let pets = document.getElementById("pets");
    let child = document.createElement("div");
    child.className = "pet";
    child.innerHTML = 
    `<h1>${pet.name}</h1>
    <div class="status">Food </div><progress id="${pet.name}-food" value="100" max="100"></progress><br>
    <div class="status">Water </div><progress id="${pet.name}-water" value="100" max="100"></progress><br>
    <div class="status">Fun </div><progress id="${pet.name}-fun" value="100" max="100"></progress><br>
    <div class="status">Fatigue </div><progress id="${pet.name}-fatigue" value="0" max="100"></progress><br>
    <div class="status">Level </div><progress id="${pet.name}-level" value="1" max="100"></progress>
    <div class="call-to-actions">
        <button id="${pet.name}-feed">Feed</button>
        <button id="${pet.name}-give-water">Give Water</button>
        <button id="${pet.name}-play">Play</button>
        <button id="${pet.name}-sleep">Go to sleep</button>
        <button id="${pet.name}-wake">Wake up!</button>
    </div>`
    pets.appendChild(child);
    let feedBtn = document.getElementById(pet.name + "-feed");
    feedBtn.addEventListener("click", function(){
        actions.feed();
    });
    let waterBtn = document.getElementById(pet.name + "-give-water");
    waterBtn.addEventListener("click", function(){
        actions.drink();
    });
    let playBtn = document.getElementById(pet.name + "-play");
    playBtn.addEventListener("click", function(){
        actions.play();
    });
    let sleepBtn = document.getElementById(pet.name + "-sleep");
    sleepBtn.addEventListener("click", function(){
        actions.goToSleep();
    });
    let wakeBtn = document.getElementById(pet.name + "-wake");
    wakeBtn.addEventListener("click", function(){
        actions.wakeUp();
    });
    return actions;
}



// dom events

let submitBtn = document.getElementById("sbm-form");
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let petName = document.getElementById("pet-name").value;
    new Pet(petName);
})



