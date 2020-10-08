import $ from 'jquery';

import { promises } from './store';

const baseurl = wpApiSettings.root + 'event-insight/v1';
const nonce = wpApiSettings.nonce;

import wpApiSettings from 'wpApiSettings';

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

  $('<div></div>')
    .html(message)
    .dialog({
      title: `Error ${request.status} ${request.statusText}`,
      xresizable: false,
      modal: true,
      xbuttons: {
        OK: () => {
          $(this).dialog('close');
        },
      },
    });
}

promises.wp = {
  // Return a promise to prevent modification of the sent request.
  get(path) {
    return $.ajax({
      url: baseurl + path,
      method: 'GET',
      beforeSend: (request) => {
        request.setRequestHeader('X-WP-Nonce', nonce);
      },
    })
      .fail((request) => {
        logHttpError(request);
      })
      .promise();
  },
};
