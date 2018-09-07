class DataService {
  static getQuote() {
    return HTTP.request('GET', 'https://talaikis.com/api/quotes/random/');
  }

  static getPic() {
    return HTTP.request('GET', 'https://dog.ceo/api/breeds/image/random');
  }

  static getAnswer() {
    return HTTP.request('GET', 'https://yesno.wtf/api');
  }
}
