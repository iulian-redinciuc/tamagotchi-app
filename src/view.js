function createPETDIV(myModel) {
  let pets = document.getElementById('pets');

  pets.notify = function notify(petsList) {
    pets.innerHTML = null;
    petsList.forEach(pet => {
      let child = document.createElement('div');
      child.className = 'pet';

      let heading = document.createElement('h1');
      heading.innerText = pet.getAttr('name');

      let petImg = document.createElement('div');
      petImg.classList.add('pet-img');
      petImg.style.backgroundImage = 'url(./assets/doge.jpg)';

      let foodStatus = document.createElement('div');
      foodStatus.innerHTML = `<div class="status">Food </div><progress id="${pet.getAttr(
        'name'
      )}-food" value="${pet.getAttr('food')}" max="100"></progress><br>`;

      let waterStatus = document.createElement('div');
      waterStatus.innerHTML = `<div class="status">Water </div><progress id="${pet.getAttr(
        'name'
      )}-water" value="${pet.getAttr('water')}" max="100"></progress><br>`;

      let funStatus = document.createElement('div');
      funStatus.innerHTML = `<div class="status">Fun </div><progress id="${pet.getAttr(
        'name'
      )}-fun" value="${pet.getAttr('fun')}" max="100"></progress><br>`;

      let fatigueStatus = document.createElement('div');
      fatigueStatus.innerHTML = `<div class="status">Fatigue </div><progress id="${pet.getAttr(
        'name'
      )}-fatigue" value="${pet.getAttr('fatigue')}" max="100"></progress><br>`;

      let levelStatus = document.createElement('div');
      levelStatus.innerHTML = `<div class="status">Level </div><progress id="${pet.getAttr(
        'name'
      )}-level" value="${pet.getAttr('level')}" max="100"></progress>`;

      let actions = document.createElement('div');
      actions.classList.add('call-to-actions');
      actions.innerHTML = `
                <button id="${pet.getAttr('name')}-feed">Feed</button>
                <button id="${pet.getAttr(
                  'name'
                )}-give-water">Give Water</button>
                <button id="${pet.getAttr('name')}-play">Play</button>
                <button id="${pet.getAttr('name')}-sleep">Go to sleep</button>
                <button id="${pet.getAttr('name')}-wake">Wake up!</button>`;

      child.appendChild(heading);
      child.appendChild(petImg);
      child.appendChild(foodStatus);
      child.appendChild(waterStatus);
      child.appendChild(funStatus);
      child.appendChild(fatigueStatus);
      child.appendChild(levelStatus);
      child.appendChild(actions);
      pets.appendChild(child);

      let feedBtn = document.getElementById(`${pet.getAttr('name')}-feed`);

      feedBtn.addEventListener('click', () => {
        pet.feed();
        document.getElementById(`${pet.getAttr('name')}-food`).value += 5;
      });

      let waterBtn = document.getElementById(`${pet.getAttr('name')}-give-water`);

      waterBtn.addEventListener('click', () => {
        pet.drink();
        document.getElementById(`${pet.getAttr('name')}-water`).value += 5;
      });

      let playBtn = document.getElementById(`${pet.getAttr('name')}-play`);

      playBtn.addEventListener('click', () => {
        pet.play();
        document.getElementById(`${pet.getAttr('name')}-fun`).value += 5;
      });

      let sleepBtn = document.getElementById(`${pet.getAttr('name')}-sleep`);

      sleepBtn.addEventListener('click', () => {
        pet.goToSleep();
      });

      let wakeBtn = document.getElementById(`${pet.getAttr('name')}-wake`);

      wakeBtn.addEventListener('click', () => {
        pet.wakeUp();
      });

    });
  };
  myModel.subscribe(pets);
  return pets;
}
