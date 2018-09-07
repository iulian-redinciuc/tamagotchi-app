let submitBtn = document.getElementById('sbm-form');
submitBtn.addEventListener('click', e => {
  e.preventDefault();

  DataService.getPic().then(
    resolvePic => {
      DataService.getQuote().then(
        resolveQuote => {
          console.log(resolveQuote);
          createPETDIV(PetModel);
          PetModel.addPet(resolveQuote, resolvePic.message);
        },
        rejectQuote=> Error(rejectQuote)
      )
    },
    rejectPicture => Error(rejectPicture)
  )

});
