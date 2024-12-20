<template>
  <div id="home-view" @click="moveTextToClick">
    <img class="moving-img" ref="movingText" src="@/assets/avatar.png" alt="Avatar">
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  mounted() {
    this.centerText();
  },
  methods: {
    centerText() {
      const textElement = this.$refs.movingText;
      const container = this.$el;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const textWidth = textElement.clientWidth;
      const textHeight = textElement.clientHeight;

      const centerX = (containerWidth - textWidth) / 2;
      const centerY = (containerHeight - textHeight) / 2;

      textElement.style.left = `${centerX}px`;
      textElement.style.top = `${centerY}px`;
    },
    moveTextToClick(event) {
      const textElement = this.$refs.movingText;
      const textWidth = textElement.clientWidth;
      const textHeight = textElement.clientHeight;

      const targetX = event.clientX - textWidth / 2;
      const targetY = event.clientY - 60 - textHeight / 2;

      textElement.style.left = `${targetX}px`;
      textElement.style.top = `${targetY}px`;
    }
  }
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* Disable scrollbars */
  height: 100%;
  width: 100%;
}

#home-view {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  position: relative;
  height: 100vh; /* Viewport height */
  width: 100vw; /* Viewport width */
  overflow: hidden;
}

.moving-img {
  width: 40px;
  height: 40px;
  position: absolute;
  transition: left 1s ease-in-out, top 1s ease-in-out; /* Smooth transition */
  left: 0;
  top: 0;
}
</style>