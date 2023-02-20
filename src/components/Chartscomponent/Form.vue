<template>
  <div style="width: 100%; position: relative; height: 300px; overflow: hidden;">
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'light');

const option = ref({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '0%',
    left: 'center',
    textStyle: {
      color: '#ccc'
    },
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      // emphasis: {
      //   label: {
      //     show: false,
      //     fontSize: 40,
      //     fontWeight: 'bold'
      //   }
      // },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 690, name: 'Search' },
      ]
    }
  ]
});
</script>
<style scoped>
.chart {
  height: 300px;
}
</style>

