import React from 'react';
import { animated } from 'react-spring';
import styled from "styled-components"

import Layout from "../components/layout"
import Slider from "../components/Slider"
import items from "../constants/items"

//const css = 'url(https://images.pexels.com/photos/380337/pexels-photo-380337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)';


const SlidersPage = () => {

    return (
        <Layout>
            <Wrapper>
                <div className="main">
                    MAIN (ZUTI) SALJE SKUPINU DIJECE U SLIDER:
                    DIJETE JE CONTENT(BIJELI) SA IMAGOM.
                    SLIDER JE CRVENI
                    <Slider items={items} width={700} visible={3}>
                        {items.map(({ css }, i) => (
                            <div className="content">
                                BIJELA CONTENT DIJECA
                                <animated.div className='image'
                                    style={{ backgroundImage: css }} />
                            </div>

                        ))}

                    </Slider>
                </div>
            </Wrapper>
        </Layout>
    );
};



const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  color:wheat;
  background-color: #171720;
  //overflow: hidden;
  display:flex;
  justify-content:center;
  align-items:center;
  .main{
    border:2px solid yellow;
    height:400px;
  }
  .content{
    width:100%;
    height:100%;
    padding: 70px 100px;
    border:1px solid white;
  }
  .image{
    width:100%;
    height:100%;
    background-size: cover;
    background-position: center center;
  }
  `



export default SlidersPage;