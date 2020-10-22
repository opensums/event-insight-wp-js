<template>
  <div>
    <div v-show="tickets.length" ref="target"></div>
  </div>
</template>

<script>
/**
 * Tabulator column definitions.
 *
 * Unused:
function getColumns() {
  /*
  "object",
  "id",
  "barcode",
  "barcode_url",
  "created_at",
  "custom_questions",
  "description",
  "email",
  "event_id",
  "full_name",
  "first_name",
  "last_name",
  "reservation",
  "status",
  "ticket_type_id",
  "updated_at",
  "voided_at",
  "order_id",
  "qr_code_url"
  return [
    {
      title: 'Id',
      field: 'id',
      sorter: 'string',
      hozAlign: 'center',
    },
  ];
}
*/

export default {
  props: {
    tickets: {
      type: Object,
      default: () => [],
    },
  },

  data() {
    return {
      ticket: this.tickets.length ? this.tickets[0] : {},
    };
  },

  watch: {
    tickets() {
      this.ticket = this.tickets[0];
      this.tickets.map(ticket => {
        return {
          // Comment.
          // Comment.
          // Comment.
          id: ticket.id,
        };
      });
    },
  },
};
</script>
