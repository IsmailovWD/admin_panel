<template>
  <div>
    <div style="display: flex; gap: 10px;">
      <div style="width: 68%; position: relative;">
        <n-card :bordered="false">
          <Axis />
        </n-card>
      </div>
      <div style="width: 32%;">
        <n-card :bordered="false" content-style="padding: 20px 10px">
          <chaCir></chaCir>
        </n-card>
      </div>
    </div>
    <div class="cards">
      <div class="card" style="--clr: linear-gradient(to right bottom, rgb(236, 71, 134), rgb(185, 85, 164));">
        <div class="title text medium">Views</div>
        <div class="body" style="display: flex; align-items: center; justify-content: space-between;">
          <span>
            <n-icon size="20">
              <BarChart />
            </n-icon>
          </span>
          <span class="text medium">1,000,000</span>
        </div>
      </div>
      <div class="card" style="--clr: linear-gradient(to right bottom, rgb(134, 94, 192), rgb(81, 68, 180));">
        <div class="title text medium">Turnover</div>
        <div class="body" style="display: flex; align-items: center; justify-content: space-between;">
          <span>
            <n-icon size="20">
              <Cash />
            </n-icon>
          </span>
          <span class="text medium">$ 233,500</span>
        </div>
      </div>
      <div class="card" style="--clr: linear-gradient(to right bottom, rgb(86, 205, 243), rgb(113, 157, 227))">
        <div class="title text medium">Downloads</div>
        <div class="body" style="display: flex; align-items: center; justify-content: space-between;">
          <span>
            <n-icon size="20">
              <CloudDownload />
            </n-icon>
          </span>
          <span class="text medium">2,530</span>
        </div>
      </div>
      <div class="card" style="--clr: linear-gradient(to right bottom, rgb(252, 188, 37), rgb(246, 128, 87));">
        <div class="title text medium">Items</div>
        <div class="body" style="display: flex; align-items: center; justify-content: space-between;">
          <span>
            <n-icon size="20">
              <Card />
            </n-icon>
          </span>
          <span class="text medium">4,065</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Axis from '../../components/Chartscomponent/Axis.vue'
import chaCir from '../../components/Chartscomponent/Form.vue'
import { BarChart , Cash , CloudDownload, Card} from '@vicons/ionicons5'
</script>
<style scoped>

.cards{
  margin: 10px 0;
  display: grid;
  grid-template-columns: 24% 24% 24% 24%;
  justify-content: space-between;
}
.card{
  padding: 10px;
  border-radius: 15px;
  background: var(--clr);
  color: #fff;
}
</style>