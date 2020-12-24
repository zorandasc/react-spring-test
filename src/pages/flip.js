import React, { useState } from "react"
import { useSpring, animated as a } from "react-spring"
import styled from "styled-components"

import Layout from "../components/layout"

const Img1 =
  "https://images.unsplash.com/photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i&auto=format&fit=crop"

const Img2 =
  "https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop"

function Flip() {
  const [fliped, setFliped] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: fliped ? 1 : 0,
    transform: `perspective(600px) rotateX(${fliped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })
  console.log(transform)
  return (
    <Layout>
      <Wrapper>
        <div className="card" onClick={() => setFliped(!fliped)}>
          {/*SVA SLIKA KAD JE JEDNA OPACITY 1 DRUHA MORA BITII O ZATO INTERPOLATE, TAKODJE KAD SE ROTIRA FRONT DA NE BUDE NAGLAVACKE ZATO INTERPOLATE*/}
          <a.div
            className="c back"
            style={{ opacity: opacity.interpolate(o => 1 - o), transform }}
          ></a.div>
          <a.div
            className="c front"
            style={{
              opacity,
              transform: transform.interpolate(t => `${t} rotateX(180deg)`),
            }}
          ></a.div>
        </div>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .card {
    margin-top:10rem;
    width: 45ch;
    height: 45ch;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    will-change: transform, opacity;
  }

  .c {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .front,
  .back {
    background-size: cover;
  }
  .back {
    background-image: url(${Img2});
  }
  .front {
    background-image: url(${Img1});
  }
`

export default Flip
