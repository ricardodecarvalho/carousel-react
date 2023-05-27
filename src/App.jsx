import './assets/styles.css'
import Carousel from './Carousel'

function App() {
  return (
    <Carousel initialPosition={0}>
      <div className='slide-example' style={{ color: 'white', backgroundColor: 'red' }}>Slide 1</div>
      <div className='slide-example' style={{ color: 'white', backgroundColor: 'green' }}>Slide 2</div>
      <div className='slide-example' style={{ color: 'white', backgroundColor: 'black' }}>Slide 3</div>
      <div className='slide-example' style={{ backgroundColor: 'pink' }}>Slide 4</div>
      <div className='slide-example' style={{ backgroundColor: 'yellow' }}>Slide 5</div>
    </Carousel>
  )
}

export default App
