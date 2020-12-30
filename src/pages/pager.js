import React from "react"
import styled from "styled-components"

import { useSprings, animated } from "react-spring"
import { useGesture } from "react-use-gesture"

import Layout from "../components/layout"

const pages = [
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
]

const Pager = () => {
  //const [props, set] = useSprings(pages.length, i => {})
  //const bind = useGesture({
  //  onDrag: () => {},
  //})
  return (
    <Layout>
      <Wrapper>pager</Wrapper>
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
`

export default Pager
