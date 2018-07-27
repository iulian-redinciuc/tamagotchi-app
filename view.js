function createPETDIV(myModel, petName) {
<<<<<<< HEAD

=======
>>>>>>> d0b8ad7b868946175485345fc1f54e2842b1bd74

        let pets = document.getElementById("pets");
        
        pets.notify = function(petsList) {
            pets.innerHTML = null;
            petsList.forEach(function(pet) {
                let child = document.createElement("div");
                child.className = "pet";

<<<<<<< HEAD
                let heading = document.createElement("h1");
                heading.innerText =  petName;
=======
                let petName = document.createElement("h1");
                petName.innerText =  petName;
>>>>>>> d0b8ad7b868946175485345fc1f54e2842b1bd74

                let petImg = document.createElement("div");
                petImg.classList.add("pet-img");
                petImg.style.backgroundImage = "url(./assets/doge.jpg)";
                
                let foodStatus = document.createElement("div");
                foodStatus.innerHTML = `<div class="status">Food </div><progress id="${petName}-food" value="100" max="100"></progress><br>`;
               
                let waterStatus = document.createElement("div");
                waterStatus.innerHTML = `<div class="status">Water </div><progress id="${petName}-water" value="100" max="100"></progress><br>`
               
                let funStatus = document.createElement("div");
                funStatus.innerHTML = `<div class="status">Fun </div><progress id="${petName}-fun" value="100" max="100"></progress><br>`;
               
                let fatigueStatus = document.createElement("div");
                fatigueStatus.innerHTML = `<div class="status">Fatigue </div><progress id="${petName}-fatigue" value="0" max="100"></progress><br>`;
                
                let levelStatus = document.createElement("div");
                levelStatus.innerHTML = `<div class="status">Level </div><progress id="${petName}-level" value="1" max="100"></progress>`;
                
                let actions = document.createElement("div");
                actions.classList.add("call-to-actions");
                actions.innerHTML = `
                <button id="${petName}-feed">Feed</button>
                <button id="${petName}-give-water">Give Water</button>
                <button id="${petName}-play">Play</button>
                <button id="${petName}-sleep">Go to sleep</button>
                <button id="${petName}-wake">Wake up!</button>`

                child.appendChild(heading);
                child.appendChild(petImg);
                child.appendChild(foodStatus);
                child.appendChild(waterStatus);
                child.appendChild(funStatus);
                child.appendChild(fatigueStatus);
                child.appendChild(levelStatus);
                child.appendChild(actions);
                pets.appendChild(child)

                let feedBtn = document.getElementById(pet + "-feed");
                feedBtn.addEventListener("click", function(){
                    petActions.feed();
                    document.getElementById(pet +"-food").value += 5;
                });
                let waterBtn = document.getElementById(pet + "-give-water");
                waterBtn.addEventListener("click", function(){
                    petActions.drink();
                    document.getElementById(pet + "-water").value += 5;
                });
                let playBtn = document.getElementById(pet + "-play");
                playBtn.addEventListener("click", function(){
                    petActions.play();
                    document.getElementById(pet + "-fun").value += 5;
                });
                let sleepBtn = document.getElementById(pet + "-sleep");
                sleepBtn.addEventListener("click", function(){
                    petActions.goToSleep();
                });
                let wakeBtn = document.getElementById(pet + "-wake");
                wakeBtn.addEventListener("click", function(){
                    petActions.wakeUp();
                });

            });
            
        }
        myModel.subscribe(pets);
        return pets;
    }