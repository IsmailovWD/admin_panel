<template>
  <n-space vertical>
    <n-layout has-sider>
      <n-layout-sider
        :bordered="!switchValue"
        collapse-mode="width"
        :collapsed-width="navbar ? 64 : 0"
        :width="240"
        :collapsed="collapsed"
        @collapse="collapsed = true"
        @expand="collapsed = false"
        style="height: 100vh;"
      > 
        <div :class="collapsed ? 'logo active' : 'logo'">
          <div class="logo_box">
            <n-avatar
              src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
            />
          </div>
          <div class="logo_text" style="font-size: 22px; font-weight: 500; white-space: nowrap;">
            My logo
          </div>
        </div>
        <n-menu
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :onUpdate:value="updateMenu" 
        />
      </n-layout-sider>
      <n-layout>
        <n-scrollbar style="height: 100vh">
          <n-layout-header>
            <div class='page_header_section'>
              <div style="width: 100%;">
                <n-page-header @back="handleBack" :bordered="switchValue">
                  <template #title v-if="!navbar">
                    <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" style="padding-top: 5px;" :onUpdate:value="updateMenu"  />
                  </template>
                  <template #extra>
                    <div style="display: flex; align-items: center; gap: 0px;">
                      <n-button quaternary size="small" style="height: 50px;" @click="modalSearch = !modalSearch">
                        <n-icon size="20">
                          <Search />
                        </n-icon>
                      </n-button>
                      <n-button quaternary size="small" style="height: 50px;" @click="switchValue = !switchValue">
                        <n-icon size="20" v-if="switchValue">
                          <Sunny />
                        </n-icon>
                        <n-icon size="20" v-else>
                          <Moon />
                        </n-icon>
                      </n-button>
                      <n-button quaternary @click="active = !active" size="small" style="height: 50px;">
                        <n-icon size="20">
                          <SettingsSharp />
                        </n-icon>
                      </n-button>
                      <n-badge :value="4" :max="9" :offset="[-8,14]">
                        <n-button quaternary size="small"  style="height: 50px;">
                          <n-icon size="20">
                            <Notifications />
                          </n-icon>
                        </n-button>
                      </n-badge>
                      <div style="width: 10px;"></div>
                      <n-dropdown :options="profiles">
                        <n-avatar
                          :size="25"
                          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                          style="cursor: pointer;"
                        />
                      </n-dropdown>
                    </div>
                  </template>
                  <template #back>
                    <n-icon size="30" v-if="!switchs">
                      <Menu />
                    </n-icon>
                  </template>
                  <template #avatar v-if="switchs">
                    <n-avatar
                      src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
                    />
                    <div style="width: 10px;"></div>
                    <div style="font-size: 22px; font-weight: 500; white-space: nowrap;">
                      My logo
                    </div>
                  </template>
                </n-page-header>
              </div>
            </div>
            <n-breadcrumb separator="/" style="padding: 0px 20px 5px 20px;">
              <n-breadcrumb-item v-for="(item, index) in tabHistory" :key="index" @click="updatePage(item.path, item.name)">{{item.name}}</n-breadcrumb-item>
            </n-breadcrumb>
            <n-divider :style="!switchValue ? 'margin: 0;':'margin:0; opacity:0;'"/>
          </n-layout-header>
          <n-modal v-model:show="modalSearch">
            <n-card
              :bordered="false"
              role="dialog"
              aria-modal="true"
              style="max-width: 550px; width: 100%; position: fixed; right: calc(50% - 275px); top: 20px"
            >
              <SearchModal></SearchModal>
            </n-card>
          </n-modal>
          <n-layout-content content-style="padding: 24px;">
            <div style="min-height: calc(100vh - 156px);" >
              <router-view data-aos="zoom-in-down" ></router-view>
            </div>
          </n-layout-content>
          <footers></footers>
        </n-scrollbar>
      </n-layout>
      <n-drawer v-model:show="active" :width="500" :placement="'right'">
        <n-drawer-content title="Sozlamalar" closable>
          <n-switch v-model:value="switchs" />
          <n-checkbox v-model:checked="value" color="#fff"/>
          <n-form :model="models">
            <n-form-item :label="models.color" path="color" :rule="colorRule">
              <n-color-picker v-model:value="models.color" :show-alpha="false" :onUpdate:value="UpdateColor"/>
            </n-form-item>
          </n-form>
        </n-drawer-content>
      </n-drawer>
    </n-layout>
  </n-space>
</template>

