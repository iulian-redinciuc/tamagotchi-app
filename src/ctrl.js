let submitBtn = document.getElementById('sbm-form');
submitBtn.addEventListener('click', e => {
  e.preventDefault();

  DataService.getPic(resPic => {
    DataService.getQuote(resQuote => {
      createPETDIV(PetModel);
      PetModel.addPet(resQuote, resPic.message);
    }, (err)=> Error(err));
  }, (err) => Error(err));
});
