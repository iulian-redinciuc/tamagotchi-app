let submitBtn = document.getElementById("sbm-form");



submitBtn.addEventListener("click", function (e) {

    e.preventDefault();
    let petName = document.getElementById("pet-name").value;
    let view = createPet(PetModel, petName);
    PetModel.addPet(petName);
    document.getElementById("pets2").appendChild(view);

    
   
    
})
