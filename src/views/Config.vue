<template>
  <div class="config-page">
    <div class="row">
      <div class="col col-6 left-side">
        <PositionConfig />
      </div>

      <div class="col col-6">
        <GeneralConfig />
      </div>
    </div>
  </div>
</template>

<script>
import PositionConfig from "../components/PositionConfig";
import GeneralConfig from "../components/GeneralConfig";

export default {
  name: "Config",

  components: {
    PositionConfig,
    GeneralConfig
  }
};
</script>

<style scoped>
.left-side {
  border-right: 1px #ccc solid;
}
</style>
