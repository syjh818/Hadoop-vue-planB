<template>
  <el-menu
      :ellipsis="false"
      :router="true"
      active-text-color="#ffd04b"
      background-color="#3c8dbc"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#fff"
      @select="handleSelect"
  >
    <el-menu-item :style="buttonStyle" @click="store.commit('menu/changeCollapse')">
      <template v-if="store.state.menu.collapse === false">
        <span><el-icon><DArrowLeft/></el-icon></span>
      </template>
      <template v-if="store.state.menu.collapse === true">
        <span><el-icon><DArrowRight/></el-icon></span>
      </template>
    </el-menu-item>
    <el-menu-item>
      <span style="font-size: 20px">情感预测</span>
    </el-menu-item>
    <div class="flex-grow"/>
  </el-menu>
</template>

<script lang="ts" setup>
import {ref, watchEffect} from "vue"
import {useStore} from "vuex"
import {DArrowLeft, DArrowRight} from "@element-plus/icons-vue"

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const store = useStore()
const buttonStyle = ref('width: 150px; padding: 0;')
watchEffect(() => {
  if (store.state.menu.collapse === true) {
    buttonStyle.value = 'width: 64px; padding: 0'
  } else {
    buttonStyle.value = 'width: 150px; padding: 0'
  }
})
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.custom-menu .el-menu-item.is-active,
.custom-menu .el-submenu.is-active .el-menu-item {
  color: #fff; /* 设置激活菜单项的文字颜色为 #333 */
}
</style>
