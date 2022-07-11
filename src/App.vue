<script setup>
import AppDocker from './components/AppDocker.vue'
import { useStore } from 'vuex'
const store = useStore()
store.dispatch('position/getPosition')
window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault()
  })
}
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-fade" mode="out-in" :duration="{ enter: 500, leave: 300 }">
      <component :is="Component" />
    </transition>
  </router-view>
  <AppDocker v-show="$route.meta?.footShow" />
</template>

<style>
body {
  font-size: 16px;
}

a {
  text-decoration: none;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0.3;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
}
</style>
