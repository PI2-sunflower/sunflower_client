<template>
  <div
    class="card my-card"
    style="width: 18rem;"
  >
    <div class="card-body">
      <h5 class="card-title">Trava do braço</h5>
      <h6 class="card-subtitle mb-2 text-muted">braço destravado ?</h6>
      <p class="card-text">
        Voce garante que a trava física do braço está destravada ?
      </p>

      <button
        class="btn btn-primary"
        @click="unlockScreen"
      >Sim, está destravado</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnlockCard",

  props: {
    unlockScreen: Function
  }
};
</script>

<style scoped>
</style>
