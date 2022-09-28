<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "./sidebar/Sidebar.vue";
import { vSwipe, EventData } from "../directive";

const threshold = 150;
const showLeftSidebar = ref(false);
const showRightSidebar = ref(false);
const showTopSidebar = ref(false);
const showBottomSidebar = ref(false);

const onShowLeftSidebar = () => {
  onClose();
  showLeftSidebar.value = true;
};

const onShowRightSidebar = () => {
  onClose();
  showRightSidebar.value = true;
};

const onClose = () => {
  showLeftSidebar.value = false;
  showRightSidebar.value = false;
  showTopSidebar.value = false;
  showBottomSidebar.value = false;
};

const onShowTopSidebar = ({ dir }: EventData) => {
  if (dir == "down") {
    showTopSidebar.value = true;
  } else {
    showBottomSidebar.value = true;
  }
};
</script>

<template>
  <div
    class="container"
    v-swipe="{ type: 'down', threshold, onSwipe: onShowTopSidebar }"
  >
    <button @click="onShowLeftSidebar">Show Left Sidebar</button>

    <button @click="onShowRightSidebar">Show Right sidebar</button>
  </div>

  <Sidebar
    position="left"
    :isPanelOpen="showLeftSidebar"
    v-swipe="{ type: 'left', threshold, onSwipe: onClose }"
  >
    <h2>Left sidebar!</h2>
    <p>Should be close on left swipe</p>
  </Sidebar>

  <Sidebar
    position="right"
    :isPanelOpen="showRightSidebar"
    v-swipe="{ type: 'right', threshold, onSwipe: onClose }"
  >
    <h2>Right sidebar!</h2>
    <p>Should be close on right swipe</p>
  </Sidebar>

  <Sidebar
    position="top"
    :isPanelOpen="showTopSidebar"
    v-swipe="{ type: 'up', threshold, onSwipe: onClose }"
  >
    <h2>Top sidebar!</h2>
    <p>Should be close on up swipe</p>
  </Sidebar>

  <Sidebar
    position="bottom"
    :isPanelOpen="showBottomSidebar"
    v-swipe="{ type: 'down', threshold, onSwipe: onClose }"
  >
    <h2>Bottom sidebar!</h2>
    <p>Should be close on down swipe</p>
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
