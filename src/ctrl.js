let submitBtn = document.getElementById('sbm-form');
submitBtn.addEventListener('click', e => {
  e.preventDefault();

  // DataService.getPic(resPic => {
  //   DataService.getQuote(resQuote => {
  //     createPETDIV(PetModel);
  //     PetModel.addPet(resQuote, resPic.message);
  //   }, (err)=> Error(err));
  // }, (err) => Error(err));

  DataService.getPic().then(
    resolvePic => {
      DataService.getQuote().then(
        resolveQuote => {
          createPETDIV(PetModel);
          PetModel.addPet(resolveQuote, resolvePic.message);
        },
        rejectQuote=> Error(rejectQuote)
      )
    },
    rejectPicture => Error(rejectPicture)
  )

});
