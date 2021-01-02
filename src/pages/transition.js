import React, {useState, useCallback} from 'react';
import styled from "styled-components"
import { useTransition, animated } from 'react-spring'


import Layout from "../components/layout"


const pages = [
    ({ style }) => <animated.div style={{ ...style, background: 'lightpink' }}>A</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightblue' }}>B</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightgreen' }}>C</animated.div>,
  ]


const Transition = () => {
    const [index, setIndex]=useState(0)
    //callback vraca uvije istu referencu funkcije
    //vezano za optimizaciju preformanse
    //index doddaj j1dan i rotiraj sa modulom 3
    const onClick=useCallback(()=>setIndex(index=>(index +1)%3),[])
    const transitions=useTransition(index, p=>p, {
        //from vrijedi za prvo renderovanje
        from:{opacit:0, transform:`translate3d(100%,0,0)`},
        enter:{opacity:1, transform:`translate3d(0,0,0)`},
        leave:{opacity:0,  transform: 'translate3d(-50%,0,0)'}
    })
    return (
        <Layout>
            <Wrapper>
                <div className="main" onClick={onClick}>
                    {transitions.map(({item, key, props} )=>{
                        const Page=pages[item]
                        return <Page key={key} style={props}></Page>

                    })}
                </div>          
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

  
   
    .main >div{
       overflow:visible;
        cursor: pointer;
        position: absolute;
        width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 800;
  font-size: 25em;
  will-change: transform, opacity;
  text-shadow: 0px 2px 40px #00000020, 0px 2px 5px #00000030;
    }

`



export default Transition;
