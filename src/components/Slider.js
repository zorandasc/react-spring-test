import React from "react"
import { animated } from "react-spring"
//import { useGesture } from "react-use-gesture"

import styled from "styled-components"

const Slider = ({ children }) => {
  //for heandling multiple gesatures,
  // u ovom slucaju down, i delta, delta(0)
  //pomjeraj samo u x osi
  //const [bind, props] = useGesture()

  //const [{ x, bg, size }, set] = useSpring(() => {
  //x: props.down ? props.delta[0] : 0,
  //})
  return (
    <Wrapper>
      <animated.div className="av"></animated.div>
      <animated.div className="fg"> {children}</animated.div>
    </Wrapper>
  )
}

const Wrapper = styled(animated.div)`
  position: relative;
  width: 300px;
  height: 100px;
  pointer-events: auto;
  transform-origin: 50% 50% 0px;
  padding-left: 32px;
  padding-right: 32px;
  box-sizing: border-box;
  display: grid;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.2);
  .fg {
    cursor: -webkit-grab;
    background-color: #272727;
    color: rgba(255, 255, 255, 0.8);
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    align-items: center;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.2);
    font-size: 3em;
    font-weight: 600;
    transition: box-shadow 0.75s;
  }
`

export default Slider
