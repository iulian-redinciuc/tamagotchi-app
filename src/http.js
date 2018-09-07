class HTTP {
  static request(
    method,
    url,
    // successCb,
    // errorCb,
    // headers = { 'content-type': 'application/json' },
    payload = undefined
  ) {
    return new Promise((resolve, reject) => {
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
              resolve(JSON.parse(xhr.response), headerMap)
              // successCb(JSON.parse(xhr.response), headerMap);
            } else {
              resolve(null, headerMap)
              // successCb(null, headerMap);
            }
            break;
          default:
            if (xhr.response !== '') {
              reject(JSON.parse(xhr.response), xhr.status, headerMap)
              // errorCb(JSON.parse(xhr.response), xhr.status, headerMap);
            } else {
              reject(null, xhr.status, headerMap)
              // errorCb(null, xhr.status, headerMap);
            }
  
            break;
        }
      });
  
      xhr.addEventListener('error',  onError => {
        reject(Error("Network error"))
        // errorCb('Network error');
      });
  
      if (payload !== undefined) {
        xhr.send(JSON.stringify(payload));
      } else {
        xhr.send();
      }
    })

  }
}
