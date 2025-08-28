<script setup>
import { ref } from 'vue'
import UserLogin from './components/user/UserLogin.vue'
import UserRegister from './components/user/UserRegister.vue'
import HomePage from './components/HomePage.vue'
import AboutUs from './components/aboutus/AboutUs.vue'
import Mission from './components/aboutus/Mission.vue'
const navItems = [
	{
		name: 'home', label: 'Home', color: '#0f7be0', subs: []
	},
	{
		name: 'about', label: 'About Us', color: '#0f7be0', subs: [
            { name: 'mission', label: 'Mission & Vision', }, 
            { name: 'team', label: 'Our Team & Board',  },
            { name: 'partners', label: 'Our Partners',  },
            { name: 'annual', label: 'Annual Report & Research',  },
        ]
	},
	{
		name: 'login', label: 'Login', color: '#0f7be0', subs: [
            { name: 'register', label: 'Register' }
        ], right: true
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
	if (currentMain.value === 'login' && currentSub.value === 'register') return UserRegister
	if (currentMain.value === 'login') return UserLogin
    if (currentMain.value === 'about' && currentSub.value === 'mission') return Mission
    if (currentMain.value === 'about' && !currentSub.value) return AboutUs
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
				:class="[{active: currentMain === item.name}, item.right ? 'right-nav' : '']"
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

	<footer class="footer bg-light py-1">
		<div class="container mt-2">
			<div class="row">
				<div class="mt-2 col-md-4 col-sm-3 col-3">
					<h4>Helpful Information</h4>
					<ul class="list-unstyled">
						<li><a href="#">FAQ</a></li>
						<li><a href="#">Community Champions</a></li>
						<li><a href="#">Stay in touch</a></li>
					</ul>
				</div>
				<div class="mt-2 col-md-4 col-sm-3 col-3">
					<h4>Talk it through with us</h4>
					<ul class="list-unstyled">
						<li>Call 0422 088 212</li>
						<li><a href="#">Chat Online</a></li>
						<li><a href="#">Email us</a></li>
					</ul>
				</div>
				<div class="mt-2 col-md-4 col-sm-3 col-3">
					<h4>Follow us</h4>
					<ul class="list-inline">
						<li class="list-inline-item"><a href="#">Facebook</a></li>
						<li class="list-inline-item"><a href="#">Twitter</a></li>
						<li class="list-inline-item"><a href="#">LinkedIn</a></li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
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
.right-nav {
	margin-left: auto;
}
/* sub nav */
.sub-nav {
	position: absolute;
	top: 100%;
	left: 0;
    width: 800px;
    display: flex;
	background: #fff;
	min-width: 200px;
	box-shadow: 0 2px 8px rgba(0,0,0,0.08);
	z-index: 10;
	padding: 0;
	margin: 0;
}
.sub-nav li {
    flex: 1;
    text-align: center;
	color: #333;
	background: #f7f7f7;
	padding: 16px 0px;
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