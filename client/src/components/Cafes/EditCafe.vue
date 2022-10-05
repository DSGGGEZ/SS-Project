<template>
	<div>
		<h1>Edit Cafe</h1>
		<form v-on:submit.prevent="editCafe">
			<p>title: <input type="text" v-model="cafe.cafename" /></p>

			<p><strong>content:</strong></p>
			<p>
				<vue-ckeditor
					v-model.lazy="cafe.content"
					:config="config"
					@blur="onBlur($event)"
					@focus="onFocus($event)"
				/>
			</p>

			<p>Colortone: <input type="text" v-model="cafe.colortone" /></p>
			<p>Status: <input type="text" v-model="cafe.status" /></p>
			<p>
				<button type="submit">update cafe</button>
				<button v-on:click="navigateTo('/cafes')">กลับ</button>
			</p>
		</form>
	</div>
</template>
<script>
import CafeService from "@/services/CafeService";
import VueCkeditor from 'vue-ckeditor2'
export default {
	data() {
		return {
			cafe: {
				cafename: "",
				thumbnail: "null",
				pictures: "null",
				content: "",
				colortone: "",
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
		async editCafe() {
			try {
				await CafeService.put(this.cafe);
				this.$router.push({
					name: "cafes",
				});
			} catch (err) {
				console.log(err);
			}
		},
	},
	async created() {
		try {
			let cafeId = this.$route.params.cafeId;
			this.cafe = (await CafeService.show(cafeId)).data;


			
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
</style>
