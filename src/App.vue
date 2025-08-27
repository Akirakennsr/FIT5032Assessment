
<script setup>
import { ref } from 'vue'

import UserLogin from './components/UserLogin.vue'
import HomePage from './components/HomePage.vue'

const currentView = ref('home')

function goTo(view) {
	currentView.value = view
}
</script>

<template>
	<nav class="main-nav">
		<ul>
			<li :class="{active: currentView === 'home'}" @click="goTo('home')">Home</li>
			<li :class="{active: currentView === 'login'}" @click="goTo('login')">User Login</li>

		</ul>
	</nav>
	<main>
		<section v-if="currentView === 'home'">
			<HomePage />
		</section>
		<section v-else-if="currentView === 'login'">
			<UserLogin />
		</section>
	</main>
</template>

<style scoped>
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
}
.main-nav li.active, .main-nav li:hover {
	background: #0f7be0;
}
main {
	padding: 32px 16px;
	min-height: 60vh;
}
h1 {
	margin-bottom: 16px;
}
</style>