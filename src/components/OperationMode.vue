<template>
  <fieldset>
    <legend class="col-form-label">Mode de Operação</legend>

    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="operationMode"
        id="operationMode_A"
        value="a"
        :checked="currentOp === 'a'"
        @click="setOperationMode('a')"
      >
      <label
        class="form-check-label"
        for="operationMode_A"
      >A</label>
    </div>

    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="operationMode"
        id="operationMode_B"
        value="b"
        :checked="currentOp === 'b'"
        @click="setOperationMode('b')"
      >
      <label
        class="form-check-label"
        for="operationMode_B"
      >B</label>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'OperationMode',

  props: {
    currentOp: String,
    setOperationMode: Function
  }
}
</script>

<style scoped>

</style>
