let shiftX
let shiftY
let moveTarget
const scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);
const scrollWidth = Math.max(
  document.body.scrollWidth, document.documentElement.scrollWidth,
  document.body.offsetWidth, document.documentElement.offsetWidth,
  document.body.clientWidth, document.documentElement.clientWidth
);

document.addEventListener('mousedown', mouseDown)

function mouseDown(event) {
  if (event.target.className != 'hero draggable' && event.target.className != 'draggable') {
    return
  }
  
  const boundingRect = event.target.getBoundingClientRect()
  shiftX = event.clientX - boundingRect.left
  shiftY = event.clientY - boundingRect.top
  moveTarget = event.target
  moveTarget.style.position = 'absolute'
  moveTarget.style.zIndex = 1000

  event.target.ondragstart = function(event) {
    return false
  }

  document.addEventListener('mousemove', moveObject)
  document.addEventListener('mouseup', removeDragEvents)
}

function moveObject(event) {
  console.log(event.pageX, event.pageY)
  
  const boundingRect = moveTarget.getBoundingClientRect()

  if (event.pageX > shiftX && event.pageX < scrollWidth - (boundingRect.width - shiftX)) {
    moveTarget.style.left = event.pageX - shiftX + 'px'
  }

  if (event.pageY > shiftY && event.pageY < scrollHeight - (boundingRect.height - shiftY)) {
    moveTarget.style.top = event.pageY - shiftY + 'px'
  }
  
  if (boundingRect.top < 0) {
    window.scrollBy(0, boundingRect.top)
  } else if (boundingRect.bottom > document.documentElement.clientHeight) {
    window.scrollBy(0, boundingRect.bottom - document.documentElement.clientHeight)
  }

  event.preventDefault()
}

function removeDragEvents(event) {
  document.removeEventListener('mousemove', moveObject)
  document.removeEventListener('mouseup', removeDragEvents)
  moveTarget.ondragstart = null
}