function createPETDIV(myModel, pet) {


        let pets = document.getElementById("pets");
        
        pets.notify = function(petsList) {
          
           
            pets.innerHTML = null;
            petsList.forEach(function(pet) {
                let child = document.createElement("div");
                child.className = "pet";

                let petName = document.createElement("h1");
                petName.innerText =  pet.getAttr('name');

                let petImg = document.createElement("div");
                petImg.classList.add("pet-img");
                petImg.style.backgroundImage = "url(./assets/doge.jpg)";
                
                let foodStatus = document.createElement("div");
                foodStatus.innerHTML = `<div class="status">Food </div><progress id="${pet}-food" value="100" max="100"></progress><br>`;
               
                let waterStatus = document.createElement("div");
                waterStatus.innerHTML = `<div class="status">Water </div><progress id="${pet}-water" value="100" max="100"></progress><br>`
               
                let funStatus = document.createElement("div");
                funStatus.innerHTML = `<div class="status">Fun </div><progress id="${pet}-fun" value="100" max="100"></progress><br>`;
               
                let fatigueStatus = document.createElement("div");
                fatigueStatus.innerHTML = `<div class="status">Fatigue </div><progress id="${pet}-fatigue" value="0" max="100"></progress><br>`;
                
                let levelStatus = document.createElement("div");
                levelStatus.innerHTML = `<div class="status">Level </div><progress id="${pet}-level" value="1" max="100"></progress>`;
                
                let actions = document.createElement("div");
                actions.classList.add("call-to-actions");
                actions.innerHTML = `
                <button id="${pet}-feed">Feed</button>
                <button id="${pet}-give-water">Give Water</button>
                <button id="${pet}-play">Play</button>
                <button id="${pet}-sleep">Go to sleep</button>
                <button id="${pet}-wake">Wake up!</button>`

                child.appendChild(petName);
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