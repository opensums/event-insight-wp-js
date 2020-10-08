//

let Tabulator;
let wp;

const state = {};

function dateFormat(timestamp) {
  const iso = new Date(timestamp).toISOString();
  return iso.substr(0, 10) + ' ' + iso.substr(11, 8);
}

// Ticket tailor event tickets.
function loadTicketsForTicketTailorEvent(eventId) {
  wp.get('/ticket-tailor/event/' + eventId + '/tickets')
    .catch()
    .then((data) => {
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

function getEvents() {
  wp.get('/ticket-tailor/events')
    // Ought to do something with an error.
    .catch()
    .then((data) => {
      new Tabulator('#event-insight-ticket-tailor-events', {
        layout: 'fitDataFill',
        columns: [
          {
            title: 'Date',
            field: 'date',
            sorter: 'string',
            hozAlign: 'center',
          },
          { title: 'Event', field: 'event', sorter: 'string' },
          {
            title: 'Id',
            field: 'id',
            sorter: 'string',
            hozAlign: 'center',
            headerTooltip: 'This is what we want to be displayed as the header',
          },
          {
            title: 'Published',
            field: 'published',
            sorter: 'boolean',
            formatter: 'tickCross',
            hozAlign: 'center',
          },
          // {title:"Name", field:"name", sorter:"string", width:200, editor:true},
          // {title:"Age", field:"age", sorter:"number", hozAlign:"right", formatter:"progress"},
          // {title:"Gender", field:"gender", sorter:"string", cellClick:function(e, cell){console.log("cell click")},},
          // {title:"Height", field:"height", formatter:"star", hozAlign:"center", width:100},
          // {title:"Favourite Color", field:"col", sorter:"string"},
          // {title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
          // {title:"Cheese Preference", field:"cheese", sorter:"boolean", hozAlign:"center", formatter:"tickCross"},
        ],

        data: data.data.map((event) => {
          return {
            id: event.id,
            event: event.name,
            date: event.start.date,
            published: event.status === 'published',
          };
        }),

        rowClick: (e, row) => {
          loadTicketsForTicketTailorEvent(row._row.data.id);
        },
      });
    });
}

function init(store, options) {
  store.ticketTailorEvents = this;
  store.state.ticketTailorEvents = state;

  ({ Tabulator } = options);
  ({ wp } = store);
}

export const ticketTailorEvents = { init, getEvents };
