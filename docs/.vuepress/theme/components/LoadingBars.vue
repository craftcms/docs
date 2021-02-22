<template>
  <div class="loading-bars">
    <div class="bar darker animated"></div>
    <div class="bar animated w-24"></div>
    <div class="bar animated"></div>
    <div class="bar animated"></div>
    <div class="bar animated"></div>
    <div class="bar animated"></div>
  </div>
</template>

<style lang="postcss">
.loading-bars {
  .bar {
    @apply block mb-4;
    background: #e2e8f0;
    height: 13px;

    &.darker {
      background: #bac0ca;
    }

    &.animated {
      @apply relative z-0;

      &::before {
        content: "";
        @apply absolute z-10 block w-full opacity-75;
        height: 13px;
        background: linear-gradient(-90deg, var(--bg-color), transparent);
        background-width: 26px;
        animation-name: slide-left-right;
        animation-duration: 3s;
        animation-iteration-count: infinite;
      }
    }

    &:nth-child(1) { width: 88px; }
    &:nth-child(2) { width: 114px; }
    &:nth-child(2)::before { animation-delay: 0.2s; }
    &:nth-child(3) { width: 108px; }
    &:nth-child(3)::before { animation-delay: 0.3s; }
    &:nth-child(4) { width: 80px; }
    &:nth-child(4)::before { animation-delay: 0.4s; }
    &:nth-child(5) { width: 96px; }
    &:nth-child(5)::before { animation-delay: 0.5s; }
    &:nth-child(6) { width: 100px; }
    &:nth-child(6)::before { animation-delay: 0.6s; }
  }
}

@keyframes slide-left-right {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
}
</style>