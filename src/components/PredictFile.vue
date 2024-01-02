<template>
  <!--  pc设备页面-->
  <el-container :style=store.state.view.containerStyle>
    <el-header :style=store.state.view.headerStyle>
      <div style="text-align: center">
        <el-text class="mx-1" size="large">在下方上传需要预测的文件</el-text>
      </div>
    </el-header>
    <el-main :style=store.state.view.mainStyle>
      <el-upload
          class="upload-demo"
          drag
          :action="store.state.requestPath.path + '/predictFile'"
          :on-success="(response) => {
          if(response.code === 200){
             ElMessage.success('上传成功，正在分析')
             router.push('/predictFileResult')
          }else{
            ElMessage.error(response.msg)
          }
          }"
          :limit="1"
          accept=".txt"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖动文件到此处 <em>点击选择文件</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            txt files
          </div>
        </template>
      </el-upload>
    </el-main>
  </el-container>

</template>


<script lang="ts" setup>
import {ref} from "vue"
import {ElMessage} from "element-plus"
import {useStore} from "vuex"
import {UploadFilled} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";

const isSearch = ref(false)
const tableData = ref([])
const loading = ref(true)
const store = useStore()
const router = useRouter();

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
