import { isCanvasNode, isButtonNode } from './utils/types.js'

const initializeResetButton = (button: HTMLButtonElement, canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')

  button.onclick = (event) => {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}


const initializeCanvasForDrawing = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width / 2, canvas.height /2)
}


console.log('beginning to draw!')

const canvas = document.getElementById('canvas')

if(!isCanvasNode(canvas)) {
  console.log('canvas: ', canvas)
  console.log('name: ', canvas.nodeName)
  throw new Error('Canvas id belongs to a non-canvas node')
}

initializeCanvasForDrawing(canvas)

const resetButton = document.getElementById('resetButton')

if (resetButton && isButtonNode(resetButton)) {
  initializeResetButton(resetButton, canvas)
}



