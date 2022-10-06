<template>
	<div class="container createcafe box">
		<div class="blog-header">
		<div v-for="blog in blogs" v-bind:key="blog.id" class="blog-list">
			<!-- <p>id: {{ blog.id }}</p> -->
			<div class="blog-pic">
				<p class="h1 center">{{blog.title}}</p>
			</div>
		</div>
		<div v-html="blog.content.slice()"></div>
		<div class="blog-info">
			<p><strong>Colortone:</strong> {{ blog.category }}</p>
			<button v-on:click="navigateTo('/blog/edit/' + blog.id)" class="btn btn-success">
				Edit blog
			</button>
			<button v-on:click="navigateTo('/blogs')" class="btn btn-warning">Back</button>
		</div>
		</div>
	</div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import _ from 'lodash'
import 'bootstrap/dist/js/bootstrap.min.js'
import BlogsService from "@/services/BlogsService";
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
			blog: null,
		};
	},
	async created() {
		try {
			let blogId = this.$route.params.blogId;
			this.blog = (await BlogsService.show(blogId)).data;
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
};
</script>
<style scoped>
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
  border: 5px solid gray;

}
</style>
