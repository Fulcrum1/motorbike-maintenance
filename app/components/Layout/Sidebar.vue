<template>
  <nav class="sidebar">
    <div class="logo-mark">M</div>

    <LayoutNavItem
      v-for="item in navItems"
      :key="item.label"
      :icon="item.icon"
      :label="item.label"
      :to="item.to"
      :active="route.path === item.to"
    />

    <LayoutNavItem
      icon="⚙️"
      label="Settings"
      to="/settings"
      :active="route.path === '/settings'"
      class="settings-item"
    />
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const navItems = [
  { icon: '🏠', label: 'Dashboard', to: '/' },
  { icon: '🔧', label: 'Service Log', to: '/service-log' },
  { icon: '📊', label: 'Statistics', to: '/statistics' },
  { icon: '🗓️', label: 'Schedule', to: '/schedule' },
  { icon: '🧾', label: 'Receipts', to: '/receipts' },
]
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 64px;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 8px;
  z-index: 100;
}

.logo-mark {
  width: 36px;
  height: 36px;
  background: var(--accent);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 16px;
  color: white;
  margin-bottom: 24px;
  flex-shrink: 0;
}

.settings-item {
  margin-top: auto;
}
</style>