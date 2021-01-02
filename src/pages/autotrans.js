import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { useTransition, animated, config } from 'react-spring'

import Layout from "../components/layout"

const slides = [
    { id: 0, url: 'photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i' },
    { id: 1, url: 'photo-1544572571-ab94fd872ce4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1534&q=80' },
    { id: 2, url: 'reserve/bnW1TuTV2YGcoh1HyWNQ_IMG_0207.JPG?ixlib=rb-1.2.1&w=1534&q=80' },
    { id: 3, url: 'photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80' },
  ]
  

const Autotrans = () => {
    const [index, setIndex]=useState(0)
    const transition=useTransition(slides[index], item=>item.id,{
        from:{opacity:0},
        enter:{opacity:1},
        leave:{opacity:0},
        config:config.molasses,
    })
    useEffect(()=>setInterval(()=>setIndex(index=>(index+1)%4),2000),[])
    return (
        <Layout>
            <Wrapper>
                {transition.map(({item, props, key})=>(
                    <animated.div 
                        key={key}
                        className="bg"
                        style={{
                            ...props, 
                            backgroundImage:`url(https://images.unsplash.com/${item.url}&auto=format&fit=crop)`}}/>
                ))}
               
            </Wrapper>
        </Layout>
    );
};




const Wrapper = styled.div`
 margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    user-select: none;
    .bg{
        position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  will-change: opacity;
    }

    `
export default Autotrans;