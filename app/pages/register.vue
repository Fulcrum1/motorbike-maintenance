<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Register"
        description="Enter your credentials to create your account."
        icon="i-lucide-user"
        :fields="fields"
        :providers="[]"
        @submit="register"
      >
        <template #footer>
          <p class="text-sm text-center text-gray-500">
            Already have an account?
            <NuxtLink to="/login" class="text-primary font-medium"
              >Sign in</NuxtLink
            >
          </p>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";

definePageMeta({ layout: "auth" });

const { fetch: refreshSession } = useUserSession();

const fields: AuthFormField[] = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter your name",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    required: true,
  },
];

const schema = z.object({
  email: z.email("Invalid email"),
  name: z.string().min(2, "Must be at least 2 characters"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type RegisterSchema = z.output<typeof schema>;

async function register(event: FormSubmitEvent<RegisterSchema>) {
  try {
    await $fetch("/api/auth/register", { method: "POST", body: event.data });
    await refreshSession();
    await navigateTo("/");
  } catch {
    alert("Bad credentials");
  }
}
</script>
