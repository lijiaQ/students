<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

:root {
  --themeColor: #3573da;
}

body {
  color: #4a4a4a;
}

a {
  text-decoration: none;
  color: #4a4a4a;
}
</style>
