<template>
  <DefaultPage>
    <div class="container">
      <div class="row">
        <div class="col-12 mt-2">
          <p>
            Welcome to the Event Insight plugin. This plugin works alongside
            other services to help you run events and share information with
            your team.
          </p>
          <p>
            Event Insight is really new and we only have one service linked in
            so far - the excellent
            <a :href="$store.state['ticket-tailor'].link" target="_blank"
              >Ticket Tailor</a
            >. Select the Ticket Tailor tab to use this service.
          </p>
        </div>
      </div>
    </div>
  </DefaultPage>
</template>
