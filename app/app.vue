<template>
  <UApp class="app-shell">
    <LayoutSidebar />
    <div class="app-content">
      <LayoutTopbar />
      <UMain class="main-area">
        <NuxtPage />
      </UMain>
    </div>
  </UApp>

</template>

<script setup lang="ts">
// Global layout — sidebar + topbar wrap all pages via NuxtPage
</script>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100vh;
}

.app-content {
  flex: 1;
  margin-left: 64px;
  /* sidebar width */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-area {
  margin-top: 56px;
  /* topbar height */
  padding: 28px;
  flex: 1;
}
</style>