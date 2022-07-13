<template>
  <h1>Notion Reminders</h1>
  <p>The app that texts you the notes you've already taken</p>
  <p>Select how often you want a text from your notes:</p>
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
  <SendRandText />
</template>

<script setup>
import SendRandText from '@/components/SendRandText.vue'
import { ref } from 'vue'

const cronIntervalOptions = [
  { id: 0, interval: '12 hours' },
  { id: 1, interval: '24 hours' },
  { id: 2, interval: '48 hours' },
  { id: 3, interval: '72 hours' },
]

const interval = ref(cronIntervalOptions[0].interval)
</script>

<style></style>
