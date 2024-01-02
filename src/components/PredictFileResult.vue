<template>
  <!--  pc设备页面-->
  <el-container :style=store.state.view.containerStyle>
    <el-header :style=store.state.view.headerStyle>
      <el-button type="primary" @click="router.push('/predictFile')">返回</el-button>
      <el-button type="primary" @click="showImage">分析结果</el-button>
    </el-header>
    <el-main :style=store.state.view.mainStyle>
      <!--                表格-->
      <el-table v-loading="loading" :data="tableData" :height=store.state.view.tableHeight
                :max-height=store.state.view.tableHeight
                border
      >
        <el-table-column label="正确性">
          <template #default="{ row, $index }">
            <span style="color:#67C23A;" v-if="row.expectation === row.actuality">正确</span>
            <span style="color:#F56C6C;" v-else>错误</span>
          </template>
        </el-table-column>
        <el-table-column label="预期结果" prop="expectation"/>
        <el-table-column label="预测结果" prop="actuality"/>
        <el-table-column label="词组" prop="word"/>
      </el-table>
      <div :style=store.state.view.paginationStyle class="demo-pagination-block">
        <el-pagination
            v-model:current-page="page.currentPage"
            v-model:page-size="page.pageSize"
            :page-sizes="[page.pageSize, 10, 20, 50, 100]"
            :total="page.totalRecords" background
            layout="sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </el-main>
  </el-container>

  <!--                展示详情-->
  <el-dialog
      v-model="dialogVisibleDetail"
      title="预测详情"
  >
    <div id="echarts"/>
  </el-dialog>


</template>


<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue"
import {getData} from "@/request/api"
import {useStore} from "vuex"
import {useRouter} from "vue-router";
import * as echarts from "echarts"
const isSearch = ref(false)
const tableData = ref([])
const loading = ref(true)
const store = useStore()
const router = useRouter();
const dialogVisibleDetail = ref(false)
const isMobile = store.state.view.isMobile
onMounted(() => {
  getAll()
})

//region后端交互
function getAll() {
  loading.value = true
  getData('/getResult', page)
      .then((response) => {
        tableData.value = response.data.list
        page.totalRecords = response.data.totalRecords
      })
      .catch(error => console.log(error))
      .then(() => {
        loading.value = false
      })
}


//endregion
//region分页相关
const page = reactive({
  currentPage: 1,
  //pageSize: isMobile ? 5 : 10,
  pageSize: isMobile ?
      store.state.view.isAdmin ?
          Math.floor(store.state.view.tableContainerHeight / 122.72)
          : Math.floor(store.state.view.tableContainerHeight / 203.72)
      : Math.floor(store.state.view.tableContainerHeight / 49),
  totalRecords: 0
})
const handleSizeChange = (val: number) => {
  loading.value = true
  if (isSearch.value) {
    searchData()
  } else {
    getAll()
  }
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  loading.value = true
  if (isSearch.value) {
    searchData()
  } else {
    getAll()
  }
  console.log(`current page: ${val}`)
}
//endregion
//region预测结果分布表
function showImage(){
  dialogVisibleDetail.value = true
  getData('/statistic', {})
      .then(response => {
        const chartData =
            [
              {value: JSON.parse(response.data)[0], name: '正确'}, {
              value: JSON.parse(response.data)[1], name: '错误'}
            ]
        setTimeout(() => {
          const chart = echarts.init(document.getElementById("echarts"))
          chart.setOption({
            // title: {
            //   text: 'Referer of a Website',
            //   subtext: 'Fake Data',
            //   left: 'center'
            // },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                name: '预测正确性',
                type: 'pie',
                radius: '50%',
                // data: [
                //   { value: 1048, name: '正确' },
                //   { value: 735, name: '错误' },
                // ],
                data: chartData,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        }, 2000)
      })


}

// option = {
//   legend: {
//     top: 'bottom'
//   },
//   toolbox: {
//     show: true,
//     feature: {
//       mark: { show: true },
//       dataView: { show: true, readOnly: false },
//       restore: { show: true },
//       saveAsImage: { show: true }
//     }
//   },
//   series: [
//     {
//       name: 'Nightingale Chart',
//       type: 'pie',
//       radius: [50, 250],
//       center: ['50%', '50%'],
//       roseType: 'area',
//       itemStyle: {
//         borderRadius: 8
//       },
//       data: [
//         { value: 40, name: 'rose 1' },
//         { value: 38, name: 'rose 2' },
//       ]
//     }
//   ]
// };
//endregion
</script>

<style>
#echarts{
  width: 500px;
  height: 500px;
  margin: auto; /* 水平居中 */
  display: flex; /* 使用Flexbox布局 */
  justify-content: center; /* 水平居中内容 */
  align-items: center; /* 垂直居中内容 */
}

</style>
