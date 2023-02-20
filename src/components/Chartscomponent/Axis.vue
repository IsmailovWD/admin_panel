<template>
  <div style="height: 300px; overflow: hidden;">
    <div style="display: flex;">
      <div style="width: 30%;">
        <kinesis-container>
          <kinesis-element :strength="20"> 
            <div class="text large">Dashboard</div>
          </kinesis-element>
          <kinesis-element :strength="10"> 
            <div class="text small">Overview Of Lasted Month</div>
          </kinesis-element>
        </kinesis-container>
        <br>
        <kinesis-container>
          <kinesis-element :strength="20"> 
            <div class="text large" > $ 7,500 </div>
          </kinesis-element>
          <kinesis-element :strength="10"> 
            <div class="text small">Current Month Earnings</div>
          </kinesis-element>
        </kinesis-container>
        <br>
        <kinesis-container>
          <kinesis-element :strength="20"> 
            <div class="text large" > 1,258 </div>
          </kinesis-element>
          <kinesis-element :strength="10"> 
            <div class="text small">Current Month Sales</div>
          </kinesis-element>
        </kinesis-container>
        <br>
        <n-button type="primary">Last Month Summary</n-button>
      </div>
      <div style="width: 70%;">
        <v-chart class="chart" :option="option" autoresize/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { KinesisContainer } from 'vue-kinesis'
import * as echarts from 'echarts'
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

provide(THEME_KEY, "light");

const option = ref({
  color: ['#26DECA', '#6B75BB'],
  title: {
    // text: 'Gradient Stacked Area Chart'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        // backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Kirim', 'Chiqim'],
    // backgroundColor: '#ccc',
    textStyle: {
      color: '#ccc'
    },
    // icon: 'rect'
  },
  toolbox: {
    // feature: {
    //   saveAsImage: {}
    // }
  },
  grid: {
    left: '0%',
    right: '0%',
    bottom: '25%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Kirim',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 2,
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#26DECA'
          },
          {
            offset: 1,
            color: '#ffffff'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [6800, 8100, 9100, 11000, 10900, 8000, 5000]
    },
    {
      name: 'Chiqim',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 2,
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#6B75BB'
          },
          {
            offset: 1,
            color: '#ffffff'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [4600, 6100, 6200, 6300, 1900, 4100,6000]
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>