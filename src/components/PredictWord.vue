<template>
  <!--  pc设备页面-->
  <el-container :style=store.state.view.containerStyle>
    <el-header :style=store.state.view.headerStyle>
      <div class="mt-4">
        <el-input
            v-model="inputWord"
            placeholder="请输入需预测的词组，词语间以空格分隔"
            class="input-with-select"
        >
          <template #prepend>
            <el-button :icon="Search" @click="predictWord"/>
          </template>
        </el-input>
      </div>
    </el-header>
    <el-main :style=store.state.view.mainStyle>
      <!--                表格-->
      <el-table v-loading="loading" :data="tableData" :height=store.state.view.tableHeight
                :max-height=store.state.view.tableHeight
                border
      >
        <el-table-column label="预测结果" prop="actuality"/>
        <el-table-column label="词组" prop="word"/>
      </el-table>
    </el-main>
  </el-container>

</template>


<script lang="ts" setup>
import {ref} from "vue"
import {getData} from "@/request/api"
import {useStore} from "vuex"
import {Search} from "@element-plus/icons-vue";

const tableData = ref([])
const loading = ref(false)
const store = useStore()
const isMobile = store.state.view.isMobile
const inputWord = ref()

//region后端交互
function predictWord() {
  loading.value = true
  getData('/predictWord', {
    word: inputWord.value
  })
      .then((response) => {
        tableData.value[0] = response.data
      })
      .catch(error => console.log(error))
      .then(() => {
        loading.value = false
      })
}

//endregion
</script>

<style>
.my-label {
  background: var(--el-color-success-light-9);
}

.my-content {
  background: var(--el-color-danger-light-9);
}

.scan-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
}

.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.scan-video {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
