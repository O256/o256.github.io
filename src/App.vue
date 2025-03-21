<template>
  <div class="app-container">
    <header>
      <div class="left-section" @click="goToHome">
        <img alt="Vue logo" class="logo" src="@/assets/avatar.svg" />
        <span class="username">OLIVER256</span>
      </div>
      <div class="menu-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav :class="{ 'nav-open': isMenuOpen }">
        <RouterLink to="/draw" class="router-link" @click="handleNavClick">
          <img alt="Draw logo" class="draw-logo" src="@/assets/draw.svg" />
          <span>画板</span>
        </RouterLink>
        <RouterLink to="/ball" class="router-link" @click="handleNavClick">
          <img alt="Ball logo" class="ball-logo" src="@/assets/ball.svg" />
          <span>球</span>
        </RouterLink>
        <RouterLink to="/earth" class="router-link" @click="handleNavClick">
          <img alt="Earth logo" class="earth-logo" src="@/assets/earth.svg" />
          <span>地球</span>
        </RouterLink>
        <RouterLink to="/docs" class="router-link" @click="handleNavClick">
          <img alt="Docs logo" class="docs-logo" src="@/assets/docs.svg" />
          <span>笔记</span>
        </RouterLink>
        <a href="https://github.com/O256" target="_blank" class="github-link" @click="handleNavClick">
          <img alt="GitHub logo" class="github-logo" src="@/assets/github.svg" />
          <span>GitHub</span>
        </a>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const goToHome = () => {
  router.push('/')
}

const handleNavClick = (event) => {
  event.stopPropagation()
  isMenuOpen.value = false
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
  border-bottom: 1px solid var(--color-border);
  z-index: 1001;
}

.left-section {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo {
  height: 100%;
  max-height: 28px;
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

nav a {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  text-decoration: none;
  color: var(--color-text);
  width: auto;
  min-width: 80px; /* 增加最小宽度 */
  white-space: nowrap; /* 防止换行 */
}

nav a:first-of-type {
  border: 0;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav .router-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-text);
  width: auto;
  min-width: 80px; /* 增加最小宽度 */
  white-space: nowrap; /* 防止换行 */
}

nav img {
  height: 24px;
  margin-right: 0.5rem;
  filter: var(--icon-filter, none);
}

:root[data-theme="dark"] .draw-logo,
:root[data-theme="dark"] .ball-logo,
:root[data-theme="dark"] .docs-logo,
:root[data-theme="dark"] .github-logo {
  filter: invert(1);
}

main {
  flex: 1;
  padding: 0;
  margin: 0;
  margin-top: 60px;
  width: 100%;
}

@media (max-width: 768px) {
  header {
    padding: 0 1rem;
  }

  .username {
    font-size: 1.2rem;
  }

  .menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 20px;
    cursor: pointer;
    z-index: 1002;
  }

  .menu-toggle span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--color-text);
    transition: all 0.3s ease;
  }

  nav {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: var(--color-background);
    flex-direction: column;
    height: auto;
    padding: 1rem 0;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
    pointer-events: none;
  }

  nav.nav-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  nav a {
    flex: none;
    width: 100%;
    padding: 1rem;
    border-left: none;
    border-bottom: none;
    justify-content: center;
  }

  nav a:not(:last-child) {
    border-bottom: 1px solid var(--color-border);
  }

  .draw-logo,
  .docs-logo,
  .github-logo {
    height: 20px;
    margin-right: 0.75rem;
    display: inline-block;
    filter: var(--icon-filter, none);
  }
}
</style>