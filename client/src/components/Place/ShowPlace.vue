<template>
	<div class="container cafe box">
		<div class="blog-header">
			<!-- <p>id: {{ place.id }}</p> -->
			<div class="blog-pic">
				<p class="h1 center">{{place.placename}}</p>
			</div>
		</div>
		<div v-html="place.content.slice()"></div>
		<div class="blog-info">
			<p><strong>Theme:</strong> {{ place.theme }}</p>
			<p><strong>Status:</strong> {{ place.status }}</p>
			<button v-on:click="navigateTo('/place/edit/' + place.id)" class="btn btn-success">
				Edit Cafe
			</button>
			<button v-on:click="navigateTo('/places')" class="btn btn-warning">Back</button>
		</div>
		</div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import _ from 'lodash'
import 'bootstrap/dist/js/bootstrap.min.js'
import PlaceService from "@/services/PlaceService";

let LOAD_NUM = 3
let pageWatcher
export default {
	watch: {
		search: _.debounce(async function (value) {
			const route = {
				name: 'places'
			}
			if (this.search !== '') {
				route.query = {
					search: this.search
				}
			}
			console.log('search: ' + this.search)
			this.$router.push(route)
		}, 700),
	},
	data() {
		return {
			place: null,
		};
	},
	async created() {
		try {
			let placeId = this.$route.params.placeId;
			this.place = (await PlaceService.show(placeId)).data;
		} catch (error) {
			console.log(error);
		}
	},
	methods: {
		wait(ms) {
			return x => {
				return new Promise(resolve => setTimeout(() => resolve(x), ms));
			};
		},
		appendResults: function () {
			if (this.places.length < this.results.length) {
				let toAppend = this.results.slice(
					this.places.length,
					LOAD_NUM + this.places.length
				)
				this.places = this.places.concat(toAppend)
			}
		},
		navigateTo(route) {
			this.$router.push(route)
		},
		async deletePlace(place) {
			try {
				await PlaceService.delete(place)
				this.refreshData()
			} catch (err) {
				console.log(err)
			}
		},
		async refreshData() {
			this.places = (await PlaceService.index()).data
		},
		setTheme(keyword) {
			if (keyword === ' ') {
				this.search = ''
				console.log('null')
			} else {
				this.search = keyword
			}
		},
	},
	updated() {
		let sens = document.querySelector('#place-list-bottom')
		pageWatcher = ScrollMonitor.create(sens)
		pageWatcher.enterViewport(this.appendResults)
	},
	beforeUpdated() {
		if (pageWatcher) {
			pageWatcher.destroy()
			pageWatcher = null
		}
	}
};
</script>
<style scoped>
.cafe{
	margin: 10px;
	margin-top: 10px;
	margin-left: 100px;
}
.center{
	text-align: center;
	}
.box{
  padding: 10px;
  border: 5px solid gray;

}
</style>
