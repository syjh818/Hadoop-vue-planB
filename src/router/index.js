import {createRouter, createWebHistory} from 'vue-router'
import Layout from "@/Layout.vue"
import PredictWord from "@/components/PredictWord.vue";
import PredictFile from "@/components/PredictFile.vue";
import PredictFileResult from "@/components/PredictFileResult.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '/predictFile',
                    component: PredictFile
                },
                {
                    path: '/predictWord',
                    component: PredictWord
                },
                {
                    path: '/predictFileResult',
                    component: PredictFileResult
                },
            ]
        },


    ]
})

export default router
