import React from 'react';
import styled from "styled-components"

import Layout from "../components/layout"
import Slider from "../components/Slider"
import items from "../constants/items"

const css = 'url(https://images.pexels.com/photos/380337/pexels-photo-380337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)';


const Sliders = () => {

    return (
        <Layout>
            <Wrapper>
                <Slider>SLIDERS</Slider>
            </Wrapper>
        </Layout>
    );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  color:wheat;
  background-color: #171720;
  overflow: hidden;
  display:flex;
  justify-content:center;
  align-items:center;
  `

export default Sliders;