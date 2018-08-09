let submitBtn = document.getElementById('sbm-form');
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let petNameInput = document.getElementById('pet-name');
  let petName = petNameInput.value;

  createPETDIV(PetModel);
  PetModel.addPet(petName);
  petNameInput.value = '';
});
