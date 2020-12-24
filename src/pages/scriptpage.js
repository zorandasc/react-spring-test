import React from 'react';
import styled from "styled-components"
import { useSpring, animated } from 'react-spring'

import Layout from "../components/layout"


const Scriptpage = () => {
    const props=useSpring({
        from:{left:'0%',top:'0%',width:'100%',height:'100%',background: 'lightgreen'},
        to:async (next)=>{
            while(1){
                await next({left:'0%',top:'0%',width:'100%',height:'100%',background: 'lightgreen'})
                await next({ height: '50%', background: 'lightgreen' })
                await next({ width: '50%', left: '50%', background: 'lightgoldenrodyellow' })
                await next({ top: '0%', height: '100%', background: 'lightpink' })
                await next({ top: '50%', height: '50%', background: 'lightsalmon' })
                await next({ width: '100%', left: '0%', background: 'lightcoral' })
                await next({ width: '50%', background: 'lightseagreen' })
                await next({ top: '0%', height: '100%', background: 'lightskyblue' })
                await next({ width: '100%', background: 'lightslategrey' })
            
            }
        }
    })
    return (
        <Layout>
            <Wrapper>
                <animated.div className="script-box" style={props}>SCRIPT</animated.div>
            
            </Wrapper>
        </Layout>
    );
};

const Wrapper = styled.div`

background: gray;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100vh;
  .script-box{
      will-change:width,height,left,top;
      position:relative;
  }
`

export default Scriptpage;