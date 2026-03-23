import { z } from "zod";

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);
  const config = useRuntimeConfig();
  
  const response = await $fetch<{ token: string; user: { email: string; name: string } }>(
    `${config.public.apiBase}/auth/login`,
    {
      method: "POST",
      body: { email, password },
    },
  );

  await setUserSession(event, {
    user: { email: response.user.email, name: response.user.name },
    token: response.token,
  });

  return {};
});
