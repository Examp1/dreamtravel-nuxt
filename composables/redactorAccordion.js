import { ref, watch } from 'vue'

export default function useTextAccordion(contentZoneRef) {
  const accordMode = ref(false)
  const accordShow = ref(false)

  // Методы для анимации
  const slideDown = (target, duration = 200) => {
    target.style.removeProperty('display')
    let display = window.getComputedStyle(target).display
    if (display === 'none') display = 'block'
    target.style.display = display
    let height = target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    target.offsetHeight
    target.style.boxSizing = 'border-box'
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = height + 'px'
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    window.setTimeout(() => {
      target.style.removeProperty('height')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
    }, duration)
  }

  const slideUp = (target, duration = 200) => {
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.boxSizing = 'border-box'
    target.style.height = target.offsetHeight + 'px'
    target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    window.setTimeout(() => {
      target.style.display = 'none'
      target.style.removeProperty('height')
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top')
      target.style.removeProperty('margin-bottom')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
    }, duration)
  }

  // Наблюдаем за изменением accordShow
  watch(accordShow, (newValue) => {
    switch (newValue) {
      case true:
        if (accordMode.value)
          slideDown(document.querySelector('.toggleBtn.close'))
        slideUp(document.querySelector('.toggleBtn.open'))
        break
      case false:
        slideUp(document.querySelector('.toggleBtn.close'))
        slideDown(document.querySelector('.toggleBtn.open'))
        break
    }
  })

  const onAnkerClick = (e) => {
    if (!accordShow.value) {
      let el = document.getElementById(e)
      if (el?.closest('.hideDiv')) {
        accordToggleText()
      }
    }
  }

  const accordToggleText = () => {
    const items = contentZoneRef.value?.querySelectorAll('.hideDiv') || []
    if (accordShow.value === false) {
      items.forEach((item) => slideDown(item))
      accordShow.value = true
    } else {
      items.forEach((item) => slideUp(item))
      accordShow.value = false
    }
  }

  const nextAll = (element) => {
    const nextElements = []
    let nextElement = element

    while (nextElement?.nextElementSibling) {
      nextElements.push(nextElement.nextElementSibling)
      nextElement = nextElement.nextElementSibling
    }

    return nextElements
  }

  const insertSlideUpBtn = (el) => {
    const secondToggleBtn = document.createElement('button')
    secondToggleBtn.classList = 'toggleBtn close'
    secondToggleBtn.innerHTML = 'toggleBtn <i class="ic-arrow-down"></i>'
    secondToggleBtn.style.display = 'none'
    secondToggleBtn.addEventListener('click', accordToggleText)
    el.appendChild(secondToggleBtn)
  }

  const initToggleSlideBtn = (mainTextContainer, accordionMode = false) => {
    accordMode.value = accordionMode
    const marker = mainTextContainer.querySelector('.hideMarker')
    
    if (marker) {
      const perrentParag = marker.closest('p')
      const elems = nextAll(perrentParag)
      const fragment = document.createDocumentFragment()
      
      for (let index = 0; index < elems.length; index++) {
        fragment.appendChild(elems[index])
      }
      
      const hideDiv = document.createElement('div')
      hideDiv.classList = 'hideDiv'
      hideDiv.style.display = 'none'
      hideDiv.appendChild(fragment)
      
      const textBlockNode = perrentParag.parentElement
      const toggleBtn = document.createElement('button')
      toggleBtn.classList = 'toggleBtn open'
      toggleBtn.innerHTML = `Read more<i class="ic-arrow-down"></i>`
      toggleBtn.addEventListener('click', accordToggleText)
      
      textBlockNode.appendChild(toggleBtn)
      textBlockNode.appendChild(hideDiv)
      
      let condition = perrentParag.parentElement.nextElementSibling
      
      if (
        !condition &&
        accordMode.value &&
        !perrentParag.parentElement.parentElement.nextElementSibling
      ) {
        insertSlideUpBtn(perrentParag.parentElement)
      }
      
      while (condition) {
        condition.classList.toggle('hideDiv', true)
        condition.style.display = 'none'
        if (!condition.nextElementSibling && accordMode.value) {
          insertSlideUpBtn(condition)
        }
        condition = condition.nextElementSibling
      }
      
      condition = perrentParag.parentElement.parentElement.nextElementSibling
      
      while (condition) {
        condition.classList.toggle('hideDiv', true)
        condition.style.display = 'none'
        if (!condition.nextElementSibling && accordMode.value) {
          insertSlideUpBtn(condition)
        }
        condition = condition.nextElementSibling
      }
      
      perrentParag.remove()
    }
  }

  return {
    accordMode,
    accordShow,
    onAnkerClick,
    accordToggleText,
    initToggleSlideBtn,
    slideUp,
    slideDown
  }
}