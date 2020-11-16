export const listen = (element, eventName, handler) => {
  element.removeEventListener(eventName, handler)
  element.addEventListener(eventName, handler)
}
