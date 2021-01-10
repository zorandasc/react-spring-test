import React, { useRef } from "react"
import styled from "styled-components"
import {
  useSprings,
  useSpring,
  animated,
  interpolate,
  config,
} from "react-spring"
import { useDrag } from "react-use-gesture"

import Layout from "../components/layout"
//import Slide from "../components/Slide"
import slides from "../components/slideData"

const from = i => ({ x: 0, rot: 0, opacity: 0, text: 1, scale: 0.5 })

const to = (i, slideIndex) => {
  let index = slides.length + (slideIndex - i)
  return {
    x: index,
    rot: index === 0 ? 0 : index > 0 ? 1 : -1,
    opacity: index === 0 ? 1 : 0.6,
    text: index === 0 ? 0 : 1,
    scale: 1,
  }
}

const trans = (x, r, s) =>
  `perspective(1000px) translateX(calc(100% * ${x})) rotateY(calc(-45deg*${r})) scale(${s}) `

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
]
const transMouse = (
  x,
  y,
  s
) => `perspective(1000px)  rotateY(calc(${x} * 45deg))
  rotateX(calc(${y} * -45deg)) scale(${s})`

const Mojslider = () => {
  //ne dovodi do rerenderovanja  komponente za razliku od usestate
  const slideIndex = useRef(0)

  const [springs, setSprings] = useSprings(
    [...slides, ...slides, ...slides].length,
    i => ({
      ...to(i, slideIndex.current),
      from: { ...from(i) },
      config: config.wobbly,
    })
  )

  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  const bind = useDrag(
    ({
      args: [index],
      down,
      movement: [mx],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      console.log(down)
      setSprings(i => {
        if (index !== i) return
        const scale = down ? 2 : 1
        return { scale }
      })
    }
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
          {springs.map(({ x, rot, opacity, text, scale }, i) => {
            //i ide od 0 do 14
            //prave vrijednosti,  se ponavljaju da bi se dobio efekat
            //kontinualnosti, stog j ide
            let j = i % slides.length
            //j ide od 0 do 4
            return (
              <animated.div key={i} className="slide">
                <animated.div
                  className="slideBackground"
                  style={{
                    opacity: opacity.interpolate({
                      range: [0.6, 1],
                      output: [0, 0.7],
                    }),
                    backgroundImage: `url(${slides[j].image})`,
                  }}
                ></animated.div>

                <animated.div
                  {...bind(i)}
                  className="slideContent"
                  style={{
                    backgroundImage: `url(${slides[j].image})`,
                    transform: interpolate([x, rot, scale], trans),
                    opacity,
                  }}
                >
                  <animated.div
                    className="slideContentInner"
                    style={{
                      opacity: opacity.interpolate({
                        range: [0.6, 1],
                        output: [0, 1],
                      }),
                      transform: text.interpolate(
                        t => `translate3d(0,calc(100% * ${t}), 2rem)`
                      ),
                    }}
                  >
                    <h2 className="slideTitle">{slides[j].title}</h2>
                    <h3 className="slideSubtitle">{slides[j].subtitle}</h3>
                    <p className="slideDescription">{slides[j].description}</p>
                  </animated.div>
                </animated.div>
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
    //border:2px solid red;
    width: 30vw;
    max-width: 300px;
    height: 40vw;
    max-height: 400px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    transform-style: preserve-3d;
    display: grid;
    align-items: center;
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
  .slideContentInner {
    color: #fff;
    transform-style: preserve-3d;
    text-shadow: 0 0.1rem 1rem #000;
  }
  .slideSubtitle,
  .slideTitle {
    font-size: 2rem;
    font-weight: normal;
    letter-spacing: 0.2ch;
    text-transform: uppercase;
    margin: 0;
  }
  .slideSubtitle::before {
    content: "— ";
  }
  .slideDescription {
    margin: 0;
    font-size: 0.8rem;
    letter-spacing: 0.2ch;
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
