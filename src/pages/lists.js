import React from 'react';
import styled from "styled-components"


import Layout from "../components/layout"
import DraggableList from "../components/DraggableList"

const Lists = () => {
    return (
        <Layout>
            <Wrapper>
                <DraggableList items={'LOREM IPSUM DOLOR SIT'.split(" ")}/>
               
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
  overflow: hidden;
  font-size: 25px;
  font-weight: 600;
  //overflow: hidden;
  `

export default Lists;