<template>
  <div id="home-view">
    <h1 class="moving-text" ref="movingText">Hello World</h1>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  mounted() {
    this.moveTextRandomly();
  },
  methods: {
    moveTextRandomly() {
      const textElement = this.$refs.movingText;
      const container = this.$el;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const textWidth = textElement.clientWidth;
      const textHeight = textElement.clientHeight;

      setInterval(() => {
        const randomX = Math.random() * (containerWidth - textWidth);
        const randomY = Math.random() * (containerHeight - textHeight);

        textElement.style.transform = `translate(${randomX}px, ${randomY}px)`;
      }, 2000); // 每秒移动一次
    }
  }
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* 禁止滚动条 */
  height: 100%;
  width: 100%;
}

#home-view {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  position: relative;
  height: 100vh; /* 视口高度 */
  width: 100vw; /* 视口宽度 */
  overflow: hidden;
}

.moving-text {
  position: absolute;
  transition: transform 2s ease;
}
</style>