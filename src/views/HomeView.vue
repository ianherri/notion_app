<template>
  <h1>Home</h1>
  <p>Cool stuff coming soon...</p>
  <p>Try navigating to the page list</p>

  <!-- <SendRandText /> -->
  <h3>Cron Options</h3>
  <p>Select your text frequency below:</p>
  <form class="cron-input">
    <select id="time-interval" v-model="interval">
      <option
        v-for="option in cronIntervalOptions"
        :key="option.id"
        :value="option.interval"
      >
        {{ option.interval }}
      </option>
    </select>
  </form>
</template>

<script>
// import SendRandText from '@/components/SendRandText.vue'
export default {
  // components: { SendRandText },
  setup() {
    const cronIntervalOptions = [
      { id: 0, interval: '12 hours' },
      { id: 1, interval: '24 hours' },
      { id: 2, interval: '48 hours' },
      { id: 3, interval: '72 hours' },
    ]
    const interval = cronIntervalOptions[0].interval
    return {
      interval,
      cronIntervalOptions,
    }
  },
}
</script>

<style></style>
