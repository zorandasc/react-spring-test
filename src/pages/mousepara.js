import React from "react"
import MousePx from "../components/MousePx"
import styled from "styled-components"

import Layout from "../components/layout"

const Mousepara = () => {
  return (
    <Layout>
      <Wrapper>
        <MousePx></MousePx>
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
`

export default Mousepara
