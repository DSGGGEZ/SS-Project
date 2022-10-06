<template>
	<div class="container createcafe box">
		<p class="h1">Edit cafe</p>
		<form v-on:submit.prevent="editBlog">
			<label>Title</label>
			<input type="text" v-model="blog.title" />
			<label>Content</label>
			<p>
				<vue-ckeditor
					v-model.lazy="blog.content"
					:config="config"
					@blur="onBlur($event)"
					@focus="onFocus($event)"
				/>
			</p>

			<label>Colortone</label> 
			<input type="text" v-model="blog.category" />
			<label>status</label>
			<input type="text" v-model="blog.status" />
			<p>
				<button type="submit" class="btn btn-success createuser">update blog</button>
				<button v-on:click="navigateTo('/blogs' )" class="btn btn-warning createuser">กลับ</button>
			</p>
		</form>
	</div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
import VueCkeditor from 'vue-ckeditor2'
export default {
	data() {
		return {
			blog: {
				title: "",
				thumbnail: "null",
				pictures: "null",
				content: "",
				category: "",
				status: "",
			},
			config:{
				toolbar: [
					{
						name: "document",
						items: [
							"Source",
							"-",
							"Save",
							"NewPage",
							"Preview",
							"Print",
							"-",
							"Templates",
						],
					},
					{
						name: "clipboard",
						items: [
							"Cut",
							"Copy",
							"Paste",
							"PasteText",
							"PasteFromWord",
							"-",
							"Undo",
							"Redo",
						],
					},
					{
						name: "editing",
						items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"],
					},
					{
						name: "forms",
						items: [
							"Form",
							"Checkbox",
							"Radio",
							"TextField",
							"Textarea",
							"Select",
							"Button",
							"ImageButton",
							"HiddenField",
						],
					},
					"/",
					{
						name: "basicstyles",
						items: [
							"Bold",
							"Italic",
							"Underline",
							"Strike",
							"Subscript",
							"Superscript",
							"-",
							"CopyFormatting",
							"RemoveFormat",
						],
					},
					{
						name: "paragraph",
						items: [
							"NumberedList",
							"BulletedList",
							"-",
							"Outdent",
							"Indent",
							"-",
							"Blockquote",
							"CreateDiv",
							"-",
							"JustifyLeft",
							"JustifyCenter",
							"JustifyRight",
							"JustifyBlock",
							"-",
							"BidiLtr",
							"BidiRtl",
							"Language",
						],
					},
					{ name: "links", items: ["Link", "Unlink", "Anchor"] },
					{
						name: "insert",
						items: [
							"Image",
							"Flash",
							"Table",
							"HorizontalRule",
							"Smiley",
							"SpecialChar",
							"PageBreak",
							"Iframe",
							"InsertPre",
						],
					},
					"/",
					{ name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
					{ name: "colors", items: ["TextColor", "BGColor"] },
					{ name: "tools", items: ["Maximize", "ShowBlocks"] },
					{ name: "about", items: ["About"] },
				],
				height: 300
			}
		};
	},
	methods: {
		async editBlog() {
			try {
				await BlogsService.put(this.blog);
				this.$router.push({
					name: "blogs",
				});
			} catch (err) {
				console.log(err);
			}
		},
	},
	async created() {
		try {
			let blogId = this.$route.params.blogId;
			this.blog = (await BlogsService.show(blogId)).data;


			
		} catch (error) {
			console.log(error);
		}
	},
	components:{
		VueCkeditor
	}
};
</script>
<style scoped>
	.dropbox {
  outline: 2px dashed grey;
  /* the dash box */
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 100px;
  /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0;
  /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: khaki;
  /* when mouse over to the drop zone, change color
    */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}

ul.pictures li {
  float: left;
}

ul.pictures li img {
  max-width: 10px;
  margin-right: 20px;
}

.clearfix {
  clear: both;
}

.thumbnail-pic img {
  width: 200px
}

.box {
  padding: 5px;
  border: 2px solid gray;

}

.cafe {
  margin-top: 10px;
}

.createcafe {
  margin: 10px;
  margin-top: 10px;
  margin-left: 100px;
}

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

label {
  font-size: 20px;
  margin-left: 10px;
}

.createuser {
  margin-top: 20px;
}
</style>
