<template>
	<div>
		<h1>Show Cafe</h1>
		<p>id: {{ cafe.id }}</p>
		<p>Cafename: {{ cafe.cafename }}</p>
		<p>content: {{ cafe.content }}</p>
		<p>Colortone: {{ cafe.colortone }}</p>
		<p>status: {{ cafe.status }}</p>
		<p>
			<button v-on:click="navigateTo('/cafe/edit/' + cafe.id)" class="btn btn-success">
				Edit cafe
			</button>
			<button v-on:click="navigateTo('/cafes')" class="btn btn-warning">Back</button>
		</p>
	</div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import CafeService from "@/services/CafeService";
export default {
	data() {
		return {
			cafe: null,
		};
	},
	async created() {
		try {
			let cafeId = this.$route.params.cafeId;
			this.cafe = (await CafeService.show(cafeId)).data;
		} catch (error) {
			console.log(error);
		}
	},
	methods: {
		navigateTo(route) {
			this.$router.push(route);
		},
	},
};
</script>
<style scoped>
</style>
