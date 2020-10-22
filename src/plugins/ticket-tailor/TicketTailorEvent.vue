<template>
  <div>
    <table>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <th>{{ item[1] }}</th>
          <td>{{ item[2] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { flattenEvent } from './filters';

const labels = {
  eventId: 'Event ID',
  name: 'Event name',
  status: 'Status',
  eventUrl: 'Link',
  venue: 'Venue',
  isOnline: 'Online event?',
  isPrivate: 'Private',

  timezone: 'Timezone',
  start: 'Start time',
  end: 'End time',
  created: 'Created',

  currency: 'Currency',
  paymentMethods: 'Payment methods',
  ticketTypes: 'Ticket types',
  ticketsAvailable: 'Tickets available?',

  /*
  accessCode: 'Access code',
  cta: 'Call to action',
  description: e.description.substring(0, 63),
  eventSeriesId: e.series_id,
  images: [e.images.header, e.images.thumbnail],
  ticketsIssuedCount: e.total_issued_tickets,
  ordersCount: e.total_orders,
  */
};

export default {
  props: {
    eventId: {
      type: String,
      default: null,
    },
  },

  data() {
    return {};
  },

  computed: {
    event() {
      return this.$store.getters['ticket-tailor/getEvent'](this.eventId);
    },

    list() {
      if (!(this.event && this.event.id)) return;
      const event = flattenEvent(this.event);
      return Object.entries(labels).map(([key, value]) => {
        if (typeof value === 'string') {
          return [key, value, event[key]];
        } else {
          return [key, value, 'Not a string'];
        }
      });
    },
  },
};
</script>
