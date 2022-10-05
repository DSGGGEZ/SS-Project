<template>
		<div class="nv-navbar">
			<ul class="nav">
				<li><router-link :to="{ name: 'blogs' }">Blogs</router-link></li>
				<li><router-link :to="{ name: 'cafes' }">Cafes</router-link></li>
				<li><router-link :to="{ name: 'users' }">Users</router-link></li>
				<li><router-link :to="{ name: 'comments' }">Comments</router-link></li>
				<li><router-link :to="{ name: 'login' }">Login</router-link></li>
				<li><router-link :to="{ name: 'blogs' }">Blogs</router-link></li>
			</ul>
			<div class="clearfix" />
		</div>
</template>
<script>
export default {};
</script>
<style scoped>
.nv-navbar {
	background-color: rgb(0, 106, 255);
	width: 110%;
	margin-top: -60px;
	margin-left: -10px;
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
	color: rgb(255, 255, 255);
	font-weight: bold;
}
.nv-navbar .nav li a:hover {
	padding: 10px;
	text-decoration: none;
	color: rgb(0, 0, 0);
}
.nv-navbar .nav li a.router-link-active {
	background-color: rgb(255, 247, 0);
	color: rgb(0, 0, 0);
}
.clearfix {
	clear: left;
}
</style>
