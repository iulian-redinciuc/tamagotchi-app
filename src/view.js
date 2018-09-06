function createPETDIV(myModel) {
  let pets = document.getElementById('pets');

  pets.notify = function notify(petsList) {
    pets.innerHTML = null;
    petsList.forEach(pet => {
      let child = document.createElement('div');
      child.className = 'pet';
      let petName = pet.getAttr('quoteData').author;

      let heading = document.createElement('h1');
      heading.innerText = pet.getAttr('quoteData').author;

      let petImg = document.createElement('div');
      petImg.classList.add('pet-img');
      petImg.style.backgroundImage = `url(${pet.getAttr('petImg')})`;

      let cat = document.createElement('p');
      cat.className = 'cat';
      cat.innerText = `thinking about ${pet.getAttr('quoteData').cat}...`;

      let quote = document.createElement('i');
      quote.className = 'quote';
      quote.innerHTML = `<p>" ${pet.getAttr('quoteData').quote} "</p>`;

      let foodStatus = document.createElement('div');
      foodStatus.innerHTML = `<div class="status">Food </div><progress id="${petName}-food" value="${pet.getAttr(
        'food'
      )}" max="100"></progress><br>`;

      let waterStatus = document.createElement('div');
      waterStatus.innerHTML = `<div class="status">Water </div><progress id="${petName}-water" value="${pet.getAttr(
        'water'
      )}" max="100"></progress><br>`;

      let funStatus = document.createElement('div');
      funStatus.innerHTML = `<div class="status">Fun </div><progress id="${petName}-fun" value="${pet.getAttr(
        'fun'
      )}" max="100"></progress><br>`;

      let fatigueStatus = document.createElement('div');
      fatigueStatus.innerHTML = `<div class="status">Fatigue </div><progress id="${petName}-fatigue" value="${pet.getAttr(
        'fatigue'
      )}" max="100"></progress><br>`;

      let levelStatus = document.createElement('div');
      levelStatus.innerHTML = `<div class="status">Level </div><progress id="${petName}-level" value="${pet.getAttr(
        'level'
      )}" max="100"></progress>`;

      let actions = document.createElement('div');
      actions.classList.add('call-to-actions');
      actions.innerHTML = `
                <button id="${petName}-feed">Feed</button>
                <button id="${petName}-give-water">Give Water</button>
                <button id="${petName}-play">Play</button>
                <button id="${petName}-sleep">Go to sleep</button>
                <button id="${petName}-wake">Wake up!</button>`;

      child.appendChild(heading);
      child.appendChild(petImg);
      child.appendChild(cat);
      child.appendChild(quote);
      child.appendChild(foodStatus);
      child.appendChild(waterStatus);
      child.appendChild(funStatus);
      child.appendChild(fatigueStatus);
      child.appendChild(levelStatus);
      child.appendChild(actions);
      pets.appendChild(child);

      let feedBtn = document.getElementById(`${petName}-feed`);

      feedBtn.addEventListener('click', () => {
        decision(
          () => {
            pet.feed();
            document.body.style.backgroundImage = `url(${bgImage})`;
            alert('Yes please!');
          },
          () => {
            alert('NO!');
            document.body.style.backgroundImage = `url(${bgImage})`;
          }
        );
        // pet.feed();
        document.getElementById(`${petName}-food`).value += 5;
      });

      let waterBtn = document.getElementById(`${petName}-give-water`);

      waterBtn.addEventListener('click', () => {
        pet.drink();
        document.getElementById(`${petName}-water`).value += 5;
      });

      let playBtn = document.getElementById(`${petName}-play`);

      playBtn.addEventListener('click', () => {
        pet.play();
        document.getElementById(`${petName}-fun`).value += 5;
      });

      let sleepBtn = document.getElementById(`${petName}-sleep`);

      sleepBtn.addEventListener('click', () => {
        pet.goToSleep();
      });

      let wakeBtn = document.getElementById(`${petName}-wake`);

      wakeBtn.addEventListener('click', () => {
        pet.wakeUp();
      });
    });
  };
  myModel.subscribe(pets);
  return pets;
}
