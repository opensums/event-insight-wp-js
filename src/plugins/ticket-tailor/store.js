//

// All data are stored in the cache.
const cache = {
  events: [],
  tickets: [],
};

function findEventIndex(eventId) {
  return cache.events.findIndex(event => event.id === eventId);
}

/*
function dateFormat(timestamp) {
  const iso = new Date(timestamp).toISOString();
  return iso.substr(0, 10) + ' ' + iso.substr(11, 8);
}
*/

// The state is exported.
const state = {
  link: 'https://www.tickettailor.com/?fp_ref=opensums',
  loaded: {
    events: null,
    tickets: null,
  },
};

/*
response.data = {
  data
  links: { next: null, previous: null },
  meta: {
    rate: {
      limit: '5000',
      remaining: '4999',
      reset: '1800',
  },
};
*/

async function request(dispatch, options) {
  // eslint-disable-next-line no-useless-catch
  try {
    return await dispatch('wp/request', options, { root: true });
  } catch (err) {
    // Need to do something here to identify ticket tailor errors.
    throw err;
  }
}

// --- ACTIONS -----------------------------------------------------------------

async function loadEvents({ dispatch, commit }) {
  const response = await request(dispatch, { path: '/ticket-tailor/events' });
  // TODO handle links for multi-page responses (100 item page limit).
  const { data } = response.data;
  cache.events = data;
  commit('setLoaded', 'events');
  return data;
}

async function loadTicketsForEvent({ dispatch, commit }, { eventId, fetch }) {
  if (cache.tickets[eventId]) {
    return cache.tickets[eventId];
  }

  if (!fetch) return [];

  const response = await request(dispatch, {
    path: `/ticket-tailor/event/${eventId}/tickets`,
  });
  // TODO handle links for multi-page responses (100 item page limit).
  const { data } = response.data;
  cache.tickets[eventId] = data;
  commit('setLoaded', 'tickets');
  return data;
}

export const actions = { loadEvents, loadTicketsForEvent };

// --- GETTERS -----------------------------------------------------------------

export const getters = {
  getEvent(state) {
    return eventId => {
      if (state.loaded.events) {
        return cache.events[findEventIndex(eventId)];
      }
      return {};
    };
  },

  getTicketsForEvent(state) {
    return eventId => {
      if (state.loaded.tickets) {
        return cache.tickets[eventId] || [];
      }
      return [];
    };
  },

  events(state) {
    if (state.loaded.events) {
      return cache.events;
    }
    return [];
  },
};

// --- MUTATIONS ---------------------------------------------------------------

/**
 * Set the 'loaded' timestamp so observers can refresh.
 */
function setLoaded(state, key) {
  state.loaded[key] = Date.now();
}

export const mutations = { setLoaded };

export default { namespaced: true, actions, getters, mutations, state };

/*
// Ticket tailor event tickets.
function loadTicketsForTicketTailorEvent(eventId) {
  promises.wp
    .get('/ticket-tailor/event/' + eventId + '/tickets')
    .fail()
    .done((data) => {
      const customQuestions = [];
      const customQuestionsMap = {};
      new Tabulator('#event-insight-ticket-tailor-tickets', {
        layout: 'fitDataFill',
        columns: [
          {
            title: 'Issued',
            field: 'issued',
            sorter: 'string',
            hozAlign: 'center',
          },
          { title: 'Type', field: 'type', sorter: 'string' },
          { title: 'Email', field: 'email', sorter: 'string' },
          { title: 'First name', field: 'firstName', sorter: 'string' },
          { title: 'Last name', field: 'lastName', sorter: 'string' },
          {
            title: 'Id',
            field: 'id',
            sorter: 'string',
            hozAlign: 'center',
            headerTooltip: 'This is what we want to be displayed as the header',
          },
          {
            title: 'Valid',
            field: 'isValid',
            sorter: 'boolean',
            formatter: 'tickCross',
            hozAlign: 'center',
          },
          { title: 'Q1', field: 'qa1', sorter: 'string' },
          { title: 'Q2', field: 'qa2', sorter: 'string' },
          { title: 'Q3', field: 'qa3', sorter: 'string' },
          { title: 'Q4', field: 'qa4', sorter: 'string' },
          { title: 'Q5', field: 'qa5', sorter: 'string' },
        ],
        data: data.data.map((ticket) => {
          const values = {
            id: ticket.id,
            type: ticket.description,
            email: ticket.email,
            firstName: ticket.first_name,
            lastName: ticket.last_name,

            issued: dateFormat(ticket.created_at * 1000),
            isValid: ticket.status === 'valid',
          };
          ticket.custom_questions.forEach(({ question, answer }) => {
            if (customQuestionsMap[question] === undefined) {
              customQuestionsMap[question] = customQuestions.length;
              customQuestions.push(question);
            }
            values['qa' + customQuestionsMap[question]] = answer;
          });

          return values;
        }),
      });
    });
}
*/
