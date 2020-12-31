import React, { useRef } from "react"
import styled from "styled-components"
import clamp from "lodash-es/clamp"
import { useSprings, animated } from "react-spring"
import { useGesture, useDrag } from "react-use-gesture"

import Layout from "../components/layout"

const pages = [
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
]

const Pager = () => {
  //cuva trenutni displejovanu sliku
  const index = useRef(0)

  //na pocetku svi su springovani, odnono x transilarani za i*window.innerwidth
  const [springs, setSprings] = useSprings(pages.length, i => ({
    x: i * window.innerWidth,
    sc: 1,
    display: "block",
  }))
  const bind = useDrag(
    ({ down, movement: [xDelta], direction: [xDir], distance, cancel }) => {
      //ako je down i pomjeraj misa je pola od window.innerwidth, onda
      if (down && distance > window.innerWidth / 2) {
        //interupt gesture i uradi nesto ondonso ppromjeni kurent index
        //current index je prethodni current index  +1 ili -1 u zavisnosti od
        //pomjeraja misa u desnu ili lijevu stranu
        cancel(
          (index.current = clamp(
            index.current + (xDir > 0 ? -1 : 1),
            0,
            pages.length - 1
          ))
        )
        console.log("index.current", index.current)
      }

      //i ide od 0 do 3
      //i za svaki spring se racuna pomjeraj x, display, i skaliranje

      setSprings(i => {
        //OVAJ IFONJA KAZE DA PRVI I +1 SLEDECI ITEM  CE BITII VIDLJIVI, OSTALI CE BITII DISPLAY NONE
        //(ODNOSNO UBIJEK DVA VIDLJIVA)
        //RECIMO ZA CURRENT INDEX OD 0
        //ZA i 0 I 1 biti false i vazice dole return objekat {x, sc, display:"BLOCK"}, dok ce za i 2 I 3 biti dsislay"nonoe".
        //za current 1 , bice false za i 0,1,2
        //za current 2, bice false za 0,1,2,3
        //ONI PRETHODNI ISPRED CURRENT NECE BITI DISPLAY:NONE
        //ALI CE BITIT TRANSILANI U LIJEVO SA X=-WINDOW.INNERWIDTH
        if (i < index.current - 1 || i > index.current + 1)
          return { display: "none" }
        //ONI KOJI SU ISPOD cuureent>0 BICE TRANSILARANI U LIJEVO DOK CE OSTALI PRATITI MISA xMov
        const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0)
        //skaliranje u odnosu na distancu
        const sc = down ? 1 - distance / window.innerWidth / 2 : 1
        return { x, sc, display: "block" }
      })
    }
  )
  return (
    <Layout>
      <Wrapper>
        {springs.map(({ x, sc, display }, i) => (
          //parent div se transilara a child div sadrzi sliku
          //i on se skalira pri dragovanju

          <animated.div
            {...bind()}
            key={i}
            style={{
              display,
              transform: x.interpolate(x => `translate3d(${x}px,0,0)`),
            }}
          >
            <animated.div
              style={{
                transform: sc.interpolate(s => `scale(${s})`),
                backgroundImage: `url(${pages[i]})`,
              }}
            ></animated.div>
          </animated.div>
        ))}
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  overscroll-behavior-y: contain;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 25px;
  font-weight: 600;
  background-color: darkcyan;
  position: fixed;
  overflow: hidden;

  > div {
    border: 2px solid black;
    position: absolute;
    width: 100vw;
    height: 100vh;
    will-change: transform;
    > div {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      border: 2px solid white;
      width: 100%;
      height: 100%;
      will-change: transform;
      box-shadow: 0 62.5px 125px -25px rgba(50, 50, 73, 0.5),
        0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
    }
  }
`

export default Pager
