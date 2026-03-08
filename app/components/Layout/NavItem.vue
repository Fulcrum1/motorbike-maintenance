<template>
  <NuxtLink :to="to" class="nav-item" :class="{ active }">
    <span class="icon">{{ icon }}</span>
    <span class="tooltip">{{ label }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  label: string
  to: string
  active?: boolean
}>()
</script>

<style scoped>
.nav-item {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--muted);
  transition: all 0.2s;
  font-size: 18px;
  position: relative;
  text-decoration: none;
}

.nav-item:hover {
  background: var(--panel);
  color: var(--text);
}

.nav-item.active {
  background: var(--accent);
  color: white;
}

.tooltip {
  position: absolute;
  left: 56px;
  background: var(--panel);
  color: var(--text);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  border: 1px solid var(--border);
  transition: opacity 0.15s;
}

.nav-item:hover .tooltip {
  opacity: 1;
}
</style>