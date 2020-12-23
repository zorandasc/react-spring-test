import React from 'react';
import styled from "styled-components"


import Layout from "../components/layout"
import Card from "../components/Card"


const Card3d = () => {
    return (
        <Layout>

            <Wrapper><Card></Card></Wrapper>
        </Layout>
    );
};

const Wrapper=styled.div`

    
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    
    display: flex;
    align-items: center;
  justify-content: center;
  overflow: hidden;
    
    `

export default Card3d;