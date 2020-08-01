import { isCanvasNode, isButtonNode } from './utils/types'

const REL_DISTANCE_FROM_BORDER = 0.1


const canvas = document.getElementById('canvas')
let isDrawing = false

if(!isCanvasNode(canvas)) {
  throw new Error('Canvas id belongs to a non-canvas node')
}

const initializeResetButton = (button: HTMLButtonElement, canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')

  button.onclick = (event: UIEvent) => {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    drawGrid(ctx, REL_DISTANCE_FROM_BORDER)
  }
}

const setCanvasDimensions = () => {
  const canvasStyle = getComputedStyle(canvas)
  canvas.width = Number(/\d*/.exec(canvasStyle.width))
  canvas.height = Number(/\d*/.exec(canvasStyle.height))
}

const drawHandler = (ctx: CanvasRenderingContext2D) =>  (e: MouseEvent) => {
  if(!isDrawing) {
    return
  }
  const canvasRect = canvas.getBoundingClientRect()
  const x = Math.round(e.clientX - canvasRect.left)
  const y = Math.round(e.clientY - canvasRect.top)
  ctx.beginPath()
  ctx.arc(x, y, 1, 0, 2 * Math.PI)
  ctx.stroke()
}

// Assumes a square grid
const drawGrid = (ctx: CanvasRenderingContext2D ,relDistanceFromBorder: number) => {
  ctx.fillStyle = 'black'
  const topLeftX = Math.round(relDistanceFromBorder * canvas.width)
  const topLeftY = topLeftX
  const bottomRightX = canvas.width - topLeftX
  const bottomRightY = bottomRightX

  const columnWidth = Number((canvas.width - 2 * topLeftX) / 3)
  ctx.save()
  ctx.lineWidth = 5

  ctx.beginPath()
  ctx.moveTo(topLeftX + columnWidth, topLeftY)
  ctx.lineTo(topLeftX + columnWidth, bottomRightY)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(topLeftX + 2 * columnWidth, topLeftY)
  ctx.lineTo(topLeftX + 2 * columnWidth, bottomRightY)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(topLeftX, topLeftY + columnWidth)
  ctx.lineTo(bottomRightX, topLeftY + columnWidth)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(topLeftX, topLeftY + 2 * columnWidth)
  ctx.lineTo(bottomRightX, topLeftY + 2 * columnWidth)
  ctx.stroke()

  ctx.restore()
}

const initializeCanvasForDrawing = (canvas: HTMLCanvasElement) => {
  setCanvasDimensions()
  const ctx = canvas.getContext('2d')
  
  drawGrid(ctx, REL_DISTANCE_FROM_BORDER)

  window.addEventListener('resize', setCanvasDimensions)
  canvas.addEventListener('mousemove', drawHandler(ctx))
  window.addEventListener('mousedown', () => isDrawing = true)
  window.addEventListener('mouseup', () => isDrawing = false)
}





initializeCanvasForDrawing(canvas)

const resetButton = document.getElementById('resetButton')

if (resetButton && isButtonNode(resetButton)) {
  initializeResetButton(resetButton, canvas)
}



