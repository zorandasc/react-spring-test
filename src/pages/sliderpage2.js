import React from "react"
import styled from "styled-components"
import { useSpring, animated, interpolate } from "react-spring"
import { useGesture, useDrag } from "react-use-gesture"

import Layout from "../components/layout"

const Sp2 = () => {
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    background: "red",
    size: 1,
    alignSelf: "flex-end",
  }))

  const bind1 = useGesture({
    onDrag: ({ down, movement }) => {
      set({
        xy: down ? movement : [0, 0],
        background: movement[0] < 0 ? "#f093fb" : "#96fbc4",
        size: down ? 1.1 : 1,
        alignSelf: movement[0] < 0 ? "flex-end" : "flex-start",
      })
    },
  })

  const avSize = props.xy
    .interpolate({
      map: Math.abs,
      range: [50, 300],
      output: [0.5, 1],
      extrapolate: "clamp",
    })
    .interpolate(x => `scale(${x})`)

  return (
    <Layout>
      <Wrapper>
        <animated.div
          className="bg"
          {...bind1()}
          style={{
            background: props.background,
          }}
        >
          <animated.div
            className="rupa"
            style={{
              alignSelf: props.alignSelf,
              transform: avSize,
            }}
          ></animated.div>
          <animated.div
            style={{
              transform: props.xy.interpolate(x => `translate3d(${x}px,0,0)`),
            }}
            className="fg"
          >
            SLIDER2
          </animated.div>
        </animated.div>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled(animated.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 25px;
  font-weight: 600;
  position: relative;
  .bg {
    z-index: 2;
    position: absolute;
    width: 350px;
    height: 100px;
    border-radius: 5px;
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .fg {
    cursor: -webkit-grab;
    background-color: #272727;
    color: rgba(255, 255, 255, 0.8);
    z-index: 3;
    position: absolute;
    width: 350px;
    height: 100px;
    display: grid;
    align-items: center;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.2);
    font-size: 3em;
    font-weight: 600;
    transition: box-shadow 0.75s;
    user-select: none;
  }
  .balonja:active {
    cursor: grabbing;
  }

  .rupa {
    margin: 1rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: white;
  }
`

export default Sp2
