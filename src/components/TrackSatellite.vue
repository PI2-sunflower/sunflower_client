<template>
  <div>
    <div class="form-group">
      <label for="satlatitude">Satélite NORAD</label>
      <input type="text" class="form-control" id="NORAD" aria-describedby="NORAD" placeholder="NORAD" v-model="NORAD" :disabled="lockNORAD" />

      <small>Não sabe o NORD do satélite ? Procure em:
        <a href="https://www.n2yo.com/database/" target="BLANK">https://www.n2yo.com/database/</a>
      </small>
    </div>

    <div class="form-group">
      <input id="NORADlock" name="NORADlock" type="checkbox" :checked="lockNORAD" v-model="lockNORAD" /> &nbsp;
      <label for="NORADlock">Lock NORAD</label>
    </div>

    <div>
      <button class="btn btn-primary" v-if="tracking == false" @click="setTracking(true)">Inicial rastreamento</button>
      <button class="btn btn-warning" v-if="tracking == true" @click="setTracking(false)">Parar rastreamento</button>
    </div>

    <hr /> Rastreando ?
    <span class="track-status btn-success" v-if="tracking == true">SIM</span>
    <span class="track-status btn-danger" v-if="tracking == false">NÃO</span>

    <hr />

    <div>
      <p>
        satid:
        <span id='satid'>{{satid}}</span>
      </p>

      <p>
        satname:
        <span id='satname'>{{satname}}</span>
      </p>

      <p>
        satlatitude:
        <span id='satlatitude'>{{satlatitude}}</span>
      </p>

      <p>
        satlongitude:
        <span id='satlongitude'>{{satlongitude}}</span>
      </p>

      <p>
        sataltitude:
        <span id='sataltitude'>{{sataltitude}}</span>
      </p>

      <div id='err-display' style="color:red">{{errDisplay}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrackSatellite",

  data() {
    return {
      NORAD: "25544",
      lockNORAD: true,

      satid: null,
      satname: null,
      satlatitude: null,
      satlongitude: null,
      sataltitude: null,
      errDisplay: null,

      tracking: false
    };
  },

  watch: {
    NORAD() {
      this.setTracking(false);
    }
  },

  destroyed() {
    this.tracking = false;
  },

  methods: {
    async setTracking(state) {
      const old = this.tracking;
      this.tracking = !!state;

      if (this.tracking === false) {
        console.log("STOOOOPPPP!!!");
        let resp = await this.stopTracking();
        console.log(resp);
      } else if (this.tracking && old == false) {
        this.lockNORAD = true;
        await this.startTracking();
        this.fetchSatellite();
      }
    },

    async startTracking() {
      try {
        let response = await fetch(
          `http://127.0.0.1:8000/api/track/${this.NORAD}`
        );
        let data = await response.json();

        return data;
      } catch (err) {
        console.log("Could not start tracking");
        return false;
      }
    },

    async stopTracking() {
      const stoped = await fetch(`http://127.0.0.1:8000/api/stop-track`);
      return stoped;
    },

    async fetchSatellite() {
      if (this.tracking == false) {
        return;
      }

      try {
        let response = await fetch(`http://127.0.0.1:8000/api/track-data`);
        let data = await response.json();

        this.satid = data.satid;
        this.satname = data.info.satname;
        this.satlatitude = data.positions[0].satlatitude;
        this.satlongitude = data.positions[0].satlongitude;
        this.sataltitude = data.positions[0].sataltitude;
        this.errDisplay = "";
      } catch (err) {
        this.errDisplay = "Could not get satellite data";
      }

      window.setTimeout(() => this.fetchSatellite(), 2500);
    }
  }
};
</script>

<style scoped>
.track-status {
  padding: 5px;
}
</style>
