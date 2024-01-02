<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header" style="height: 58px">
        <Header/>
      </el-header>
      <el-container :style="{ height: store.state.view.height + 'px' }">
        <el-aside :style="asideStyle">
          <SideBar/>
        </el-aside>
        <el-main :style="mainStyle">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {useStore} from "vuex"
import {ref, watchEffect} from "vue"

import Header from "@/Header.vue"
import SideBar from "@/SideBar.vue"

const store = useStore()
const asideStyle = ref('width: 150px; padding: 0; height: 100%')
const mainStyle = ref('width: calc(100% - 150px); padding: 0 height: 100%')
watchEffect(() => {
  if (store.state.menu.collapse === true) {
    asideStyle.value = 'width: 64px; padding: 0; height: 100%'
    mainStyle.value = 'width: calc(100% - 64px); padding: 0; height: 100%'
  } else {
    asideStyle.value = 'width: 150px; padding: 0; height: 100%'
    mainStyle.value = 'width: calc(100% - 150px); padding: 0; height: 100%'
  }
})
</script>

<style scoped>
.header {
  padding: 0
}
</style>
