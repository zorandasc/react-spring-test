import React from "react"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

const MousePx = () => {
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))

  //HELPERSKE FUNKCIJE
  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
  const trans1 = (x, y) => `translate3d(${x / 10}px, ${y / 10}px,0)`
  const trans2 = (x, y) => `translate3d(${x / 8 + 35}px, ${y / 8 - 230}px,0)`
  const trans3 = (x, y) => `translate3d(${x / 6 - 250}px, ${y / 6 - 200}px,0)`
  const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`

  return (
    //PROMJENA MOSUSA CE SETOVATI set SPRING
    //StO CE DOVESTI DO TRANSFORMA SLIKA
    <Wrapper
      onMouseMove={({ clientX, clientY }) =>
        set({ xy: calc(clientX, clientY) })
      }
    >
      <animated.div
        className="zemlja"
        style={{ transform: props.xy.interpolate(trans1) }}
      ></animated.div>
      <animated.div
        className="sunce"
        style={{ transform: props.xy.interpolate(trans2) }}
      ></animated.div>
      <animated.div
        className="oblak"
        style={{ transform: props.xy.interpolate(trans3) }}
      ></animated.div>
      <animated.div
        className="ptica"
        style={{ transform: props.xy.interpolate(trans4) }}
      ></animated.div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
margin-top:20rem;
  width: 80%;
  height: 80%;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  .zemlja {
    min-width: 60ch;
    min-height: 60ch;
    width: 45vw;
    height: 45vw;
    max-width: 100ch;
    max-height: 100ch;
    background-image: url(${"https://image.flaticon.com/icons/svg/119/119596.svg"});
  }
  .sunce {
    width: 25ch;
    height: 25ch;
    background-image: url(${"https://image.flaticon.com/icons/svg/789/789395.svg"});
  }
  .oblak {
    opacity: 0.9;
    width: 25ch;
    height: 25ch;
    background-image: url(${"https://image.flaticon.com/icons/svg/414/414927.svg"});
  }
  .ptica {
    width: 25ch;
    height: 25ch;
    background-image: url(${"https://image.flaticon.com/icons/svg/789/789392.svg"});
  }
  .zemlja,
  .sunce,
  .oblak,
  .ptica {
    position: absolute;
    border-radius: 5px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    will-change: transform;
  }
`

export default MousePx
