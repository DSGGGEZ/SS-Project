<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark container header">
    <router-link :to="{ name: 'places' }" class="navbar-brand">
      <h1>Cafe</h1>
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'users' }" class="nav-link">User</router-link>
        </li>
        <router-link :to="{ name: 'comments' }" class="nav-link">Comments</router-link>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <router-link :to="{ name: 'login' }" class="btn btn-outline-success my-2 my-sm-0" type="submit">Login
        </router-link>
        &nbsp;
      </form>
    </div>
  </nav>
</template>


<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
export default {
  name: 'app',
  logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)

      this.$router.push({
        name: 'login'
      })
    }
};

</script>
<style scoped>
body {
  margin: 0;
}

.header {
  background-color: #f1f1f1;
  padding: 20px;
  margin-top: -70px;
  margin-right: 150px;
  margin-left: 100px;
  text-align: center;
}

.nv-navbar {
  background-color: palegoldenrod;
  width: 100%;
  padding: 10px 0px 10px 0px;
}

.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  float: left;
}


.nv-navbar .nav li {
  float: left;
}

.nv-navbar .nav li a {
  padding: 10px;
  text-decoration: none;
  color: grey;
  font-weight: bold;
}

.nv-navbar .nav li a:hover {
  padding: 10px;
  text-decoration: none;
  color: darkslategrey;
}


.nv-navbar .nav li a.router-link-active {
  background-color: gold;
  color: darkslategrey;
}

.clearfix {
  clear: left;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@import'~bootstrap/dist/css/bootstrap.css'
</style>
