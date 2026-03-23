<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Login"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :fields="fields"
        :providers="[]"
        @submit="login"
      >
        <template #footer>
          <p class="text-sm text-center text-gray-500">
            Don't have an account?
            <NuxtLink to="/register" class="text-primary font-medium"
              >Sign up</NuxtLink
            >
          </p>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'auth' })

const { fetch: refreshSession } = useUserSession()

const fields: AuthFormField[] = [
  { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email', required: true },
  { name: 'password', type: 'password', label: 'Password', placeholder: 'Enter your password', required: true },
  { name: 'remember', type: 'checkbox', label: 'Remember me' },
]

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type LoginSchema = z.output<typeof schema>

async function login(event: FormSubmitEvent<LoginSchema>) {
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: event.data })
    await refreshSession()
    await navigateTo('/')
  } catch (error: any) {
    console.error('Login failed', error)
  }
}
</script>