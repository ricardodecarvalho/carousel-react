import { useState } from "react"

// Only horiziontal swipes (left, right)
const useSwipe = ({ onSwipedLeft,  onSwipedRight}) => {
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)

    const minSwipeDistance = 50

    const onTouchMove = (event) => {
        setTouchEnd(event.targetTouches[0].clientX)
    }

    const onTouchStart = (event) => {
        setTouchEnd(0)
        setTouchStart(event.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe) {
            onSwipedLeft?.()
        }
        if (isRightSwipe) {
            onSwipedRight?.()
        }
    }

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd
    }
}

export default useSwipe
