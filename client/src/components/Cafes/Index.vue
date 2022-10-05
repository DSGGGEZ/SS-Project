<template>
	<div>
		<h2>Get all cafes</h2>
		<p><button v-on:click="logout">Logout</button></p>
		<h4>จํานวน cafe {{ cafes.length }}</h4>
		<p><button v-on:click="navigateTo('/cafe/create')">สร้าง Cafe</button></p>
		<div v-for="cafe in cafes" v-bind:key="cafe.id">
			<p>id: {{ cafe.id }}</p>
			<p>title: {{ cafe.cafename }}</p>
			<p>content: {{ cafe.content }}</p>
			<p>category: {{ cafe.theme }}</p>
			<p>status: {{ cafe.status }}</p>
			<p>
				<button v-on:click="navigateTo('/cafe/' + cafe.id)">ดู cafe</button>
				<button v-on:click="navigateTo('/cafe/edit/' + cafe.id)">
					แก้ไข cafe
				</button>
				<button v-on:click="deleteCafe(cafe)">ลบข้อมูล</button>
			</p>
			<hr />
		</div>
	</div>
</template>
<script>
import CafeService from "@/services/CafeService";
export default {
	data() {
		return {
			cafes: [],
		};
	},
	async created() {
		this.cafes = (await CafeService.index()).data;
	},
	methods: {
		logout() {
			this.$store.dispatch("setToken", null);
			this.$store.dispatch("setCafe", null);
			this.$router.push({
				name: "login",
			});
		},
		navigateTo(route) {
			this.$router.push(route);
		},
		async deleteCafe(cafe) {
			let result = confirm("Want to delete?");
			if (result) {
				try {
					await CafeService.delete(cafe);
					this.refreshData();
				} catch (err) {
					console.log(err);
				}
			}
		},
		async refreshData() {
			this.cafes = (await CafeService.index()).data;
		},
	},
};
</script>
<style scoped>
</style>
