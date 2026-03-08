<template>
  <div>
    <!-- Bike Hero Banner -->
    <DashboardBikeHero :bike="bike" />

    <!-- Component Health -->
    <div class="section-label">Component Health</div>
    <div class="health-grid">
      <DashboardHealthCard v-for="(card, i) in healthCards" :key="card.name" v-bind="card" :class="`fade-up-${i + 1}`"
        @click="onHealthCardClick(card)" />
    </div>

    <!-- Service Log + Next Service -->
    <div class="section-label">Service History &amp; Upcoming</div>
    <div class="bottom-grid">
      <DashboardService :entries="serviceEntries" @add="onAddService" @select="onSelectEntry" />
      <DashboardNuxtServicePanel :km-left="1819" :km-total="5000" service-type="10,000 km Full" :due-at-km="26200"
        est-date="~April 2025" est-cost="€180 – 250" @schedule="onSchedule" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ServiceEntry } from '~/components/Dashboard/Service.vue'

// ─── Bike data ───────────────────────────────────────────────────────────────
const bike = {
  make: 'Kawasaki',
  model: 'Z650',
  variant: '650',
  year: 2018,
  odometer: 25000,
  lastServiceKm: 21200,
  healthScore: 87,
}

// ─── Health cards ─────────────────────────────────────────────────────────────
const healthCards = [
  { name: 'Engine Oil', value: '72%', sub: 'Changed 3,181 km ago', date: '14 Feb 2025', percent: 72, status: 'good' as const },
  { name: 'Drive Chain', value: '41%', sub: 'Lube overdue ~400 km', date: '03 Sep 2024', percent: 41, status: 'warn' as const },
  { name: 'Front Tire', value: '18%', sub: 'Tread depth 1.2mm', date: '14 Feb 2025', percent: 18, status: 'crit' as const },
  { name: 'Rear Tire', value: '18%', sub: 'Tread depth 1.2mm', date: '14 Feb 2025', percent: 18, status: 'crit' as const },
]

// ─── Service log entries ──────────────────────────────────────────────────────
const serviceEntries: ServiceEntry[] = [
  {
    id: 1,
    icon: '🛢️',
    name: 'Full Oil &amp; Filter Change',
    km: 25000,
    date: '14 Feb 2025',
    location: 'Ducati Dealer',
    statusLabel: '✔ Done',
    statusColor: 'var(--green)',
    cost: '+€89',
  },
  {
    id: 2,
    icon: '⚙️',
    name: 'Valve Clearance Check',
    km: 18000,
    date: '03 Sep 2024',
    location: 'Self-Service',
    statusLabel: '✔ Done',
    statusColor: 'var(--green)',
    cost: 'Free',
  },
  {
    id: 3,
    icon: '🔗',
    name: 'Chain Lube &amp; Tension Adjust',
    km: 20000,
    date: '10 Jan 2025',
    location: 'Self-Service',
    statusLabel: '✔ Done',
    statusColor: 'var(--green)',
    cost: 'Free',
  },
  {
    id: 4,
    icon: '🛞',
    name: 'Front Tyre Replacement',
    km: 16500,
    date: '22 Jun 2024',
    location: 'TyrePro Shop',
    statusLabel: '✔ Done',
    statusColor: 'var(--green)',
    cost: '+€145',
  },
  {
    id: 5,
    icon: '🛞',
    name: 'Rear Tyre — <span style="color:var(--red)">Replace Now</span>',
    km: 25000,
    date: 'Current',
    location: 'Tread 1.2mm (min 1.6mm)',
    statusLabel: '⚠ Critical',
    statusColor: 'var(--red)',
    cost: 'ASAP',
  },
]

// ─── Handlers ─────────────────────────────────────────────────────────────────
function onHealthCardClick(card: typeof healthCards[0]) {
  console.log('Health card clicked:', card.name)
}

function onQuickAction(key: string) {
  console.log('Quick action:', key)
}

function onAddService() {
  console.log('Add service entry')
}

function onSelectEntry(entry: ServiceEntry) {
  console.log('Selected entry:', entry.id)
}

function onSchedule() {
  console.log('Open scheduling flow')
}
</script>

<style scoped>
.health-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 16px;
}
</style>