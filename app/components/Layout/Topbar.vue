<template>
  <header class="topbar">
    <div class="topbar-left">
      <div class="page-title">{{ currentPage.title }}</div>
      <div class="breadcrumb">
        MotoTrack / <span>{{ currentPage.section }}</span>
      </div>
    </div>

    <div class="topbar-right">
      <div class="odometer">⬡ {{ odometer.toLocaleString() }} km</div>
      <div class="avatar" title="JD — Rider Profile">JD</div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const odometer = ref(24381)

const pageMap: Record<string, { title: string; section: string }> = {
  '/': { title: 'Dashboard', section: 'My Garage' },
  '/service-log': { title: 'Service Log', section: 'Maintenance' },
  '/statistics': { title: 'Statistics', section: 'Analytics' },
  '/schedule': { title: 'Schedule', section: 'Upcoming' },
  '/receipts': { title: 'Receipts', section: 'Finance' },
  '/settings': { title: 'Settings', section: 'Account' },
}

const currentPage = computed(
  () => pageMap[route.path] ?? { title: 'MotoTrack', section: 'App' }
)
</script>

<style scoped>
.topbar {
  position: fixed;
  left: 64px;
  right: 0;
  top: 0;
  height: 56px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 28px;
  gap: 20px;
  z-index: 90;
}

.page-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.breadcrumb {
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.05em;
}

.breadcrumb span {
  color: var(--accent);
}

.topbar-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 16px;
}

.odometer {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  color: var(--accent2);
  background: rgba(255, 214, 10, 0.08);
  border: 1px solid rgba(255, 214, 10, 0.2);
  padding: 5px 12px;
  border-radius: 4px;
  letter-spacing: 0.1em;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #ff9a3c);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  color: white;
  cursor: pointer;
}
</style>