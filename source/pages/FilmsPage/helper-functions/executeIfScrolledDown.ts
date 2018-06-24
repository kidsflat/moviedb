type executeIfScrolledDownType = (elem: HTMLElement, cb: Function) => void;
export const executeIfScrolledDown: executeIfScrolledDownType = (elem, cb) => {
  if (elem.scrollTop >= elem.scrollHeight - (elem.offsetHeight + 30)){
    cb()
  }
}