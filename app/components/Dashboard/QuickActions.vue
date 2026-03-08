<template>
  <div class="quick-actions fade-up-5">
    <button
      v-for="action in actions"
      :key="action.label"
      class="qa-btn"
      @click="$emit('action', action.key)"
    >
      <div class="qa-icon">{{ action.icon }}</div>
      <div class="qa-text">
        <div class="t">{{ action.label }}</div>
        <div class="s">{{ action.sub }}</div>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ (e: 'action', key: string): void }>()

const actions = [
  { key: 'log-service', icon: '📝', label: 'Log Service', sub: 'Record maintenance done' },
  { key: 'fuel',        icon: '⛽', label: 'Fuel Fill-Up', sub: 'Track fuel economy' },
  { key: 'odometer',   icon: '🚗', label: 'Update Odometer', sub: 'Sync current km reading' },
]
</script>

<style scoped>
.quick-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 24px;
}

.qa-btn {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  color: var(--text);
}

.qa-btn:hover {
  border-color: var(--accent);
  background: rgba(232,93,4,0.05);
}

.qa-icon {
  font-size: 20px;
  width: 36px;
  height: 36px;
  background: var(--panel);
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.qa-text .t { font-size: 13px; font-weight: 600; }
.qa-text .s { font-size: 11px; color: var(--muted); }
</style>