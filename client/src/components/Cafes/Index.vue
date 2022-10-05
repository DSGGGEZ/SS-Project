<template>
	<div class="container">
		<div class="cafe-header">
			<h2>Cafe</h2>
			<div>
				<form class="form-inline form-search">
					<div class="form-group">
						<div class="input-group">
							<input type="text" v-model="search" class="form-control" id="exampleInputAmount"
								placeholder="Search">
							<div class="input-group-addon"><i class="fas fa-search"></i></div>
						</div>
					</div>
				</form>
			</div>
			<div class="create-cafe">
				<button class="btn btn-success btn-sm" v-on:click="navigateTo('/cafe/create')">Create cafe</button>
				<strong> cafe number: </strong> {{results.length}}
			</div>
			<ul class="colortones">
				<li v-for="cafe in colortone" v-bind:key="cafe.index"><a v-on:click.prevent="setColortone(cafe)"
						href="#">{{ cafe }}</a></li>
				<li class="clear"><a v-on:click.prevent="setColortone(' ')" href="#">Clear</a></li>
			</ul>
			<div class="clearfix"></div>
		</div>
		<transition-group name="fade">
			<div v-for="cafe in cafes" v-bind:key="cafe.id" class="cafe-list">
				<!-- <p>id: {{ cafe.id }}</p> -->
				<div class="cafe-pic">
					<!-- <transition name="fade"> -->
					<div class="thumbnail-pic" v-if="cafe.thumbnail != 'null'">
						<img :src="BASE_URL+cafe.thumbnail" alt="thumbnail">
					</div>
					<!-- </transition> -->
				</div>
				<h3>{{ cafe.cafename }}</h3>
				<div v-html="cafe.content.slice(0,200) + '...'"></div>
				<div class="cafe-info">
					<p><strong>Colortone:</strong> {{ cafe.colortone }}</p>
					<p><strong>Create:</strong> {{ cafe.createdAt }}</p>
					<!-- <p>status: {{ cafe.status }}</p> -->
					<p>
						<button class="btn btn-sm btn-info" v-on:click="navigateTo('/cafe/'+ cafe.id)">View
							Cafe</button>
						<button class="btn btn-sm btn-warning" v-on:click="navigateTo('/cafe/edit/'+ cafe.id)">Edit
							cafe</button>
						<button class="btn btn-sm btn-danger" v-n:click="deleteCafe(cafe)">Delete</button>
					</p>
				</div>
				<div class="clearfix"></div>
			</div>
		</transition-group>
		<div v-if="cafes.length === 0 && loading === false" class="empty-cafe">
			*** Nodata ***
		</div>
		<div id="cafe-list-bottom">
			<div class="cafe-load-finished" v-if="cafes.length === 
			results.length && results.length > 0">โหลดข้อมูลครบแล้ว</div>
		</div>
	</div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import CafeService from '@/services/CafeService'
import _ from 'lodash'
import ScrollMonitor from 'scrollMonitor'
let LOAD_NUM = 3
let pageWatcher
export default {
	watch: {
		search: _.debounce(async function (value) {
			const route = {
				name: 'cafes'
			}
			if (this.search !== '') {
				route.query = {
					search: this.search
				}
			}
			console.log('search: ' + this.search)
			this.$router.push(route)
		}, 700),
		'$route.query.search': {
			immediate: true,
			async handler(value) {
				this.cafes = []
				this.results = []
				this.loading = true
				this.results = (await CafeService.index(value)).data
				this.appendResults()
				this.results.forEach(cafe => {
					if (this.colortone.length > 0) {
						console.log(this.colortone.indexOf(cafe.colortone))
						if (this.colortone.indexOf(cafe.colortone) === -1) {
							this.colortone.push(cafe.colortone)
						}
					} else {

						this.colortone.push(cafe.colortone)
					}
				})
				this.loading = false
				this.search = value
				console.log(this.colortone)
			}
		}
	},
	data() {
		return {
			cafes: [],
			BASE_URL: "http://localhost:8081/assets/uploads/",
			search: '',
			results: [],
			colortone: [],
			loading: false,
		}
	},
	async created() {
		this.cafes = (await CafeService.index()).data
	},
	methods: {
		wait(ms) {
			return x => {
				return new Promise(resolve => setTimeout(() => resolve(x), ms));
			};
		},
		appendResults: function () {
			if (this.cafes.length < this.results.length) {
				let toAppend = this.results.slice(
					this.cafes.length,
					LOAD_NUM + this.cafes.length
				)
				this.cafes = this.cafes.concat(toAppend)
			}
		},
		navigateTo(route) {
			this.$router.push(route)
		},
		async deleteCafe(cafe) {
			try {
				await CafeService.delete(cafe)
				this.refreshData()
			} catch (err) {
				console.log(err)
			}
		},
		async refreshData() {
			this.cafes = (await CafeService.index()).data
		},
		setColortone(keyword) {
			if (keyword === ' ') {
				this.search = ''
				console.log('null')
			} else {
				this.search = keyword
			}
		},
	},
	updated() {
		let sens = document.querySelector('#cafe-list-bottom')
		pageWatcher = ScrollMonitor.create(sens)
		pageWatcher.enterViewport(this.appendResults)
	},
	beforeUpdated() {
		if (pageWatcher) {
			pageWatcher.destroy()
			pageWatcher = null
		}
	}
}
</script>
<style scoped>
.empty-cafe {
	width: 100%;
	text-align: center;
	padding: 10px;
	background: darksalmon;
	color: white;
}

/* thumbnail */
.thumbnail-pic img {
	width: 200px;
	padding: 5px 10px 0px 0px;
}

.cafe-info {
	float: left;
}

.cafe-pic {
	float: left;
}

.clearfix {
	clear: both;
}

.cafe-list {
	border: solid 1px #dfdfdf;
	margin-bottom: 10px;
	margin-left: auto;
	margin-right: auto;
	padding: 5px;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
}

.cafe-header {
	margin-left: auto;
	margin-right: auto;
}

#cafe-list-bottom {
	padding-top: 4px;
}

.cafe-load-finished {
	padding: 4px;
	text-align: center;
	background: seagreen;
	color: white;
}

.colortones {
	margin-top: 10px;
	padding: 0;
	list-style: none;
	float: left;
}

.colortones li {
	float: left;
	padding: 2px;
}

.colortones li a {
	padding: 5px 10px 5px 10px;
	background: paleturquoise;
	color: black;
	text-decoration: none;
}

.colortones li.clear a {
	background: tomato;
	color: white
}

.create-cafe {
	margin-top: 10px;
}
</style>