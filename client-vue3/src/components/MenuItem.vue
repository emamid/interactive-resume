<template>
	<v-list-item :to="to" :href=href>
		<v-list-item>
			<v-list-item-title v-text="title" />
			<template v-slot:prepend>
				<v-icon v-if="icon">{{icon}}</v-icon>
				<v-img v-if="imageSrc" class="menu-image" :src="imageSrc" height="24px" width="24px" />
			</template>
		</v-list-item>
	</v-list-item>
</template>

<script>

export default {
	name: 'MenuItem',
	data() {
		return {
			isOpen: false
		}
	},
	props: {
		children: Array,
		href: String,
		icon: String,
		imageSrc: String,
		isSubGroup: Boolean,
		title: String,
		to: String
	},
	computed: {
		arrowIcon: function() {
			return this.isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
		}
	},
}
</script>

<style>
	.menu-image {
		margin-right: 32px;
	}
</style>