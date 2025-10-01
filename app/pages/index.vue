<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

type Player = {
  id: string
  player: string
  price: number,
  stamina: number,
  sticktoitiveness: number,
  renegadity: number
}

const columns: TableColumn<Player>[] = [
  {
    accessorKey: 'name',
    header: 'Player'
  },
  {
    accessorKey: 'stamina',
    header: () => h('div', { class: 'text-right' }, 'Stamina'),
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue('stamina'))

      const formatted = new Intl.NumberFormat('en-US', {
      }).format(price)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  },
  {
    accessorKey: 'sticktoitiveness',
    header: () => h('div', { class: 'text-right' }, 'Stick-to-itiveness'),
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue('sticktoitiveness'))

      const formatted = new Intl.NumberFormat('en-US', {
      }).format(price)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  },
  {
    accessorKey: 'renegadity',
    header: () => h('div', { class: 'text-right' }, 'Renegadity'),
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue('renegadity'))

      const formatted = new Intl.NumberFormat('en-US', {
      }).format(price)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  },
  {
    accessorKey: 'price',
    header: () => h('div', { class: 'text-right' }, 'Price'),
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue('price'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP'
      }).format(price)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  }  
]

const supabase = useSupabaseClient()

const players = ref([])

async function getPlayers() {
  const { data } = await supabase.from('game-players').select()
  players.value = data
}

onMounted(() => { getPlayers() })

</script>

<template>
  <UContainer>
    <UPageCard class="mt-3" title="Possible players">
      <UContainer class="h-100 overflow-auto">
        <UPageList divide>
		  <UTable :data="players" :columns="columns" class="flex-1" />
        </UPageList>
      </UContainer>
    </UPageCard>
  </UContainer>
  
</template>

