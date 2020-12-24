import React from 'react';
import styled from "styled-components"
import { useSpring, animated } from 'react-spring'

import Layout from "../components/layout"


const items=[1,2,3,4]

//funkcija koja vraca vukciju 
//vracena funkcija kao ulazni parametar uzyma radianse
//i u toj funkciji i , redni broj klipica je konstanta
const helperTransfFunkcija=(i)=>{
    return (r)=>`translate3d(0,${15*Math.sin(r+(i*2*Math.PI)/1.6)}px,0)`
}

const Klipici = () => {
    //to smi samo mi nazvali radians
    //posto se na to odnosi
    const {radians}=useSpring({
        from:{radians:0},
        to: async next=>{
            while(1) await next({radians:2*Math.PI})
        },
        config:{duration:3500},
        reset:true
    })
    return (
        <Layout>
            <Wrapper>
            klipici
            {items.map(i=><animated.div 
                className="script-bf-box" 
                style={{transform: radians.interpolate(helperTransfFunkcija(i))}}>i</animated.div>)}
            </Wrapper>
        </Layout>
    );
};

const Wrapper=styled.div`


background: lightseagreen;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .script-bf-box {
  width: 100px;
  height: 300px;
  background: black;
  margin: 5px;
  will-change: transform;
  color:lavenderblush;
  display:flex;
  justify-content:center;
  align-items:center;
}
.script-bf-box:hover {
  background: hotpink;
}


  `

export default Klipici;