<script setup>
import { h, ref , watch, onMounted , reactive} from "vue";
import { useRoute, useRouter } from "vue-router";
import { NIcon } from "naive-ui";
import {
  Menu, LogoJavascript, LogoVue, LogoReact, LogoAngular, AnalyticsSharp, BarChart, PieChart,DocumentTextOutline, Notifications,SettingsSharp, PersonCircleOutline, Pencil ,LogOutOutline , Moon , Sunny , Grid , Search,Close
} from "@vicons/ionicons5";
import SearchModal from "../../components/SearchModal.vue"
import footers  from '../../components/Footer.vue'
const tabHistory = ref([])
const route = useRoute()
const router = useRouter()
const navbar = ref(true)
const activeKey = ref(null);
const collapsed = ref(false);
const active = ref(false);
const switchs = ref(false);
const switchValue = ref(false);
const modalSearch = ref(false);
const value = ref(false);
const emits = defineEmits(['mode', 'primaryColor'])

const renderIcon = (icon) => {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const handleBack = () => {
  if(collapsed.value){
    collapsed.value = false
  }else{
    collapsed.value = true
  }
}
const menuOptions = ref([
  {
    label: "Dashboard",
    key: "Dashboard",
    icon: renderIcon(Grid)
  },
  {
    label: "Javascript",
    key: "Javascript",
    icon: renderIcon(LogoJavascript),
    children: [
      {
        label: "Vue js",
        key: "VueJs",
        icon: renderIcon(LogoVue),
      },
      {
        label: "React js",
        key: "ReactJs",
        icon: renderIcon(LogoReact),
      },
      {
        label: "Angular js",
        key: "AngularJs",
        icon: renderIcon(LogoAngular),
      }
    ]
  },
  {
    label: "Analystics",
    key: "Analystics",
    icon: renderIcon(AnalyticsSharp),
    children: [
      {
        type: "group",
        label: "Analystics",
        key: "Analystics_group",
        children: [
          {
            label: "Chart columns",
            key: "Analystics-Columns",
            icon: renderIcon(BarChart)
          },
          {
            label: "Chart circles",
            key: "Analystics-Circle",
            icon: renderIcon(PieChart)
          }
        ]
      },
      {
        label: "Analytics, list",
        key: "Analystics-Lists",
        icon: renderIcon(DocumentTextOutline),
        children: [
          {
            label: "List",
            key: "Analystics-List"
          }
        ]
      },
    ]
  }
]);
const profiles = ref([{
  label: 'Profile',
  key: 'profile',
  icon: renderIcon(PersonCircleOutline )
},
{
  label: 'Edit Profile',
  key: 'editProfile',
  icon: renderIcon(Pencil)
},
{
  label: 'Logout',
  key: 'logout',
  icon: renderIcon(LogOutOutline)
}])
watch(switchs, val => {
  if(val){
    navbar.value = false;
    collapsed.value = true;
  }else{
    navbar.value = true;
    collapsed.value = false;
  }
})
watch(switchValue, val => {
  emits('mode' , val)
})
watch(route, val => {
  tabHistory.value = val.matched;
  AOS.init();
})
const UpdateColor = ()=>{
  emits('primaryColor' , models.value.color)
}
const updateMenu = () => {
  router.push({name: activeKey.value})
}
const updatePage = (path, name) =>{
  router.push({path: path})
  router.afterEach(()=>{
    activeKey.value = route.name;
  })
}
const models = ref({
  color: null
});
const colorRule = ref({
  trigger: "change",
})
onMounted(()=>{
  activeKey.value = route.name;
  tabHistory.value = route.matched;
})
router.beforeEach(()=>{

})
</script>

<style scoped>
  .logo{
    transition: all .15s;
    height: 50px; 
    padding: 0 30px; 
    display: flex; 
    align-items: center; 
    gap: 10px;
  }
  .logo .logo_box{
    width: max-content; 
    display: flex; 
    justify-content: start;
    align-items: center;
  }
  .logo.active{
    padding: 0 1rem;
    gap: 10px;
  }
  .logo_text{
    transition: all cubic-bezier(0.4, 0, 0.2, 1) .3s;
    opacity: 1;
    transform: scale(1);
    transform-origin: left;
  }
  .logo.active .logo_text{
    opacity: 0;
    transform: scale(0);
  }
  .page_header_section{
    padding: 0 20px;
  }
  .pages{
    position: relative;
    transition: background cubic-bezier(0.4, 0, 0.2, 1) .2s;
  }
  .pages.light{
    background: rgba(246,249,248, 1)
  }
  .pages .top_left,
  .pages .top_right{
    position: absolute;
    width: 20px;
    height: 20px;
    background: red;
    pointer-events: none;
    top: 0;
    z-index: 1;
    background: rgb(24, 24, 28);
    opacity: 1;
    transition: all cubic-bezier(0.4, 0, 0.2, 1) .2s;
  }
  .pages .top_left{
    left: 0;
  }
  .pages .top_right{
    right: 0;
  }
  .pages .top_left::after,
  .pages .top_right::after{
    position: absolute;
    content: '';
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: rgb(16, 16, 20);
  }
  .pages .top_left::after{
    border-radius: 100% 0 0 0;
  }
  .pages .top_right::after{
    border-radius: 0% 100% 0 0;
  }
  .pages .top_left.light,
  .pages .top_right.light{
    opacity: 0  ;
  }
</style>