<script setup lang="ts">
import * as v from 'valibot'
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

const supabase = useSupabaseClient()
const authForm = useTemplateRef('authForm');

const config = useRuntimeConfig()

const signInWithOtp = async (email: string) => {
  const redirectUrl = `${config.public.baseUrl}/confirm`

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: redirectUrl,
    }
  })
  if (error) console.log(error)
}

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  }
]

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string()),
})

type Schema = v.InferOutput<typeof schema>

const buttonLabel = computed((): string => {
  // Every time state.value.password changes, this calculation runs.
  return (authForm.value?.state?.password?.length ?? 0) === 0 ? "Send magic link" : "Login (Still sends magic link right now)";
});

const canSubmit = computed((): boolean => {
  const isPristine = !authForm.value?.formRef?.dirty;
  const isFormInvalid = (authForm.value?.formRef?.errors?.length ?? 0) > 0;
  // We use an optional chain (?) because 'form.value' is null until the component mounts.
  // If form.value exists, we check if its 'errors' array has any items.
  return isFormInvalid || isPristine;
});

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  signInWithOtp(event.data.email)
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    // FIXME DO NOT KEEP THESE ON THE LOGIN PAGE, OBVS
    <UPageCard class="mt-3" title="Env vars">
		  vercelEnv: {{ config.public.vercelEnv }}
      vercelUrl: {{ config.public.vercelUrl }}
      vercelBranchUrl: {{ config.public.vercelBranchUrl }}
      baseUrl: {{ config.public.baseUrl }}
    </UPageCard>
    <UCard class="ml-5 mr-5">
      <UAuthForm
          ref="authForm"
          :schema="schema"
          title="Login"
          description="Enter your credentials to access your account. Alternatively just enter an email to send a magic link to login"
          icon="i-lucide-user"
          :fields="fields"
          :submit="{
        label: buttonLabel,
        variant: 'subtle',
        disabled: canSubmit,
      }"
          @submit="onSubmit"
      />
    </UCard>
  </div>
</template>
