class DataService {
  static getQuote() {
    return new Promise(resolve => {
      resolve(
        HTTP.request('GET', 'https://talaikis.com/api/quotes/random/').then(
          resolveGet => resolveGet
        )
      );
    });
  }

  static getPic() {
    return new Promise(resolve => {
      resolve(
        HTTP.request('GET', 'https://dog.ceo/api/breeds/image/random').then(
          resolveGet => resolveGet
        )
      );
    });
  }

  static getAnswer() {
    return new Promise(resolve => {
      resolve(
        HTTP.request('GET', 'https://yesno.wtf/api').then(
          resolveGet => resolveGet
        )
      );
    });
  }
}
