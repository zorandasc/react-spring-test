import React from 'react';
import styled from "styled-components"


const Slide = ({slide, offset}) => {
    const active = offset === 0 ? true : null;
    let dir= offset === 0 ? 0 : offset > 0 ? 1 : -1
    return (
        <Wrapper >
            <div className="slideBackground" 
                style={{
                    backgroundImage: `url('${slide.image}')`,
                    transform: `translateX(calc(10% * ${dir}))`
                    }}>
            </div>
            <div className="slideContent" 
                style={{
                    backgroundImage: `url('${slide.image}')`,
                    transform: `perspective(1000px) 
                                translateX(calc(100% * ${offset}))
                                rotateY(calc(-45deg * ${dir}))
                                `
                    }}>
                <div className="slideContentInner">
                    <h2 className="slideTitle">{slide.title}</h2>
                    <h3 className="slideSubtitle">{slide.subtitle}</h3>
                    <p className="slideDescription">{slide.description}</p>
                </div>
            </div>
        </Wrapper>
    );
};


const Wrapper = styled.div`
    grid-area:1/-1;

    .slideContent {
        width:30vw;
        height:40vw;
        background-size:cover;
        background-position:center center;
        background-repeat:no-repeat;
        transform-style:preserve-3d;
    }
    .slideBackground{
        position:fixed;
        top:0;
        left: -10%;
        right: -10%;
        bottom: 0;
        background-size: cover;
        background-position: center center;
        z-index: -1;
        opacity:0;
    }

`


export default Slide;