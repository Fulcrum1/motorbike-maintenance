<template>
  <div class="panel fade-up-7">
    <div class="panel-header">
      <div class="panel-title">Next Major Service</div>
    </div>

    <div class="countdown-ring">
      <div class="ring-label">km until next service</div>
      <div class="ring-wrapper">
        <svg class="ring-svg" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
          <circle class="ring-track" cx="70" cy="70" r="54" />
          <circle
            class="ring-fill"
            cx="70" cy="70" r="54"
            :stroke-dashoffset="dashOffset"
          />
        </svg>
        <div class="ring-center">
          <div class="ring-value">{{ kmLeft.toLocaleString() }}</div>
          <div class="ring-unit">km left</div>
        </div>
      </div>
    </div>

    <div v-for="item in details" :key="item.label" class="detail-row">
      <span class="label">{{ item.label }}</span>
      <span class="val" :class="item.highlight">{{ item.value }}</span>
    </div>

    <button class="schedule-btn" @click="$emit('schedule')">
      Schedule Appointment →
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  kmLeft: number
  kmTotal: number
  serviceType: string
  dueAtKm: number
  estDate: string
  estCost: string
}>()

defineEmits<{ (e: 'schedule'): void }>()

const circumference = 2 * Math.PI * 54 // ≈ 339.3

// Animate from full to target on mount
const animatedOffset = ref(circumference)

const targetOffset = computed(() =>
  circumference - (props.kmLeft / props.kmTotal) * circumference
)

onMounted(() => {
  setTimeout(() => {
    animatedOffset.value = targetOffset.value
  }, 300)
})

const dashOffset = computed(() => animatedOffset.value)

const details = computed(() => [
  { label: 'Service Type', value: props.serviceType,                  highlight: '' },
  { label: 'Due At',       value: `${props.dueAtKm.toLocaleString()} km`, highlight: '' },
  { label: 'Est. Date',    value: props.estDate,                      highlight: 'warn' },
  { label: 'Est. Cost',    value: props.estCost,                      highlight: '' },
])
</script>

<style scoped>
.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.panel-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.countdown-ring {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 20px 20px;
  gap: 4px;
}

.ring-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 12px;
}

.ring-svg {
  width: 140px;
  height: 140px;
  transform: rotate(-90deg);
}

.ring-track {
  fill: none;
  stroke: var(--border);
  stroke-width: 8;
}

.ring-fill {
  fill: none;
  stroke: var(--accent);
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 339.3;
  transition: stroke-dashoffset 1.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.ring-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.ring-center {
  position: absolute;
  text-align: center;
}

.ring-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 32px;
  font-weight: 900;
  line-height: 1;
}

.ring-unit {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid var(--border);
}

.detail-row .label {
  font-size: 11px;
  color: var(--muted);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.detail-row .val {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  color: var(--text);
}

.detail-row .val.warn { color: var(--yellow); }

.schedule-btn {
  margin: 16px;
  width: calc(100% - 32px);
  padding: 12px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}

.schedule-btn:hover {
  background: #ff7c2a;
  transform: translateY(-1px);
}
</style>