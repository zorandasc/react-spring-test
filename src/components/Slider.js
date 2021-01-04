import React from 'react';
import styled from "styled-components"
import { useGesture } from 'react-use-gesture'
import { useSprings, animated } from 'react-spring'

const Slider = ({ children }) => {
    return (
        <Container>
            <Item>{children}</Item>
        </Container>
    );
};

const Container = styled.div`
    position:relative;
    height:100%;
    width:100%;
    border:2px solid red;
`

const Item = styled(animated.div)`
    position:absolute;
    height:100%;
    will-change:transform;
    border:2px solid green;
  
`


export default Slider;