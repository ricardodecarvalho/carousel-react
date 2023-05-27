import { useCallback, useEffect, useRef, useState } from 'react'
import useSwipe from './useSwipe'

const Carousel = ({ children, initialPosition = 0 }) => {
  const swipeHandlers = useSwipe({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious()
  })

  const [current, setCurrent] = useState(initialPosition)

  const itemsRef = useRef(null)

  const setInitialPosition = useCallback(() => {
    if (initialPosition >= 0 && initialPosition <= (children.length - 1)) {
      scrollToId(initialPosition)
    }
  }, [initialPosition])

  useEffect(setInitialPosition, [setInitialPosition])

  const scrollToId = (id) => {
    const map = getMap()
    const node = map.get(id)
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
    setCurrent(id)
  }

  const getMap = () => {
    if (!itemsRef.current) {
      itemsRef.current = new Map()
    }
    return itemsRef.current
  }

  if (children.length === 0) return null

  const handleNext = () => {
    if (current === (children.length - 1)) return false
    scrollToId(current + 1)
  }

  const handlePrevious = () => {
    if (current === 0) return false
    scrollToId(current - 1)
  }

  return (
    <>
      <nav>
        <button
          type='button'
          onClick={handlePrevious}>Previous</button>

        {children.map((_, index) => (
          <button key={index} type='button' onClick={() => scrollToId(index)}>
            {index + 1}
          </button>
        ))}

        <button
          type='button'
          onClick={handleNext}>Next</button>
      </nav>
      <div>
        <ul>
          {children.map((item, index) => (
            <li
              style={{ touchAction: 'none', cursor: 'move' }}
              key={index}
              ref={(node) => {
                const map = getMap()
                if (node) {
                  map.set(index, node)
                } else {
                  map.delete(index)
                }
              }}
              {...swipeHandlers}
            >{item}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Carousel
