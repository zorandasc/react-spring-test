import React from "react"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"
import { useGesture, useDrag } from "react-use-gesture"

import Layout from "../components/layout"

const Balonja = () => {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
  //MOZE I OVAKO
  const bind1 = useDrag(({ down, movement }) => {
    set({ xy: down ? movement : [0, 0] })
  })
  const bind2 = useGesture(({ down, delta, velocity }) => {
    //velocity = clamp(velocity, 1, 8)
    set({
      xy: down ? delta : [0, 0],
      config: { mass: velocity, tension: 500 * velocity, friction: 50 },
    })
  })
  //test
  const bind3 = useGesture({
    onDrag: ({ down, delta, velocity }) =>
      set({
        xy: down ? delta : [0, 0],
        config: { mass: velocity, tension: 500 * velocity, friction: 50 },
      }),
  })

  return (
    <Layout>
      <Wrapper>
        <animated.div
          {...bind1()}
          style={{
            transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
          }}
          className="balonja"
        >
          balonja
        </animated.div>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 25px;
  font-weight: 600;
  .balonja {
    width: 100px;
    height: 100px;
    background: hotpink;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grabbing;
  }
  .balonja:active {
    cursor: grabbing;
  }
`

export default Balonja
