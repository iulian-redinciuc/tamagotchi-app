let submitBtn = document.getElementById("sbm-form");



submitBtn.addEventListener("click", function (e) {

    e.preventDefault();
    let petNameInput = document.getElementById("pet-name");
    let petName = petNameInput.value;
    let view = new createPet(PetModel, petName);
    PetModel.addPet(petName);
    petNameInput.value = "";
})
