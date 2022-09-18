<script setup lang="ts">
import { ref } from "vue";
import Sidebar from './sidebar/Sidebar.vue';
import { vSwipe } from "@/directive";

const showLeftSidebar = ref(false)
const showRightSidebar = ref(false)

const onShowLeftSidebar = () => {
  showRightSidebar.value = false;
  showLeftSidebar.value = true;
}

const onShowRightSidebar = () => {
  showLeftSidebar.value = false;
  showRightSidebar.value = true;
}

const onClose = () => {
  showLeftSidebar.value = false;
  showRightSidebar.value = false;
}
</script>

<template>
  <div class="container">
    <button @click="onShowLeftSidebar">
      Show Left Sidebar
    </button>

    <button @click="onShowRightSidebar">
      Show Right sidebar
    </button>
  </div>


  <Sidebar
      position="left"
      :isPanelOpen="showLeftSidebar"
      v-swipe="{ type: 'left', threshold: 150, onSwipe: onClose }"
  >
    <h2>Left sidebar!</h2>
    <p>Should be close on left swipe</p>
  </Sidebar>

  <Sidebar
      position="right"
      :isPanelOpen="showRightSidebar"
      v-swipe="{ type: 'right', threshold: 150, onSwipe: onClose }"
  >
    <h2>Right sidebar!</h2>
    <p>Should be close on right swipe</p>
  </Sidebar>
</template>

<style lang="scss">
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
}

body {
  margin: 0;
  display: flex;
  flex: 1;
  min-width: 320px;
  min-height: 100vh;
}

#app {
  display: flex;
  flex: 1;
}

.container {
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
}

h2,
p {
  color: white;
}
</style>
