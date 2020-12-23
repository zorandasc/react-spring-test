import React from "react"
import { useSpring, animated, interpolate } from "react-spring"
import { useDrag } from "react-use-gesture"

import styled from "styled-components"

import Layout from "../components/layout"

const Slider = () => {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    set({ x: down ? mx : 0, y: down ? my : 0 })
  })
  return (
    <Layout>
      <Wrapper>
        <div className="container">
          <animated.div
            className="kocka"
            {...bind()}
            style={{ x, y }}
          ></animated.div>
        </div>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: start;
  align-items: center;
  .container {
    width: 90vw;
    height: 10rem;
    margin: 0 auto;
    border: 1px solid white;
    background: whitesmoke;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  .kocka {
    width: 4rem;
    height: 4rem;
    background: lightblue;
    cursor: pointer;
    z-index: 1000;
  }
`

export default Slider
