import React, { useRef } from "react"
import styled from "styled-components"
import { useSprings, animated, interpolate, config } from "react-spring"

import Layout from "../components/layout"
//import Slide from "../components/Slide"
import slides from "../components/slideData"

const from = i => ({ x: 0, rot: 0, opacity: 0 })

const to = (i, slideIndex) => {
  let index = slides.length + (slideIndex - i)
  return {
    x: index,
    rot: index === 0 ? 0 : index > 0 ? 1 : -1,
    opacity: index === 0 ? 1 : 0.6,
  }
}

const trans = (x, r) =>
  `perspective(1000px) translateX(calc(100% * ${x})) rotateY(calc(-45deg*${r}))`

const Mojslider = () => {
  //const [slideIndex, setSlideIndex] = useState(0)

  const slideIndex = useRef(0)

  const [springs, setSprings] = useSprings(
    [...slides, ...slides, ...slides].length,
    i => ({
      ...to(i, slideIndex.current),
      from: { ...from(i) },
      config: config.wobbly,
    })
  )

  const handleNext = () => {
    slideIndex.current = (slideIndex.current + 1) % 5
    setSprings(i => ({ ...to(i, slideIndex.current) }))
  }
  const handlePrev = () => {
    slideIndex.current =
      slideIndex.current === 0 ? slides.length - 1 : slideIndex.current - 1
    setSprings(i => ({ ...to(i, slideIndex.current) }))
  }

  return (
    <Layout>
      <Wrapper>
        <div className="slides">
          {springs.map(({ x, rot, opacity }, i) => {
            let image = slides[i % slides.length].image
            return (
              <animated.div key={i} className="slide">
                <animated.div
                  className="slideBackground"
                  style={{
                    opacity: opacity.interpolate({
                      range: [0.6, 1],
                      output: [0, 0.7],
                    }),
                    backgroundImage: `url(${image})`,
                  }}
                ></animated.div>
                <animated.div
                  className="slideContent"
                  style={{
                    backgroundImage: `url(${image})`,
                    transform: interpolate([x, rot], trans),
                    opacity,
                  }}
                ></animated.div>
              </animated.div>
            )
          })}
          <button className="prev" onClick={handlePrev}>
            PREV
          </button>
          <button className="next" onClick={handleNext}>
            NEXT
          </button>
        </div>
        <div className="drugiSektor"></div>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  .slides {
    width: 100vw;
    height: 100vh;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .slide {
    grid-area: 1/-1;
  }

  .slideContent {
    width: 30vw;
    height: 40vw;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    transform-style: preserve-3d;
  }
  .slideBackground {
    position: fixed;
    top: 0;
    left: -10%;
    right: -10%;
    bottom: 0;
    background-size: cover;
    background-position: center center;
    z-index: -1;
  }

  button {
    background: transparent;
    color: white;
    outline: none;
    position: absolute;
    font-size: 1rem;
    width: 5rem;
    height: 5rem;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.8;
    z-index: 5;
    cursor: pointer;
  }
  .prev {
    left: 10%;
  }
  .next {
    right: 10%;
  }

  .drugiSektor {
    background-color: hotpink;
    width: 100vw;
    height: 100vh;
  }
`

export default Mojslider
