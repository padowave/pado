<template>
  <div id="master-layout">
    <header>
      <header>
        Vue recipe
      </header>
      <menu>
        <li><router-link to="/main">Main</router-link></li>
        <li><router-link to="/controls">Controls</router-link></li>
        <li><router-link to="/tree">Tree</router-link></li>
        <li><router-link to="/modal">Modal</router-link></li>
        <li><router-link to="/slider">Slider</router-link></li>
        <li><router-link to="/screen">Screen</router-link></li>
        <li><router-link to="/panzoom">Panzoom</router-link></li>
        <li><router-link to="/grid-map">GridMap</router-link></li>
        <li><router-link to="/transform">Transform</router-link></li>
        <li><router-link to="/point">Point</router-link></li>
        <li><router-link to="/rect">Rect</router-link></li>
        <li><router-link to="/line">Line</router-link></li>
        <li><router-link to="/space-block">SpaceBlock</router-link></li>
        <li><router-link to="/wow">WOW</router-link></li>
        <li><router-link to="/tab">Tab</router-link></li>
      </menu>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>
<script>
export default {
  props: {

  }
};
</script>
<style lang="scss">
@import '@/assets/scss/app.scss';
$master-menu-width:140px;
#master-layout {
  > header {
    position:absolute;
    top:0;
    width:$master-menu-width;
    border-right:1px solid gray;
    
    > header {
      margin:10px;
    }
    > menu {
      
      > li {
        display:block;
      }
    }
  }
  > main {
    margin-top :10px;
    margin-left:$master-menu-width + 15px;
  }
}

</style>
