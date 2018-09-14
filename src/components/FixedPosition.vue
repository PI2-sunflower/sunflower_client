<template>
  <form>
    <div class="form-group">
      <label for="satlatitude">Latitude</label>
      <input type="text" class="form-control" id="satlatitude" aria-describedby="satlatitude" placeholder="Atlatitude">
    </div>

    <div class="form-group">
      <label for="satlongitude">Longitude</label>
      <input type="text" class="form-control" id="satlongitude" aria-describedby="satlongitude" placeholder="Longitude">
    </div>

    <div class="form-group">
      <label for="sataltitude">Altitude</label>
      <input type="text" class="form-control" id="sataltitude" aria-describedby="sataltitude" placeholder="Altitude">
    </div>

    <a class="btn btn-primary" href="javascript: void()">Enviar</a>
  </form>
</template>

<script>
export default {
  name: "FixedPosition"
};
</script>
