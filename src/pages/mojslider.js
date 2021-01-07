import React,{useState} from 'react';
import styled from "styled-components"
//import { useSpring, animated } from 'react-spring'

import Layout from "../components/layout"
import Slide from "../components/Slide"
import slides from "../components/slideData"

const Mojslider = () => {
    const [slideIndex, setSlideIndex]=useState(0)

    
    const handleNext=()=>{
        setSlideIndex((slideIndex +1)%slides.length)
    }
    const handlePrev=()=>{
        
        slideIndex===0 ? 
            setSlideIndex(slides.length-1) : 
            setSlideIndex(slideIndex-1)
        
    }

    return (
        <Layout>
            <Wrapper>
                <div className="slides">
                    

                    {[...slides,...slides,...slides].map((slide, i)=>{
                        let offset=slides.length+(slideIndex-i)
                        return <Slide slide={slide} offset={offset} key={i}></Slide>
                    })}
                    <button className="prev" onClick={handlePrev}>PREV</button>
                    <button className="next" onClick={handleNext}>NEXT</button>
                </div>
                <div className="drugiSektor"></div>
            </Wrapper>
        </Layout>
    );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
    .slides{
        width:100vw;
        height:100vh;
        display:grid;
        justify-content:center;
        align-items:center;
        
    }

    button{
        background: transparent;
        border: none;
        color: white;
        position: absolute;
        font-size: 1rem;
        width: 5rem;
        height: 5rem;
        top: 80%;
        opacity:0.7;
        z-index: 5;
    }
    .prev{
        left:10%;
    }
    .next{
        right:10%;
    }

    .drugiSektor{
        background-color:hotpink;
        width:100vw;
        height:100vh;
    }
  
  `


export default Mojslider;