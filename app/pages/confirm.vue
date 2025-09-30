<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  console.log("WHAT IS USER: %o", user)
  if (user.value) {
    // Redirect to protected page
    return navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <div>Waiting for login...</div>
</template>