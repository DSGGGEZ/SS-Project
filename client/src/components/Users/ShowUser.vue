<template>
  <div class="container createcafe box text-inbox">
    <p class="h2">{{ user.name}}</p>
    <form class="form-inline form-search">
          <dl class="row">
            <dt class="col-sm-3"> User ID</dt>
            <dd class="col-sm-9">{{ user.id }}</dd>
            <dt class="col-sm-3"> Name - Lastname</dt>
            <dd class="col-sm-9">{{ user.name }} - {{ user.lastname }} </dd>
            <dt class="col-sm-3"> Email</dt>
            <dd class="col-sm-9">{{ user.email }} </dd>
            <dt class="col-sm-3"> Password</dt>
            <dd class="col-sm-9">{{ user.password }} </dd></dl>
    
          </form>
          <button v-on:click="navigateTo('/Users')" class="btn btn-warning">Back</button>
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import UserService from "@/services/UsersService";
export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      let userId = this.$route.params.userId;
      this.user = (await UserService.show(userId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
			this.$router.push(route)
		}
  }
};
</script>
<style scoped>
  .bd-teal-100 {
  color: #212529;
  background-color: #afecda; }
.text-inbox{  
  border: 5px solid lightblue;
  padding: 50px;
}
.createcafe{
	margin: 10px;
	margin-top: 10px;
	margin-left: 100px;
}
.center{
	text-align: center;
	}
.box{
  padding: 10px;
}
</style>