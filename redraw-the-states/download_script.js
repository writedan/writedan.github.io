downloads = {}

function input_download(download_url) {
  downloads[download_url] = {};
}

function isTrue(val) {
  return true == val;
}

/*function forEach_download(before_send, onload, callback) {
  var finished = {};
  Object.keys(downloads).forEach(function(url) {
    finished[url] = false;
    before_send(url);
    let http = new XMLHttpRequest();
    http.open('HEAD', url);
    http.onload = function() {
      onload(this, url);
      finished[url] = true;
      if (Object.values(finished).every(isTrue)) {
        callback();
      }
    };
    http.send();
  });
}*/

function downloader(worker) {
  let finished = {};
  Object.keys(downloads).forEach(function(url) {
    finished[url] = false;

    let http = new XMLHttpRequest();
    worker.setup_http(http, url);
    http.onload = function() {
      worker.onload(this, url);

      finished[url] = true;
      if (Object.values(finished).every(isTrue)) {
        worker.callback();
      }
    };
    http.send();
  });
}

function compute_lengths(callback) {
  downloader({
    setup_http: function(http, url) {
      http.open('HEAD', url);
    },

    onload: function(http, url) {
      downloads[url]['length'] = Number(http.getResponseHeader('Content-length'));
    },

    callback: callback
  });
}

function download_all(progress, callback) {
  downloader({
    setup_http: function(http, url) {
      http.open('GET', url);
      http.responseType = "arraybuffer";
      http.onprogress = function(evt) {
        progress(evt);
      };
    },

    onload: function(http, url) {
      downloads[url]['data'] = http.response
    },

    callback: callback
  });
}
