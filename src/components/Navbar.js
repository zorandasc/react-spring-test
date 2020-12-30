import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Navbar = () => {
  return (
    <Wrapper>
      <div>
        <Link to="/">LOGO</Link>
      </div>
      <ul className="lista">
        <li>
          <Link to="/flip">FLIPCARD</Link>
        </li>
        <li>
          <Link to="/testpage">TESTONJA</Link>
        </li>
        <li>
          <Link to="/sliderpage2">SLIDER2</Link>
        </li>
        <li>
          <Link to="/card3d">CARD3D</Link>
        </li>
        <li>
          <Link to="/mousepara">MOUSE</Link>
        </li>
        <li>
          <Link to="/click">CLICK</Link>
        </li>
        <li>
          <Link to="/scriptpage">SCRIPT</Link>
        </li>
        <li>
          <Link to="/measure">MEASURE</Link>
        </li>
        <li>
          <Link to="/klipici">KLIPICI</Link>
        </li>
        <li>
          <Link to="/hello">HELLO</Link>
        </li>
        <li>
          <Link to="/balonja">BALONJA</Link>
        </li>
        <li>
          <Link to="/lists">LISTS</Link>
        </li>
        <li>
          <Link to="/pager">PAGER</Link>
        </li>
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  z-index: 1000;
  background: transparent;
  color: whitesmoke;
  display: flex;
  justify-content: space-around;
  align-items: center;
  a {
    color: inherit;
  }
  div {
    font-size: 2rem;
  }
  .lista {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    li {
      margin-left: 1rem;
      font-size: 1rem;
    }
  }
`

export default Navbar
