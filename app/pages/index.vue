<script setup>
const supabase = useSupabaseClient()

const players = ref([])

async function getPlayers() {
  const { data } = await supabase.from('game-players').select()
  players.value = data
}

onMounted(() => {  getPlayers() })

</script>

<template>
  <UContainer>
    <UHeader title="Possible players"/>
    <UPageList divide>
      <UPageCard
          v-for="player in players"
          :key="player.id"
          variant="ghost"
          :target="player.target"
      >
        <template #body>
          <UUser :name="player.name" :description="player.bio" size="xl" class="relative" />
        </template>
      </UPageCard>
    </UPageList>
  </UContainer>
</template>