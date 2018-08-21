class HTTP {
  static request(
    method,
    url,
    successCb,
    errorCb,
    // headers = { 'content-type': 'application/json' },
    payload = undefined
  ) {
    let xhr = new XMLHttpRequest();

    xhr.open(method, url);
    // if (headers !== null) {
    //   Object.keys(headers).forEach(key => {
    //     xhr.setRequestHeader(key, headers[key]);
    //   });
    // }

    xhr.addEventListener('load',  onLoad => {
      let resHeaders = xhr.getAllResponseHeaders();
      let inputedHeaders = resHeaders.trim().split(/[\r\n]+/);
      let headerMap = {};
      inputedHeaders.forEach((line) => {
        let parts = line.split(': ');
        let header = parts.shift();
        let value = parts.join(': ');
        headerMap[header] = value;
      });

      switch (xhr.status) {
        case 200:
          if (xhr.response !== '') {
            successCb(JSON.parse(xhr.response), headerMap);
          } else {
            successCb(null, headerMap);
          }
          break;
        default:
          if (xhr.response !== '') {
            errorCb(JSON.parse(xhr.response), xhr.status, headerMap);
          } else {
            errorCb(null, xhr.status, headerMap);
          }

          break;
      }
    });

    xhr.addEventListener('error',  onError => {
      errorCb('Network error');
    });

    if (payload !== undefined) {
      xhr.send(JSON.stringify(payload));
    } else {
      xhr.send();
    }
  }
}
