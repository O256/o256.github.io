<template>
  <div class="app-container">
    <header>
      <div class="left-section" @click="goToHome">
        <img alt="Vue logo" class="logo" src="@/assets/avatar.png" />
        <span class="username">Oliver256</span>
      </div>
      <nav>
        <RouterLink to="/docs">文档</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.app-container {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  /* Ensure app-container takes the full width */
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  /* Ensure header takes the full width */
  border-bottom: 1px solid var(--color-border);
}

.left-section {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo {
  height: 100%;
  max-height: 40px;
  margin-right: 1rem;
}

.username {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text);
}

nav {
  display: flex;
  align-items: center;
  height: 100%;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-flex;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

main {
  flex: 1;
  padding: 0;
  margin: 0;
  margin-top: 60px;
  width: 100%;
  /* Ensure main takes the full width */
}

@media (min-width: 1024px) {
  header {
    padding: 0 4rem;
  }

  nav {
    font-size: 1rem;
  }
}
</style>