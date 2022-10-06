<template>
 <div class="container createcafe box">
		<div class="blog-header">
    <p class="h2 button">User Login</p>
    <form v-on:submit.prevent="onLogin" action="/action_page.php">
      <label for="email">Email</label>
       <input type="text" id="email" name="email" placeholder="Your Email" v-model="email" />
       <label for="password">Password</label>
       <input type="password" v-model="password"  id="Pw" name="Password" placeholder="Enter your password"/>
      <button type="submit" class ="btn btn-success createuser">Login</button>
      <div class="error" v-if="error">{{error}}</div>
    </form>
  </div>
 </div>
</template>
<script>
  import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import AuthenService from "@/services/AuthenService";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.$router.push({
          name: 'users'
        })

      } catch (error) {
        console.log(error);
        this.error = error.response.data.error
        this.email = ''
        this.password = ''
      }
    },
  }
};
</script>
<style scoped>
  input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
input[type=password], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
  .error{
    color:red;
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
.createuser{
    margin-top: 20px;
}
.button{
  margin-bottom: 25px;
}
label{
  font-size: 20px;
}
</style>
