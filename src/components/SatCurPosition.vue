<template>
  <table class="table table-striped">
    <tbody>
      <tr>
        <td>Name:</td>
        <td>{{satname}}</td>
      </tr>
      <tr>
        <td>Latidude:</td>
        <td>{{satlatitude}}</td>
      </tr>
      <tr>
        <td>Longitude:</td>
        <td>{{satlongitude}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "SatCurPosition",
  props: {
    satname: String,
    satlatitude: Number,
    satlongitude: Number
  }
};
</script>

<style>
</style>
