<template>
  <div>
    <PageHeader />
    <main class="p-pr-2 p-px-md-2"><slot /></main>
    <PageFooter />
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue';
import PageFooter from './PageFooter.vue';

export default {
  components: { PageHeader, PageFooter },
};
</script>
