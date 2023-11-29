<template>
  <div class="app-content content" :class="[{'show-overlay': $store.state.app.shallShowOverlay}, $route.meta.contentClass]">
    
    <div class="content-overlay" />
    
    <div class="header-navbar-shadow" />

    <div class="content-wrapper mt-1" :class="contentWidth === 'boxed' ? 'container p-0' : null" style="min-height:75vh" >
      <slot name="breadcrumb">
        <app-breadcrumb />
      </slot>

      <div class="content-body">
        <transition :name="routerTransition" mode="out-in">
          <keep-alive :exclude="['inicio']">
             <slot />
          </keep-alive>
        </transition>
      </div>

    </div>
  </div>
</template>

<script>
import AppBreadcrumb from '@core/layouts/components/AppBreadcrumb.vue'
import useAppConfig from '@core/app-config/useAppConfig'

export default {
  components: {
    AppBreadcrumb,
  },
  setup() {
    const { routerTransition, contentWidth } = useAppConfig()

    return {
      routerTransition, contentWidth,
    }
  },
}
</script>

<style>

</style>
