import React,{useState, useRef} from 'react';
import styled from "styled-components"
import {useChain, useSpring, useTransition, animated, config } from 'react-spring'

import Layout from "../components/layout"
import data from "../components/data"

const Chain = () => {
    const [open, setOpen]=useState(false)
  
    const springRef=useRef()
    const {size,opacity,...rest}=useSpring({ 
        ref:springRef,
        config:config.stiff,
        from :{size:"20%", background:"hotpink"},
        to:{size:open?"100%":"20%", background:open?"white":"hotpink"},
       
    })
    
    const transRef=useRef()
    //Whenever items are added or removed, it will animate these changes.
    //from	obj/fn	Base values, optional
    const transition=useTransition(open ? data:[], item=>item.name,{
        ref:transRef,
        unique:true,
        trail:400 / data.length,
        from:{opacity:0,transform:"scale(0)"},
        enter:{opacity:1, transform:"scale(1)"},
        leave:{opacity:0, transform:"scale(0)"}
    })

    useChain(open?[springRef, transRef]:[transRef,springRef],[0, open ? 0.1 : 0.6])


    return (
        <Layout>
            <Wrapper>
                <Container 
                    style={{ ...rest, width:size, height:size}}
                    onClick={() => setOpen(open => !open)}>
                    {transition.map(({item, key, props})=>(
                        <Item key={key} style={{...props, background:item.css}}></Item>
                    ))}

                </Container>
            
            </Wrapper>
            
        </Layout>
    );
};



const Wrapper = styled.div`
 margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    user-select: none;
    background: lightblue;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

`
const Container=styled(animated.div)`
    position:relative;
    display:grid;
    grid-template-columns: repeat(4, minmax(100px, 1fr));
    grid-gap:25px;
    padding:25px;
    background:white;
    border-radius:5px;
    cursor: pointer;
    box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.05);
    will-change: width, height;

`
const Item=styled(animated.div)`
width: 100%;
  height: 100%;
        background:black;
        border-radius:5px;
        will-change: transform, opacity;
`

export default Chain;