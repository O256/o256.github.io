<template>
    <div class="drawing-board-container">
      <div class="tools">
        <div class="color-picker">
          <input type="color" v-model="strokeStyle" />
        </div>
        <div class="line-width">
          <input 
            type="range" 
            v-model="lineWidth" 
            min="1" 
            max="20" 
          />
        </div>
        <button @click="clearCanvas">清空画板</button>
      </div>
      
      <canvas
        ref="canvasRef"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="stopDrawing"
        @touchcancel="stopDrawing"
      ></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const canvasRef = ref(null)
  const isDrawing = ref(false)
  const strokeStyle = ref('#FF4B4B')
  const lineWidth = ref(5)
  let ctx = null
  
  // 上一次绘制位置
  let lastX = 0
  let lastY = 0
  
  onMounted(() => {
    const canvas = canvasRef.value
    ctx = canvas.getContext('2d')
    
    // 设置画布大小
    resizeCanvas()
    // 监听窗口大小变化
    window.addEventListener('resize', resizeCanvas)
  })
  
  // 调整画布大小
  const resizeCanvas = () => {
    const canvas = canvasRef.value
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  
  // 开始绘制
  const startDrawing = (e) => {
    // 只响应鼠标左键
    if (e.button !== 0) return
    
    isDrawing.value = true
    const rect = canvasRef.value.getBoundingClientRect()
    lastX = e.clientX - rect.left
    lastY = e.clientY - rect.top
  }
  
  // 绘制过程
  const draw = (e) => {
    if (!isDrawing.value) return
  
    const rect = canvasRef.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
  
    ctx.beginPath()
    ctx.strokeStyle = strokeStyle.value
    ctx.lineWidth = lineWidth.value
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(x, y)
    ctx.stroke()
  
    lastX = x
    lastY = y
  }
  
  // 停止绘制
  const stopDrawing = () => {
    isDrawing.value = false
  }
  
  // 清空画布
  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  }
  
  // 处理触摸开始
  const handleTouchStart = (e) => {
    e.preventDefault() // 阻止默认行为，防止滚动
    isDrawing.value = true
    const touch = e.touches[0]
    const rect = canvasRef.value.getBoundingClientRect()
    lastX = touch.clientX - rect.left
    lastY = touch.clientY - rect.top
  }
  
  // 处理触摸移动
  const handleTouchMove = (e) => {
    e.preventDefault()
    if (!isDrawing.value) return
  
    const touch = e.touches[0]
    const rect = canvasRef.value.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
  
    ctx.beginPath()
    ctx.strokeStyle = strokeStyle.value
    ctx.lineWidth = lineWidth.value
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(x, y)
    ctx.stroke()
  
    lastX = x
    lastY = y
  }
  </script>
  
  <style scoped>
  .drawing-board-container {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 10px;
    width: 100%;
    height: calc(100% - 60px - 10px);
  }
  
  .tools {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    background-color: rgba(122, 122, 122, 0.9);
    padding: 10px;
    display: flex;
    gap: 20px;
    align-items: center;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgb(82, 32, 3);
  }
  
  canvas {
    width: 100%;
    height: 100%;
    border: 1px solid #868686;
    cursor: crosshair;
  }
  </style> 