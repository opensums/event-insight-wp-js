<template>
  <DefaultPage>
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6 mt-2">
          <p><button class="button" @click="loadEvents">Load events</button></p>

          <ticket-tailor-event-list
            :events="events"
            @select-event="selectEvent"
            @select-event-tickets="selectEventTickets"
          />
        </div>

        <div class="col-12 col-lg-6 mt-2">
          <ticket-tailor-event :event-id="eventId" />
        </div>
        <div class="col-12">
          <ticket-tailor-event-ticket-list :tickets="tickets" />
        </div>
      </div>
    </div>
  </DefaultPage>
</template>

<script>
import TicketTailorEvent from './TicketTailorEvent.vue';
import TicketTailorEventList from './TicketTailorEventList.vue';
import TicketTailorEventTicketList from './TicketTailorEventTicketList.vue';

export default {
  components: {
    TicketTailorEvent,
    TicketTailorEventList,
    TicketTailorEventTicketList,
  },

  data() {
    return {
      eventId: null,
      tickets: [],
      events: [],
    };
  },

  methods: {
    handleRequestError(err) {
      this.$toast.add({
        severity: 'error',
        summary: 'Request error',
        detail: err.message,
      });
    },

    async loadEvents() {
      this.events = await this.$store
        .dispatch('ticket-tailor/loadEvents')
        .catch(this.handleRequestError);
    },

    selectEvent(eventId) {
      this.eventId = eventId;
      this.selectEventTickets(eventId);
    },

    async selectEventTickets(eventId) {
      this.eventId = eventId;
      this.tickets = await this.$store
        .dispatch('ticket-tailor/loadTicketsForEvent', { eventId, fetch: true })
        .catch(this.handleRequestError);
    },
  },
};
</script>
