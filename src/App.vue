
<script setup>
import { ref } from 'vue'
import UserLogin from './components/UserLogin.vue'
import HomePage from './components/HomePage.vue'


const navItems = [
	{
		name: 'home', label: 'Home', subs: []
	},
	{
		name: 'login', label: 'User Login', subs: []
	},
    {
		name: 'about', label: 'About Us', subs: [
            { name: 'mission', label: 'Mission & Vision' }, 
            { name: 'team', label: 'Our Team & Board' }]
	},
]

const currentMain = ref('home')
const currentSub = ref('')
const hoverNav = ref(null)

function selectMain(name) {
	currentMain.value = name
	currentSub.value = ''
}
function selectSub(main, sub) {
	currentMain.value = main
	currentSub.value = sub
}

function getCurrentComponent() {
	if (currentMain.value === 'home') return HomePage
	if (currentMain.value === 'login') return UserLogin
	if (currentMain.value === 'about') return { template: '<h1>About Us</h1>' }
	return { template: '<h1>Not Found</h1>' }
}
</script>

<template>
	<nav class="main-nav">
		<ul>
			<li
				v-for="item in navItems"
				:key="item.name"
				:style="{background: currentMain === item.name ? item.color : ''}"
				@mouseenter="hoverNav = item.name"
				@mouseleave="hoverNav = null"
				@click="selectMain(item.name)"
				:class="{active: currentMain === item.name}"
			>
				{{ item.label }}
				<!-- sub nav -->
				<ul v-if="item.subs.length && hoverNav === item.name" class="sub-nav">
					<li
						v-for="sub in item.subs"
						:key="sub.name"
						@click.stop="selectSub(item.name, sub.name)"
						:class="{active: currentSub === sub.name && currentMain === item.name}"
					>
						{{ sub.label }}
					</li>
				</ul>
			</li>
		</ul>
	</nav>
	<main>
		<component :is="getCurrentComponent()" />
	</main>
</template>

<style scoped>
/* main nav */
.main-nav {
	background: #18bae7;
	padding: 0 20px;
}
.main-nav ul {
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
}
.main-nav li {
	color: #fff;
	padding: 16px 24px;
	cursor: pointer;
	font-size: 18px;
	transition: background 0.2s;
	position: relative;
	user-select: none;
}
.main-nav li.active, .main-nav li:hover {
	filter: brightness(0.95);
}
/* sub nav */
.sub-nav {
	position: absolute;
	top: 100%;
	left: 0;
	background: #fff;
	min-width: 200px;
	box-shadow: 0 2px 8px rgba(0,0,0,0.08);
	z-index: 10;
	padding: 0;
	margin: 0;
}
.sub-nav li {
	color: #333;
	background: #f7f7f7;
	padding: 12px 24px;
	font-size: 16px;
	cursor: pointer;
	border-bottom: 1px solid #eee;
	transition: background 0.2s;
}
.sub-nav li:last-child {
	border-bottom: none;
}
.sub-nav li.active, .sub-nav li:hover {
	background: #e0f0fa;
	color: #0f7be0;
}
main {
	padding: 32px 16px;
	min-height: 60vh;
}
h1 {
	margin-bottom: 16px;
}
</style>