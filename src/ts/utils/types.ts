const nodeTypeGuard = <T extends HTMLElement>(nodeName: string) => (element: HTMLElement): element is T =>
  element.nodeName === nodeName.toUpperCase()
export const isCanvasNode = nodeTypeGuard<HTMLCanvasElement>('canvas')

export const isButtonNode = nodeTypeGuard<HTMLButtonElement>('button')
