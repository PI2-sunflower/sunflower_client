<template>
  <div id="main-container" class="container">
    <div class="row">
      <nav class="col col-10">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <span class="navbar-brand disabled">Modo: </span>
          </li>

          <li class="nav-item">
            <router-link active-class="active" to="/tracker" class="nav-link">
              <font-awesome-icon icon="globe-americas" />
              Rastreador
            </router-link>
          </li>

          <li class="nav-item">
            <router-link active-class="active" to="/control" class="nav-link">
              <font-awesome-icon icon="gamepad" />
              Controle direto
            </router-link>
          </li>
        </ul>
      </nav>

      <div class="col col-2">
        <router-link to="/config" active-class="active" class="btn btn-outline-primary">
          <font-awesome-icon icon="cog" />
        </router-link>
      </div>
    </div><!-- /row -->

    <hr />

    <router-view />
  </div>
</template>

<style>
.gear-img {
  width: 40px;
}

#main-container {
  margin-top: 10px;
}
</style>
