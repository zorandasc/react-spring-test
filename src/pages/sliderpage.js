import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import Slider from "../components/Slider"

const Sliderpage = () => {
  
  return (
    <Layout>
      <Wrapper>
        <Slider>SLIDA</Slider>
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
  
`

export default Sliderpage
