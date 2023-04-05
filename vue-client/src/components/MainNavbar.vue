<template>
  <div
    class="surface-overlay py-3 px-6 flex align-items-center justify-content-between relative lg:static"
    style="min-height: 80px"
  >
    <img
      src="/Near-BPO-logo.jpg"
      alt="Image"
      height="40"
      class="mr-0 lg:mr-6"
    />
    <DatastaxLogoVue class="mr-0 lg:mr-6"/>
    <a
      v-ripple
      class="cursor-pointer block lg:hidden text-700 p-ripple"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        leaveToClass: 'hidden',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-bars text-4xl"></i>
    </a>
    <div
      class="align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full surface-overlay left-0 top-100 z-1 shadow-2 lg:shadow-none"
    >
      <ul
        class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row"
      >
        <li>
          <a
            v-ripple
            class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
          >
            <i class="pi pi-chart-bar mr-2"></i>
            <span>Readings by sensor</span>
          </a>
        </li>
      </ul>
      <ul
        class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row border-top-1 surface-border lg:border-top-none"
      >
        <li class="border-top-1 surface-border lg:border-top-none">
          <a
            href="https://www.nearbpo.com/"
            v-ripple
            class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
          >
            <img
              src="/Near-BPO-circle.png"
              class="mr-3 lg:mr-1"
              style="width: 32px; height: 32px"
            />
            <div class="block">
              <span class="text-600 font-medium text-sm">More about</span>
              <div class="text-900 font-medium">Near BPO</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DatastaxLogoVue from './DatastaxLogo.vue';


</script>
