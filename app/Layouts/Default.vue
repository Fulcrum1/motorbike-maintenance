<template>
  <UDashboardGroup>
    <Sidebar />
    <Topbar>
      <slot />
    </Topbar>
  </UDashboardGroup>
</template>

<script setup lang="ts">
import Topbar from "~/components/Layout/Topbar.vue";
import Sidebar from "~/components/Layout/Sidebar.vue";
</script>