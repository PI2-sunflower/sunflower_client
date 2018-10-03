<template>
  <div class="row">
    <div class="col col-6">
      <div class="row">
        <div class="col col-12">
          <div class="form-group">
            <label for="ang">Angulo</label>
            <input id="ang" type="number" class="form-control" placeholder="0.0" v-model="angle" />
          </div>

            <div class="form-group">
              <label for="axis">Eixo</label>

              <div class="row">

                <div class="col col-4">
                  <div :class="'axisbox btn ' + (axis == 'A' ? 'active' : '')" @click="setAxis('A')">
                    A
                  </div>
                </div>

                <div class="col col-4">
                  <div :class="'axisbox btn ' + (axis == 'B' ? 'active' : '')" @click="setAxis('B')">
                    B
                  </div>
                </div>

                <div class="col col-4">
                  <div :class="'axisbox btn ' + (axis == 'C' ? 'active' : '')" @click="setAxis('C')">
                    C
                  </div>
                </div>
              </div>
            </div>

            <br />

            <button class="btn btn-primary" @click="dispatchDirection">
              Enviar direções
            </button>
          </div><!-- /col-12 -->

          <div class="col col-12">

            <hr />

            <span>Histórico de comandos</span>

            <ul class="list-group list-group-flush command-list">
              <li v-for="(h, i) in comandsHistory" :key="i" class="list-group-item">
                G a={{h.a}}; e={{h.e}}
              </li>
            </ul>
          </div>
        </div><!-- /row -->
      </div>

      <div class="col col-6">
        <div id="cam-container">
          Video da câmera
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "Control",

  data() {
    return {
      angle: 0,
      axis: "B",
      comandsHistory: [
        { a: 60, e: "A" },
        { a: 33.3, e: "B" },
        { a: -90, e: "C" }
      ]
    };
  },

  methods: {
    setAxis(axis) {
      this.axis = axis;
    },

    dispatchDirection() {
      let command = {
        a: this.angle,
        e: this.axis
      };

      this.comandsHistory.push(command);
    }
  }
};
</script>

<style>
.axisbox {
  width: 80px;
  height: 80px;
  padding: 0px;
  border: solid 1px #000;
}
.axisbox:hover {
  border: solid 1px orange;
}
.axisbox.active {
  border: solid 1px blue;
  background-color: #d4d4d4;
}
.axisbox img {
  width: 80px;
  height: 80px;
}
.command-list {
  max-height: 200px;
  overflow: auto;
}
.command-list li:nth-child(even) {
  background-color: #dee2e6;
}
</style>
