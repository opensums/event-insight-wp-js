import $ from 'jquery';

import Tabulator from 'Tabulator';

import './wp';
import { init } from './ticket-tailor-events';

init({ Tabulator });

import { promises } from './store';

// Ticket tailor events.
$('#event-insight-get-ticket-tailor-events').on('click', () => {
  $('#event-insight-ticket-tailor-events').html('');
  promises.ticketTailorEvents.getEvents();
});
