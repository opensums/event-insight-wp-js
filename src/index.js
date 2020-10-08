import jquery from 'jquery';
import wpApiSettings from 'wpApiSettings';

import Tabulator from 'Tabulator';

import { store } from './store';

import { wp } from './wp';
import { ticketTailorEvents } from './ticket-tailor-events';

wp.init(store, { jquery, wpApiSettings });
ticketTailorEvents.init(store, { jquery, Tabulator });

// Ticket tailor events.
jquery('#event-insight-get-ticket-tailor-events').on('click', () => {
  jquery('#event-insight-ticket-tailor-events').html('Loading');
  store.ticketTailorEvents.getEvents();
});
