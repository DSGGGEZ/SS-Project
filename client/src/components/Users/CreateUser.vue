<template>
    <div class="container createcafe box">
        <div class="blog-header">
            <h1>Create User</h1>
            <form v-on:submit.prevent="createUser" action="/action_page.php">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your Name" v-model="user.name">
                <label for="lastname">Lastname</label>
                <input type="text" id="lname" name="lname" placeholder="Your Lastname" v-model="user.lastname">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" placeholder="Your Email" v-model="user.email">
                <label for="password">Password</label>
                <input type="password" v-model="user.password" id="Pw" name="Password" placeholder="Your password" />
                <button type="submit" class="btn btn-success createuser">create user</button>
            </form>
        </div>
    </div>

</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import UsersService from '@/services/UsersService'
export default {
    data() {
        return {
            user: {
                name: '',
                lastname: '',
                email: '',
                password: '',
                status: 'active'
            }
        }
    },
    methods: {
        async createUser() {
            try {
                await UsersService.post(this.user)
                this.$router.push({
                    name: 'users'
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
<style scoped>
input[type=text],
select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type=password],
select {
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

.createcafe {
    margin: 10px;
    margin-top: 10px;
    margin-left: 100px;
}

.center {
    text-align: center;
}

.box {
    padding: 10px;
}

.createuser {
    margin-top: 20px;
}

label {
    font-size: 20px;
}
</style>