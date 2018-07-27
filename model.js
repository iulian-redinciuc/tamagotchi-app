let PetModel = (function() {
    let myPets = [];
    let myObservers = [];

    function notifySubscribers() {
        myObservers.forEach(function(observer) {
            if(typeof observer.notify === "function") {
                observer.notify(myPets);
            }
        })
    }

    return {
        addPet: function (pet) {
            myPets.push(pet);
            notifySubscribers();
        },
        subscribe(observer) {
            myObservers.push(observer);
        }
    }
})();