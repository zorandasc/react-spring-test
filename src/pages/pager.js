import React from "react"
import styled from "styled-components"

import { useSprings, animated } from "react-spring"
import { useGesture } from "react-use-gesture"

import Layout from "../components/layout"

const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
]

const Pager = () => {
  const [springs, setSprings] = useSprings(pages.length, i => ({x:i*window.innerWidth, sc:1, display:"block"}))
  const bind = useGesture({
    onDrag: ({down, movement:[xMov,],direction:[xDir],distance,cancel}) => {
      setSprings(i=>{
        const x=(down?xMov:0)
        return {x, sc:1, display:"block"}})
    },
  })
  return (
    <Layout>
      <Wrapper>
        {springs.map(({x,sc,display},i)=>
          <animated.div {...bind()} key={i} style={{display, transform:x.interpolate(x=>`translate3d(${x}px,0,0)`)}}>
           
            <animated.div style={{transform:sc.interpolate(s=>`scale(${s})`),backgroundImage:`url(${pages[i]})`}}>          
            </animated.div>

          </animated.div>)}
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
  background-color: darkcyan;
  position:fixed;
  overflow:hidden;
  
  >div{
    border:2px solid black;
    position: absolute;
    width: 100vw;
  height: 100vh;
  will-change: transform;
    >div{
      background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
      border:2px solid white;
      width: 100%;
  height: 100%;
  will-change: transform;
  box-shadow: 0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
    }
  }

`

export default Pager
