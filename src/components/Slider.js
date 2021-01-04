import React from 'react';
import styled from "styled-components"
import { useGesture } from 'react-use-gesture'
import { useSprings, animated } from 'react-spring'

const Slider = ({ items, width = 600, visible = 4, children }) => {

    //x pozicija svakog djeteta 0*width,1*width,2*width..., zadnj je -width
    const [springs, SetSprings] = useSprings(items.length, i => ({ x: (i < items.length - 1 ? 1 : -1) * width }))
    //const bind = useGesture({})
    return (
        <Container>
            CIJELOKUPNI KONTEINER SA ZELENIM ITEMIMA:
            <animated.div className="item">
                U KOME SE SVAKI CHILD MAPIRA U ITEM {children}
            </animated.div>
        </Container>
    );
};

const Container = styled.div`
    border:2px solid red;
    position:relative;
    height:100%;
    width:100%;
    .item{
        border:2px solid green;   
        position:absolute;
        height:100%;
        will-change:transform;
        }
`

export default Slider;