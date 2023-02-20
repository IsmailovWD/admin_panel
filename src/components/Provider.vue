<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides" >
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider>
          <n-notification-provider>
            <App @mode="themeMode" @primaryColor="themeColor"/>
          </n-notification-provider>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
<script setup>
  import App from '../App.vue'
  import { ref } from 'vue'
  import { darkTheme, lightTheme } from 'naive-ui'
  const theme = ref(lightTheme)
  const themeMode = (e) => {
    if(e){
      theme.value = darkTheme
    }else{
      theme.value = lightTheme
    }
  }
  const themeColor = (e) => {
    themeOverrides.value.common.primaryColor = e
    theme.value = theme.value
  }
  const themeOverrides = ref({
    common: {
      primaryColor: '#18a058'
    },
  })
</script>