<template>
  <UDashboardSidebar
    collapsible
    resizable
    :ui="{ footer: 'border-t border-default' }"
  >
    <template #default="{ collapsed }">
      <USeparator />
      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[0]"
        orientation="vertical"
      />
    </template>

    <template #footer="{ collapsed }">
      <UButton
        :avatar="{
          src: 'https://github.com/benjamincanac.png',
          loading: 'lazy' as const,
        }"
        color="neutral"
        variant="ghost"
        class="w-full"
        :label="collapsed ? undefined : user?.name"
        :block="collapsed"
      />
      <UButton
        color="error"
        icon="i-lucide-log-out"
        variant="ghost"
        class="justify-end"
        :block="collapsed"
        @click="logout"
      />
    </template>
  </UDashboardSidebar>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { user } = useUserSession();

const logout = async () => {
  await useUserSession().clear();
  await navigateTo("/login");
};

const items: NavigationMenuItem[][] = [
  [
    { label: "Dashboard", icon: "i-lucide-house", to: "/" },
    { label: "My subscriptions", icon: "i-lucide-list", to: "/subscriptions" },
    { label: "Installment payments", icon: "i-lucide-credit-card", to: "/installment-payment" },
    { label: "Calendar", icon: "i-lucide-calendar", to: "/calendar" },
    { label: "Settings", icon: "i-lucide-settings", to: "/settings" },
  ],
];
</script>