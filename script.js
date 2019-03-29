const innerContainer = document.querySelector('.inner-container')
const { scrollHeight, offsetHeight } = innerContainer
const maxScrollTop = scrollHeight - offsetHeight
const leftFade = document.querySelector('.left-fade')
const rightFade = document.querySelector('.right-fade')
const maxTranslateLeft = 80
const dates = document.querySelector('#dates')
const kings = document.querySelector('#kings')
const kingsStartPosition = window.getComputedStyle(kings).left

let scrollTimer = undefined

function getNumbers (text) {
  return text.match(/[-]{0,1}[\d]*[\.]{0,1}[\d]+/g)
}

function handleWheel (event) {
  const isScrollUp = event.deltaY < 0
  const isScrollDown = event.deltaY > 0
  const kingsCurrentPosition = getNumbers(window.getComputedStyle(kings).transform)

  if ((kingsCurrentPosition === kingsStartPosition && isScrollUp)) {
    innerContainer.addEventListener('mouseleave', function () {
      window.removeEventListener('wheel', handleWheel)
    })

    return
  }
  
  clearTimeout(scrollTimer)

  scrollTimer = setTimeout(function () {
    const value = isScrollDown ? -1 : 1
    kings.style.transform = `translateX(${parseFloat(kingsCurrentPosition) + value}%)`
  }, 200)
}

function handleScroll () {
  const currentPercentage = innerContainer.scrollTop / maxScrollTop * 100

  if (currentPercentage >= 1) {
    kings.style.transform = `translateX(-${parseFloat(maxTranslateLeft * currentPercentage / 100)}%)`
  }
}

leftFade.style.height = `${scrollHeight}px`
rightFade.style.height = `${scrollHeight}px`

innerContainer.addEventListener('scroll', handleScroll)
