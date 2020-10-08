let settings;

const state = {
  requestCount: 0,
  responseCount: 0,
  errorCount: 0,
};

// Return a promise to prevent modification of the sent request.
function get(path) {
  const { m, nonce, baseurl } = settings;
  state.requestCount += 1;
  return m
    .request({
      url: baseurl + path,
      method: 'GET',
      headers: {
        'X-WP-Nonce': nonce,
      },
    })
    .catch((error) => {
      state.errorCount += 1;
      throw error;
    })
    .then(() => {
      state.responseCount += 1;
    });
}

function init(store, { jquery, m, wpApiSettings }) {
  store.wp = this;
  store.state.wp = state;
  settings = {
    m,
    jquery,
    baseurl: wpApiSettings.root + 'event-insight/v1',
    nonce: wpApiSettings.nonce,
  };
}

export const wp = { init, get };
