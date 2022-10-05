<template>
  <div class="container blog-header">
    <h2>Users</h2>
    <form class="form-inline form-search">
      <div v-if="users.length">
        <h4 class="h4">จำนวนผู้ใช้งาน {{ users.length }}</h4>
        <p>
          <button v-on:click="navigateTo('/user/create')" class="btn btn-success">
            Create User
          </button>
        </p>
        <div v-for="user in users" v-bind:key="user.id" class="text-inbox ">
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
            <button v-on:click="navigateTo('/user/edit/' + user.id)" class=" btn bg-warning btn-info btn-lg">
              Edit
            </button>
            <button v-on:click="deleteUser(user)" class ="btn bg-danger btn-info btn-lg ">
              Delete
            </button>
          <hr />
        </div>
        <p><button v-on:click="logout">Logout</button></p>
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
  margin: 20px;
}
.center {
  margin: auto;
  border: 3px solid #73AD21;
  padding: 10px;
}
</style>