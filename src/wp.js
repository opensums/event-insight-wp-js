let settings;

const state = {};

function logHttpError(request) {
  // request.responseJSON
  // request.responseText
  // request.status e.g. 403
  // request.statusText e.g. 'Forbidden'
  let message;
  if (request.responseJSON) {
    message = request.responseJSON.error;
  } else if (request.responseText) {
    message = request.responseText;
  }

  settings
    .jquery('<div></div>')
    .html(message)
    .dialog({
      title: `Error ${request.status} ${request.statusText}`,
      xresizable: false,
      modal: true,
      xbuttons: {
        OK: () => {
          settings.jquery(this).dialog('close');
        },
      },
    });
}

function promisify(jqr) {
  const promise = jqr.promise();
  promise.catch = function (cb) {
    this.then(undefined, cb);
    return this;
  };
  return promise;
}

// Return a promise to prevent modification of the sent request.
function get(path) {
  return promisify(
    settings.jquery.ajax({
      url: settings.baseurl + path,
      method: 'GET',
      beforeSend: (request) => {
        request.setRequestHeader('X-WP-Nonce', settings.nonce);
      },
    })
  ).catch((request) => {
    logHttpError(request);
  });
}

function init(store, { jquery, wpApiSettings }) {
  store.wp = this;
  store.state.wp = state;
  settings = {
    jquery,
    baseurl: wpApiSettings.root + 'event-insight/v1',
    nonce: wpApiSettings.nonce,
  };
}

export const wp = { init, get };
