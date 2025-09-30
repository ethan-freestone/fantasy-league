<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const supabase = useSupabaseClient()
const form = ref()

const config = useRuntimeConfig()
const baseUrl = config.baseUrl

const signInWithOtp = async (email: string) => {
  const redirectUrl = `${baseUrl}/confirm`

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: redirectUrl,
    }
  })
  if (error) console.log(error)
}

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string()),
})

type Schema = v.InferOutput<typeof schema>

const state = ref({
  email: '',
  password: ''
})

const buttonLabel = computed(() => {
  // Every time state.value.password changes, this calculation runs.
  return state.value.password.length === 0 ? "Send magic link" : "Login (Still sends magic link right now)";
});

const isFormInvalid = computed(() => {
  // We use an optional chain (?) because 'form.value' is null until the component mounts.
  // If form.value exists, we check if its 'errors' array has any items.
  return form.value?.errors.length > 0;
});

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  signInWithOtp(event.data.email)
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormField>
      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormField>
      <UButton type="submit" :disabled="isFormInvalid">
        {{ buttonLabel }}
      </UButton>
    </UForm>
  </div>
</template>
