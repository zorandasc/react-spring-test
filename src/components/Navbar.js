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
          <Link to="/flip">FlipCard</Link>
        </li>
        <li>page2</li>
        <li>page3</li>
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
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
    display: flex;
    li {
      margin-left: 2rem;
      font-size: 1.3rem;
    }
  }
`

export default Navbar
