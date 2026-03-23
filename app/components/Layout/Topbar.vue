<template>
  <UDashboardPanel class="overflow-auto">
    <UDashboardToolbar>
      <template #left>
        <div class="flex flex-col">
          <div class="font-bold text-lg">{{ currentPage.title }}</div>
          <div class="text-xs text-gray-500">
            MotoTrack / <span class="text-gray-700">{{ currentPage.section }}</span>
          </div>
        </div>
      </template>

      <template #right>
        <div class="flex items-center gap-4">
          <div class="odometer">⬡ {{ odometer.toLocaleString() }} km</div>
          <div class="avatar" title="JD — Rider Profile">JD</div>
        </div>
      </template>
    </UDashboardToolbar>

    <div class="p-6">
      <slot />
    </div>
  </UDashboardPanel>
</template>

<script setup lang="ts">
const route = useRoute();
const odometer = ref(24381);

const pageMap: Record<string, { title: string; section: string }> = {
  "/": { title: "Dashboard", section: "My Garage" },
  "/service-log": { title: "Service Log", section: "Maintenance" },
  "/statistics": { title: "Statistics", section: "Analytics" },
  "/schedule": { title: "Schedule", section: "Upcoming" },
  "/receipts": { title: "Receipts", section: "Finance" },
  "/settings": { title: "Settings", section: "Account" },
};

const currentPage = computed(
  () => pageMap[route.path] ?? { title: "MotoTrack", section: "App" },
);
</script>

<style scoped>
.odometer {
  font-family: monospace;
  font-size: 13px;
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
  background: linear-gradient(135deg, #f59e0b, #ff9a3c);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  color: white;
  cursor: pointer;
}
</style>