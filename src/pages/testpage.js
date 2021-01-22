import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"

import { useSpring, animated, interpolate } from "react-spring"
import { useScroll } from "react-use-gesture"

const Testpage = () => {
  const { o, xyz, color } = useSpring({
    from: { o: 0, xyz: [0, 0, 0], color: "red" },
    o: 1,
    xyz: [10, 20, 5],
    color: "green",
  })

  const [{ width }, set] = useSpring(() => ({ width: '0%' }))
  const height = document.documentElement.scrollHeight

  useScroll(({ xy: [, y] }) => set({ width: (y / height) * 100 + '%' }), { domTarget: window })


  return (
    <Layout>
      <Wrapper>
        <animated.div
          style={{
            // If you can, use plain animated values like always, ...
            // You would do that in all cases where values "just fit"
            color,
            // Unless you need to interpolate them
            background: o.interpolate(o => `rgba(210, 57, 77, ${o})`),
            // Which works with arrays as well
            transform: xyz.interpolate(
              (x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`
            ),
            // If you want to combine multiple values use the "interpolate" helper
            border: interpolate(
              [o, color],
              (o, c) => `${o * 100}px solid ${c}`
            ),
            // You can also form ranges, even chain multiple interpolations
            padding: o
              .interpolate({ range: [0, 0.5, 1], output: [0, 0, 10] })
              .interpolate(o => `${o}%`),
            // Interpolating strings (like up-front) through ranges is allowed ...
            borderColor: o.interpolate({
              range: [0, 1],
              output: ["red", "#ffaabb"],
            }),
            // There's also a shortcut for plain, optionless ranges ...
            opacity: o.interpolate([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1]),
          }}
        >
          {o.interpolate(n => n.toFixed(2)) /* innerText interpolation ... */}
        </animated.div>
      
      </Wrapper>
      <Wrapper>
      <animated.div className="kurec" style={{ width }} >KUREC</animated.div>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .kurec{
    height:100px;
    background-color:lightskyblue;
  }
`

export default Testpage
