<script setup lang="ts">
const appConfig = useAppConfig()
console.log("appConfig", appConfig)

type PlayerStats = {
  stamina: number,
  sticktoitiveness: number,
  renegadity: number
}

const props = defineProps<{
  player: PlayerStats
}>()

const option = computed<ECOption>(() => {
  const sourceData = [
    { stat: 'Stamina', value: props.player.stamina },
    { stat: 'Stick-to-itiveness', value: props.player.sticktoitiveness },
    { stat: 'Renegadity', value: props.player.renegadity },
  ];


  return ({
    dataset: {
      dimensions: ['stat', 'value'],
      source: sourceData,
    },
    // Hide grid lines and padding by setting them to minimum
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      containLabel: false,
    },
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      show: false,
      max: 10,
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        // params[0].name is the stat, params[0].value[1] is the value
        if (params.length > 0) {
          const dataItem = params[0].data;
          return `
                <div class="font-sans text-sm p-1">
                    <span class="font-semibold">${dataItem.stat}:</span>
                    <span>${dataItem.value}</span>
                </div>
            `;
        }
        return '';
      },
    },
    series: [
      {
        type: 'bar',
        silent: true,
        barCategoryGap: '0%',
        // Map 'Value' to the horizontal axis (X) and 'Stat' to the vertical axis (Y)
        encode: { x: 'stat', y: 'value' },
        itemStyle: {
          borderRadius: [3, 3, 0, 0] // Rounded corners for aesthetics
        },
        colorBy: ({ dataIndex }: { dataIndex: number }) => {
          const colors = ['#34d399', '#facc15', '#ef4444']; // Green, Yellow, Red
          return colors[dataIndex % colors.length];
        }
      }
    ],
  })
})
</script>

<template>
  <VChart
    :option="option"
    autoresize
  />
</template>
