<template>
  <div class="config-page">
    <div class="row">
      <div class="col col-6">
        <PositionConfig />
      </div>
    </div>
  </div>
</template>

<script>
import PositionConfig from "../components/PositionConfig";

export default {
  name: "Config",

  components: {
    PositionConfig
  }
};
</script>

<style scoped>
</style>
