import { z } from 'zod'

const bodySchema = z.object({
  email: z.email(),
  name: z.string().min(2),
  password: z.string().min(8),
})

export default defineEventHandler(async (event) => {
  const { email, name, password } = await readValidatedBody(event, bodySchema.parse);
  const config = useRuntimeConfig();

  const response = await $fetch<{ token: string }>(
    `${config.public.apiBase}/auth/register`,
    {
      method: "POST",
      body: { email, name, password },
    },
  );

  await setUserSession(event, {
    user: { email },
    token: response.token,
  })

  return {}
})