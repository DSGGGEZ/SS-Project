<template> 
  <nav class="navbar navbar-expand-lg navbar-light bg-light container" style="margin-top:-70px;">
    <router-link :to="{ name: 'cafes' }" class="navbar-brand" ><h1>Cafes</h1></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item"> 
          <router-link :to="{ name: 'users' }" class ="nav-link">User</router-link>
        </li>
        <router-link :to="{ name: 'comments' }" class ="nav-link">Comments</router-link>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <router-link :to="{ name: 'login' }" class="btn btn-outline-success my-2 my-sm-0" type="submit">Login</router-link>
      </form>
    </div>
  </nav>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
export default {
  name: 'app'
};

</script>
<style scoped>
  body {
  margin: 0;
}

  .header {
  background-color: #f1f1f1;
  padding: 20px;
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
