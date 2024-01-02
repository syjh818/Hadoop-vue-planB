<template>
  <router-view/>
</template>
<script setup>
import {onMounted, onUnmounted} from "vue"
import {useStore} from "vuex"

const store = useStore()

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  store.commit('view/updateHeight', window.innerHeight - 58)
}
</script>

