<template>
  <el-menu
      ref="menu"
      :collapse="store.state.menu.collapse"
      :router="true"
      :style="{ height: store.state.view.height + 'px', 'min-width': '0' }"
      :unique-opened="true"
      menu-trigger="click"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      text-color="#fff"
      @close="handleClose"
      @open="handleOpen"
  >

    <el-menu-item index="/predictFile">
      <el-icon>
        <Files />
      </el-icon>
      <span>文件预测</span>
    </el-menu-item>
    <el-menu-item index="/predictWord">
      <el-icon>
        <Document />
      </el-icon>
      <span>词组预测</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import {Cellphone, Document, Files, Monitor} from "@element-plus/icons-vue"
import {useStore} from "vuex"
import {ref} from "vue";

const menu = ref()
const activeSubIndex = ref()
const handleOpen = (key: string, keyPath: string[]) => {
  if (activeSubIndex.value === key) {
    menu.value.close(activeSubIndex.value)
    activeSubIndex.value = null
  } else {
    activeSubIndex.value = key
  }
  console.log('handleOpen', key, keyPath)

}
const handleClose = (key: string, keyPath: string[]) => {
  console.log('handleClose', key, keyPath)
}

const store = useStore()
</script>
<style scoped>
.el-menu {
  border: none !important
}
</style>

