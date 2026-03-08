<template>
  <div
    class="health-card"
    :class="`status-${status}`"
    @click="open = true"
  >
    <span class="badge" :class="status">{{ badgeLabel }}</span>
  
    <div class="card-name">{{ name }}</div>
    <div class="card-value">{{ value }}</div>
    <div class="card-date">{{ date }}</div>
    <div class="card-sub">{{ sub }}</div>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${percent}%` }" />
    </div>
  </div>
  <DashboardHealthModal v-model:open="open" :data="{
    name,
    value,
    sub,
    date,
    percent,
    status
  }" @save="onSave" />
</template>

<script setup lang="ts">
type Status = 'good' | 'warn' | 'crit'

const props = defineProps<{
  name: string
  value: string
  sub: string
  date: string
  percent: number
  status: Status
}>()

const open = ref(false)

const badgeLabel = computed<string>(() => ({
  good: 'Good',
  warn: 'Due Soon',
  crit: 'Replace',
}[props.status]))

const onSave = (data: any) => {
  console.log('Saved:', data)
}
</script>

<style scoped>
.health-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 18px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.health-card:hover {
  transform: translateY(-2px);
  border-color: #444;
}

.health-card.status-good { border-top: 3px solid var(--green); }
.health-card.status-warn { border-top: 3px solid var(--yellow); }
.health-card.status-crit { border-top: 3px solid var(--red); }

.card-icon {
  font-size: 22px;
  margin-bottom: 12px;
  display: block;
}

.card-name {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
}

.card-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
}

.card-sub {
  font-size: 11px;
  color: var(--muted);
  margin-top: 4px;
}

.progress-bar {
  margin-top: 14px;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1s ease;
}

.status-good .progress-fill { background: var(--green); }
.status-warn .progress-fill { background: var(--yellow); }
.status-crit .progress-fill { background: var(--red); }

.badge {
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 3px;
}

.badge.good { background: rgba(46,204,113,0.15); color: var(--green); }
.badge.warn { background: rgba(243,156,18,0.15); color: var(--yellow); }
.badge.crit { background: rgba(231,76,60,0.15); color: var(--red); }
</style>