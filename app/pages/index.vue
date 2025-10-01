<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

type Payment = {
  id: string
  player: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  price: number
}

const data = ref<Payment[]>([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  }
])

const columns: TableColumn<Payment>[] = [
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
		  <UTable sticky :data="players" :columns="columns" class="flex-1" />
        </UPageList>
      </UContainer>
    </UPageCard>
  </UContainer>
  
</template>

