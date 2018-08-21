class DataService {
    static getQuote(successCb, errorCb) {
        HTTP.request("GET", "https://talaikis.com/api/quotes/random/", successCb, errorCb);
    }

    static getPic(successCb, errorCb) {
        HTTP.request("GET", "https://dog.ceo/api/breeds/image/random", successCb, errorCb);
    }
}