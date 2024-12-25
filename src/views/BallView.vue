<template>
    <div class="moving-ball-container">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue';

const speed = 3;
const particleCount = 5;

const canvas = ref(null);

onMounted(() => {
    const ctx = canvas.value.getContext('2d');

    let ball = {
        x: canvas.value.width / 2,
        y: canvas.value.height / 2,
        radius: 10,
        dx: speed,
        dy: speed
    };

    let particles = [];

    function resizeCanvas() {
        // 获取画布的显示尺寸
        const displayWidth = canvas.value.clientWidth;
        const displayHeight = canvas.value.clientHeight;

        // 计算球的相对位置
        const relativeX = ball.x / canvas.value.width;
        const relativeY = ball.y / canvas.value.height;

        // 设置画布的实际尺寸以匹配其显示尺寸
        if (canvas.value.width !== displayWidth || canvas.value.height !== displayHeight) {
            canvas.value.width = displayWidth;
            canvas.value.height = displayHeight;
        }

        // 重新计算球的绝对位置
        ball.x = relativeX * canvas.value.width;
        ball.y = relativeY * canvas.value.height;

        // 清除所有粒子
        particles = [];
    }

    // 初始化时调整画布大小
    resizeCanvas();

    // 监听窗口调整大小事件
    window.addEventListener('resize', resizeCanvas);

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    function updateBallPosition() {
        ball.x += ball.dx; // 移动球，dx 是 x 轴的移动速度
        ball.y += ball.dy;

        // 反弹
        if (ball.x + ball.radius > canvas.value.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
        }
        if (ball.y + ball.radius > canvas.value.height || ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
        }

        // 创建粒子
        createParticles(ball.x - ball.dx, ball.y - ball.dy);
    }

    function createParticles(x, y) {
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: x,
                y: y,
                radius: Math.random() * 5 + speed,
                alpha: 1,
                dx: (Math.random() - 0.5) * speed,
                dy: (Math.random() - 0.5) * speed
            });
        }
    }

    function drawParticles() {
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.beginPath(); // 开始绘制路径
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); // 绘制圆
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`; // 设置填充颜色
            ctx.fill(); // 填充
            ctx.closePath(); // 结束绘制路径

            // 更新粒子位置和透明度
            p.x += p.dx;
            p.y += p.dy;
            p.alpha -= 0.02;

            // 移除不再可见的粒子
            if (p.alpha <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
        drawParticles(); // 先绘制粒子
        drawBall(); // 然后绘制球
        updateBallPosition();
    }

    const intervalId = setInterval(draw, 30);

    onUnmounted(() => {
        clearInterval(intervalId);
        window.removeEventListener('resize', resizeCanvas);
    });
});
</script>

<style scoped>
.moving-ball-container {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 10px;
    width: 100%;
    height: calc(100% - 60px - 10px);
    background-color: green;
}

canvas {
    border: 1px solid black;
    width: 100%;
    height: 100%;
}
</style>