<template>
  <div class="panel fade-up-6">
    <div class="panel-header">
      <div class="panel-title">Service Log</div>
      <button class="btn-ghost" @click="$emit('add')">+ Add Entry</button>
    </div>

    <div class="service-list">
      <div
        v-for="entry in entries"
        :key="entry.id"
        class="service-row"
        @click="$emit('select', entry)"
      >
        <div class="service-icon">{{ entry.icon }}</div>
        <div>
          <div class="service-name" v-html="entry.name" />
          <div class="service-meta">{{ entry.km.toLocaleString() }} km · {{ entry.date }} · {{ entry.location }}</div>
        </div>
        <div class="service-due">
          <div class="km" :style="{ color: entry.statusColor }">{{ entry.statusLabel }}</div>
          <div class="label">{{ entry.cost }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface ServiceEntry {
  id: number
  icon: string
  name: string
  km: number
  date: string
  location: string
  statusLabel: string
  statusColor: string
  cost: string
}

defineProps<{ entries: ServiceEntry[] }>()
defineEmits<{
  (e: 'add'): void
  (e: 'select', entry: ServiceEntry): void
}>()
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

.service-list { padding: 8px; }

.service-row {
  display: grid;
  grid-template-columns: 44px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
}

.service-row:hover { background: var(--panel); }

.service-icon {
  width: 44px;
  height: 44px;
  border-radius: 9px;
  background: var(--panel);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.service-name {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 3px;
  color: var(--text);
}

.service-meta {
  font-size: 11px;
  color: var(--muted);
  font-family: 'Share Tech Mono', monospace;
}

.service-due { text-align: right; }

.service-due .km {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  font-weight: 600;
}

.service-due .label {
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
</style>