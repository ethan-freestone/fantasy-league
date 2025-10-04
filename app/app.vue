<script setup>
import { jwtDecode } from 'jwt-decode'
const supabase = useSupabaseClient()
const session = useSupabaseSession() // This returns a reactive Ref<Session | null>


const jwt = computed(() => session.value ? jwtDecode(session.value.access_token) : {});
console.log("JWT: %o", jwt)

const logout = async () => {
  const { error } = await supabase.auth.signOut().then(() => navigateTo('/login'))
  if (error) console.log(error)
}
</script>

<template>
  <UApp>
    Welcome back {{ jwt.email }}. You have role: {{ jwt.user_role }}
    <!-- FIXME Replace this with a real logout -->
    <UButton @click="logout">Logout</UButton>
    <NuxtPage />
  </UApp>
</template>