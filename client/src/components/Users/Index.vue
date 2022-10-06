<template>
  <div class="container createcafe box">
    <p class="h2">Users</p>
    <form class="form-inline form-search">
      <div v-if="users.length">
        <p class="h4">จำนวนผู้ใช้งาน {{ users.length }}</p>
        <p>
          <button v-on:click="navigateTo('/user/create')" class="btn btn-success pull-left">
            สร้างผู้ใช้งาน
          </button>
          <button v-on:click="logout" class="btn btn-danger pull-right" style="margin-left:910px">Logout</button>
        </p>
        <div v-for="user in users" v-bind:key="user.id" class="text-inbox box">
          <dl class="row">
            <dt class="col-sm-3"> ชื่อ-นามสกุล</dt>
            <dd class="col-sm-9">{{ user.name }} - {{ user.lastname }} </dd>
            <dt class="col-sm-3"> Email</dt>
            <dd class="col-sm-9">{{ user.email }} </dd>
            <dt class="col-sm-3"> Password</dt>
            <dd class="col-sm-9">{{ user.password }} </dd></dl>
            <button v-on:click="navigateTo('/user/' + user.id)" class="btn btn-info btn-lg">
              View
            </button>
            <button v-on:click="navigateTo('/user/edit/' + user.id)" class="btn btn-warning btn-lg">
              Edit
            </button>
            <button v-on:click="deleteUser(user)" class ="btn bg-danger btn-info btn-lg ">
              Delete
            </button>
          <hr />
        </div>
        
      </div>
    </form>
  </div>
</template>
<script >

import UsersService from "@/services/UsersService";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("Want to delete")
      if (result) {
        try {
          await UsersService.delete(user)
          this.refreshData()
        } catch (error) {
          console.log(error)
        }
      }
    },
    async refreshData() {
      this.users = (await UsersService.index()).data
    },
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)

      this.$router.push({
        name: 'login'
      })
    }
  },
};

</script>
<style scoped >
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