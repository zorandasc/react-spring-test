import React, { useState } from 'react';
import styled from "styled-components"
import { useSpring, animated } from 'react-spring'

import Layout from "../components/layout"


/*
0 % { transform: scale(1); }
25 % { transform: scale(.97); }
35 % { transform: scale(.9); }
45 % { transform: scale(1.1); }
55 % { transform: scale(.9); }
65 % { transform: scale(1.1); }
75 % { transform: scale(1.03); }
100 % { transform: scale(1); }
`*/


const Click = () => {
    const [state, toggle]=useState(true)
    const {x}=useSpring({from:{x:0},x:state?1:0,config: { duration: 1000 }})
    return (
        <Layout>
            <Wrapper onClick={()=>{toggle(!state)}}>
                <animated.div 
                style={{
                    opacity:x.interpolate({range:[0,1], output:[0.3,1]}),
                    transform:x.interpolate({range:[0,0.25,0.35,0.45,0.55,0.65,0.75,1,1.03,1], output:[1,0.97,0.9,1.1,0.9,1.1,]}).interpolate(x=>`scale(${x})`)
                    }}>
                CLICK
                </animated.div>
          
            </Wrapper>
        </Layout>
    );
};

const Wrapper = styled.div`

width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  font-size:10rem;
  color:lavender;
  cursor: pointer;
  `


export default Click;