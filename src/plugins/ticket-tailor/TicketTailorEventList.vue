<template>
  <div>
    <b-table
      @filtered="onFiltered"
      @row-selected="onSelected"
      :current-page="currentPage"
      :fields="fields"
      :items="items"
      :per-page="perPage"
      sort-by="start.date"
      sort-desc="true"
      hover
      primary-key="id"
      selectable
      select-mode="single"
      small
    />

    <b-pagination
      v-if="totalRows > perPage"
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="fill"
      size="sm"
      class="my-0"
    />
  </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    items() {
      return this.events.map(e => {
        const status = e.status !== 'published' ? ` (${e.status})` : '';
        return {
          id: e.id,
          'start.date': e.start.date,
          name: `${e.name}${status}`,
        };
      });
    },
  },

  data() {
    const sortable = true;
    return {
      fields: [
        { key: 'start.date', label: 'Date', sortable },
        { key: 'name', label: 'Event', sortable },
      ],

      totalRows: 0,
      currentPage: 1,
      perPage: 10,
    };
  },

  watch: {
    // Set the number of rows when the events prop changes.
    events() {
      this.totalRows = this.events.length;
    },

    // Clear the displayed row when the page changes.
    pagination() {
      this.totalRows = this.events.length;
    },
  },

  methods: {
    onSelected(items) {
      // React to selection (or deslection) of an item.
      this.$emit('select-event', items.length > 0 ? items[0].id : null);
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
