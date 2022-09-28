<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  isPanelOpen: boolean;
  position: "left" | "right" | "top" | "bottom";
}>();

const enterLeaveClass = computed(() => {
  const classMap = {
    left: "on-left-slide-leave-to",
    right: "on-right-slide-leave-to",
    top: "on-top-slide-leave-to",
    bottom: "on-bottom-slide-leave-to",
  };
  return classMap[props.position];
});
</script>

<template>
  <div class="sidebar">
    <transition
      name="slide"
      enter-active-class="slide-enter-active"
      :leave-active-class="enterLeaveClass"
    >
      <div v-if="props.isPanelOpen" :class="`sidebar-panel ${props.position}`">
        <slot />
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
.slide-enter-active {
  transition: all 200ms ease-in 0s;
}

.on-left-slide-leave-to,
.on-right-slide-leave-to,
.on-top-slide-leave-to,
.on-bottom-slide-leave-to {
  transition: all 200ms ease-in 0s;
}

.on-left-slide-leave-to {
  transform: translateX(-100%);
}

.on-right-slide-leave-to {
  transform: translateX(100%);
}

.on-top-slide-leave-to {
  transform: translateY(-100%);
}

.on-bottom-slide-leave-to {
  transform: translateY(100%);
}

.sidebar-panel {
  background-color: #130f40;
  position: absolute;
  height: 100vh;
  z-index: 999;
  padding: 2rem;
  box-sizing: border-box;
  width: 50%;

  &.top,
  &.left,
  &.bottom {
    left: 0;
  }

  &.top {
    top: 0;
  }

  &.right {
    right: 0;
  }

  &.bottom {
    bottom: 0;
  }

  &.top,
  &.bottom {
    height: 50%;
    width: 100vw;
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
