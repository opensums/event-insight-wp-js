function dateObjectToText(date) {
  return `${date.date} ${date.time} (UTC${date.timezone})`;
}

function joinByKey(array, name) {
  return array.map(el => el[name]).join(', ');
}

function unixtimeToString(ts) {
  return new Date(ts * 1000).toLocaleString() + ' (local time)';
}

function venueToString(venue) {
  return `${venue.name} ${venue.postal_code}`;
}

export function flattenEvent(e) {
  return {
    eventId: e.id,
    accessCode: e.access_code,
    cta: e.call_to_action,
    created: unixtimeToString(e.created_at),
    currency: e.currency.toUpperCase(),
    description: e.description && e.description.substring(0, 63),
    end: dateObjectToText(e.end),
    eventSeriesId: e.series_id,
    images: [e.images.header, e.images.thumbnail],
    name: e.name,
    isOnline: e.online_event,
    paymentMethods: joinByKey(e.payment_methods, 'type'),
    isPrivate: e.private,
    start: dateObjectToText(e.start),
    status: e.status,
    ticketTypes: joinByKey(e.ticket_types, 'name'),
    ticketsAvailable: e.tickets_available,
    timezone: e.timezone,
    ticketsIssuedCount: e.total_issued_tickets,
    ordersCount: e.total_orders,
    eventUrl: e.url,
    venue: venueToString(e.venue),
  };
}
