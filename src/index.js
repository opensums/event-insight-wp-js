// const m = require('mithril');
import m from 'mithril';

import jquery from 'jquery';
import wpApiSettings from 'wpApiSettings';

import Tabulator from 'Tabulator';

import { store } from './store';

import { wp } from './wp';
import { ticketTailorEvents } from './ticket-tailor-events';

wp.init(store, { jquery, m, wpApiSettings });
ticketTailorEvents.init(store, { jquery, Tabulator });

// Ticket tailor events.
jquery('#event-insight-get-ticket-tailor-events').on('click', () => {
  jquery('#event-insight-ticket-tailor-events').html('Loading');
  store.ticketTailorEvents.getEvents();
});

// Gives the jquery version: console.log(jquery.fn.jquery);

function count() {
  wp.get().catch((error) => console.log(error.response));
}

const app = {
  view() {
    return m('div', [
      m('div', { action: '#' }, [
        m('input', { name: 'date', value: '2000-01-01' }),
        m('button', { onclick: count }, 'Load events'),
      ]),
      m('p', [
        'Requests sent: ',
        store.state.wp.requestCount,
        ' responses: ',
        store.state.wp.responseCount,
        ' errors: ',
        store.state.wp.errorCount,
        '.',
      ]),
    ]);
  },
};

m.mount(document.querySelector('#event-insight-app'), app);
