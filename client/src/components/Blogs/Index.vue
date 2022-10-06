<template>
	<div class="container createcafe">
		<div class="blog-header">
			<p class="h1">Cafe Phitsanulok</p>
			<div>
				<form class="form-inline form-search">
					<div class="form-group">
						<div class="input-group">
							<div class="input-group-addon"><i class="fas fa-search"></i></div>
						</div>
					</div>
				</form>
			</div>
				<div class="create-blog ">
				<button class="btn btn-success btn-sm sizetext" v-on:click="navigateTo('/blog/create')"><p class="h5">Create Cafe</p></button>
				<strong><p class="h6" >Cafe list:  {{results.length}}</p></strong>
			</div>
		</div>
		<transition-group name="fade">
			<div v-for="blog in blogs" v-bind:key="blog.id" class="blog-list box cafe">
				<!-- <p>id: {{ blog.id }}</p> -->
				<div class="blog-pic">
					<!-- <transition name="fade"> -->
					<div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
						<img :src="BASE_URL+blog.thumbnail" alt="thumbnail">
					</div>
					<!-- </transition> -->
				</div>
				<h3>{{ blog.title }}</h3>
				<div v-html="blog.content.slice(0,200) + '...'"></div>
				<div class="blog-info">
					<p><strong>Colortone:</strong> {{ blog.category }}</p>
					<p><strong>Create:</strong> {{ blog.createdAt }}</p>
					<!-- <p>status: {{ blog.status }}</p> -->
					<p>
						<button class="btn btn-sm btn-info" v-on:click="navigateTo('/blog/'+ blog.id)">View
							Blog</button>
						<button class="btn btn-sm btn-warning" v-on:click="navigateTo('/blog/edit/'+ blog.id)">Edit
							blog</button>
						<button class="btn btn-sm btn-danger" v-on:click="deleteBlog(blog)">Delete</button>
					</p>
				</div>
				<div class="clearfix"></div>
			</div>
		</transition-group>
		<div v-if="blogs.length === 0 && loading === false" class="empty-blog">
			*** Nodata ***
		</div>
		<div id="blog-list-bottom">
			<div class="blog-load-finished" v-if="blogs.length === 
			results.length && results.length > 0">.The cafe information is complete.</div>
		</div>
	</div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import BlogsService from '@/services/BlogsService'
import _ from 'lodash'
import ScrollMonitor from 'scrollMonitor'
import Blog from '../../../../server/src/models/Blog'
let LOAD_NUM = 3
let pageWatcher
export default {
	watch: {
		search: _.debounce(async function (value) {
			const route = {
				name: 'blogs'
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
				this.blogs = []
				this.results = []
				this.loading = true
				this.results = (await BlogsService.index(value)).data
				this.appendResults()
				this.results.forEach(blog => {
					if (this.category.length > 0) {
						console.log(this.category.indexOf(blog.category))
						if (this.category.indexOf(blog.category) === -1) {
							this.category.push(blog.category)
						}
					} else {

						this.category.push(blog.category)
					}
				})
				this.loading = false
				this.search = value
				console.log(this.category)
			}
		}
	},
	data() {
		return {
			blogs: [],
			BASE_URL: "http://localhost:8081/assets/uploads/",
			search: '',
			results: [],
			category: [],
			loading: false,
		}
	},
	async created() {
		this.blogs = (await BlogsService.index()).data
	},
	methods: {
		wait(ms) {
			return x => {
				return new Promise(resolve => setTimeout(() => resolve(x), ms));
			};
		},
		appendResults: function () {
			if (this.blogs.length < this.results.length) {
				let toAppend = this.results.slice(
					this.blogs.length,
					LOAD_NUM + this.blogs.length
				)
				this.blogs = this.blogs.concat(toAppend)
			}
		},
		navigateTo(route) {
			this.$router.push(route)
		},
		async deleteBlog(blog) {
			try {
				await BlogsService.delete(blog)
				this.refreshData()
			} catch (err) {
				console.log(err)
			}
		},
		async refreshData() {
			this.blogs = (await BlogsService.index()).data
		},
		setCategory(keyword) {
			if (keyword === ' ') {
				this.search = ''
				console.log('null')
			} else {
				this.search = keyword
			}
		},
		async deleteBlog(blog) {
			let result = confirm("Want to delete?");
			if (result) {
				try {
					await BlogsService.delete(blog);
					this.refreshData();
				} catch (err) {
					console.log(err);
				}
			}
		},
	updated() {
		let sens = document.querySelector('#blog-list-bottom')
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
}
</script>
<style scoped>
.empty-blog {
	width: 100%;
	text-align: center;
	padding: 10px;
	background: darksalmon;
	color: white;
}
.h6{
	margin-top: 10px;
	margin-bottom: 5px;
}

/* thumbnail */
.thumbnail-pic img {
	width: 200px;
	padding: 5px 10px 0px 0px;
}
.createcafe{
	margin: 10px;
	margin-top: 10px;
	margin-left: 100px;
}
.blog-info {
	float: left;
}

.blog-pic {
	float: left;
}

.clearfix {
	clear: both;
}

.blog-list {
	border: solid 1px #dfdfdf;
	margin-bottom: 10px;
	margin-left: auto;
	margin-right: auto;
	padding: 5px;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
}

.blog-header {
	margin-left: auto;
	margin-right: auto;
}

#blog-list-bottom {
	padding-top: 4px;
}

.blog-load-finished {
	padding: 4px;
	text-align: center;
	background: seagreen;
	color: white;
}

.categories {
	margin-top: 10px;
	padding: 0;
	list-style: none;
	float: left;
}

.categories li {
	float: left;
	padding: 2px;
}

.categories li a {
	padding: 5px 10px 5px 10px;
	background: paleturquoise;
	color: black;
	text-decoration: none;
}

.categories li.clear a {
	background: tomato;
	color: white
}

.create-blog {
	margin-top: 10px;
}
.box{
  padding: 5px;
  border: 2px solid gray;

}
.cafe{
	margin-top: 10px;
}
</style>