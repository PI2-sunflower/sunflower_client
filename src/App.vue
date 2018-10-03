<template>
  <div id="main-container" class="container">
    <div class="row">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <span class="nav-link disabled">Modo: </span>
        </li>

        <li class="nav-item">
          <router-link active-class="active" to="/tracker" class="nav-link">Rastreador</router-link>
        </li>

        <li class="nav-item">
          <router-link active-class="active" to="/control" class="nav-link">Controle direto</router-link>
        </li>
      </ul>

    </div>

    <hr />

    <router-view />
  </div>
</template>

<style>
#main-container {
  margin-top: 10px;
}
</style>
