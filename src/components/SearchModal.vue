<template>
  <div>
    <n-input placeholder="Qidiruv" clearable>
      <template #prefix>
        <n-icon>
          <Search />
        </n-icon>
      </template>
    </n-input>
    <n-empty description="No Data" style="padding: 20px;">
      
    </n-empty>
    <!-- <n-divider /> -->
  </div>
</template>
<script setup>
import { Search } from "@vicons/ionicons5"
</script>