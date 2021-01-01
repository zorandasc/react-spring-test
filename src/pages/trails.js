import React,{useState} from 'react';
import { useTrail, animated } from 'react-spring'
import styled from "styled-components"


import Layout from "../components/layout"


const Trail=({open, children, ...props})=>{
    const items=React.Children.toArray(children)
   
    //y je pozicija diva oko teksta
    //u pocetku je 20 ,transliraju se za 20px, a kada se klikne onda je 0
    const trails=useTrail(items.length,{
            from:{opacity:0,y:20, height:0},

            opacity:open?1:0,
            y:open?0:20,
            height:open?110:0,
            
            config:{mass:5, tension:2000, friction:200}
        },
    )
    return (
        <div className="trailsMain" {...props}>
            <div>
                {trails.map(({opacity,y, height}, index)=>(
                    <animated.div key={index} style={{opacity, transform:y.interpolate(y=>`translate3d(0,${y}px,0)`)}} className="trailsText">
                        <animated.div style={{height}} >{items[index]}</animated.div>
                    </animated.div>
                ))}
            </div>
        </div>)
}

const Trails = () => {
    const [open, setOpen]=useState(true)
    return (
        <Layout>
            <Wrapper>
                <Trail open={open} onClick={()=>setOpen(!open)}>
                    <span>Lorem</span>
                    <span>Ipsum</span>
                    <span>Dolor</span>
                    <span>Sit</span>
                </Trail>
            </Wrapper>
        </Layout>
    );
};

const Wrapper = styled.div`
  overscroll-behavior-y: contain;
  width: 100vw;
  height: 100vh;
  background-color: darkorange;
  overflow: hidden;
  .trailsMain{
    
      position:relative;
      width:100%;
      height:100%;
      cursor: pointer;
      display: flex;
        justify-content: center;
        align-items: center;
  
        .trailsText{
            position: relative;
            width:100%;
           
            height:110px;
            line-height:110px;
            color:black;
            font-size:8em;
            font-weight:800;
            letter-spacing: -9px;
            will-change: transform, opacity;
            overflow: hidden;
            }
        }
  
  `


export default Trails;