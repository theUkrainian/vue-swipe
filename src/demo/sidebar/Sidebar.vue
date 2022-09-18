<script setup lang="ts">

import {computed} from "vue";

const props = defineProps<{isPanelOpen: boolean, position: 'left' | 'right'}>()

const enterLeaveClass = computed(() => {
  const classMap = {
    'left': 'on-left-slide-leave-to',
    'right': 'on-right-slide-leave-to'
  }
  return classMap[props.position]
})

</script>

<template>
  <div class="sidebar">
    <transition name="slide"  :leave-active-class="enterLeaveClass">
      <div v-if="props.isPanelOpen" :class="`sidebar-panel ${props.position}`">
        <slot/>
        <ul>
          <li>Menu</li>
          <li>Outlets</li>
          <li>Contacts</li>
          <li>Feedback</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.slide-enter-active,
{
  transition: transform 1.2s ease;
}

.on-left-slide-leave-to,
.on-right-slide-leave-to {
  transition: all 150ms ease-in 0s
}

.on-left-slide-leave-to {
  transform: translateX(-100%);
}

.on-right-slide-leave-to {
  transform: translateX(100%);
}

.sidebar-panel {
  background-color: #130f40;
  position: absolute;
  height: 100vh;
  top: 0;
  z-index: 999;
  padding: 3rem 20px 2rem 20px;
  width: 50%;

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }
}

ul {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 36px;

  li {
    color: white;
  }
}
</style>


