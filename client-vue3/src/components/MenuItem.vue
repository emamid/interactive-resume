<template>
	<v-list-item :to="to">
		<v-list-item>
			<v-list-item-title v-text="title" />
			<template v-slot:prepend>
				<v-icon v-if="icon">{{icon}}</v-icon>			
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
		icon: String,
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
