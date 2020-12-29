import React,{useRef} from 'react';
import styled from "styled-components"
import {useSprings, animated, interpolate, } from 'react-spring'
import { useGesture} from "react-use-gesture"


//funkcija za generisanje springonje  , pri cemu je y pozicija za svaki item
//*100px veca od prethodnog
//trenutniz je kao parametar, konstanta za generisanu funkciju
const finicspring=(trenutniNiz,down, currentIndex, y)=>(index)=>{
    //console.log(trenutniNiz.indexOf(index))
    return down?
    {y:currentIndex*100+y,scale: 1.1, zIndex: '1', shadow: 15,}
    :
    { y:trenutniNiz.indexOf(index)*100, scale:1, zIndex:"0", shadow:1, }
}


const DraggableList = ({items}) => {
    //TRENUTNRI NIZ je niz koji sadrzi ove brojeve 0,1,2,3 i memoris trenutni redoslijed 
    const trenutniNiz=useRef(items.map((_,index)=>index))
    console.log(trenutniNiz.current)

    const [springs, setSprings]=useSprings(items.length, finicspring(trenutniNiz.current))

    const bind =useGesture(({args:[originalIndex], down, delta:[,y]})=>{
        const currentIndex=trenutniNiz.current.indexOf(originalIndex)

        setSprings(finicspring(trenutniNiz.current,down, currentIndex,y))
    })


    //setSprings(index=>({opacity:1}))
    //svaki sping {zIndex,shadow,y,scale} se mapira u jedan animated div,
    //pti cemu je y parametar svakog diva vezan za ref
    return (
        <Wrapper>
            {springs.map(({zIndex,shadow,y,scale}, index)=>
            <animated.div 
            {...bind(index)}
                key={index} 
                style={{
                    zIndex,
                    boxShadow: shadow.interpolate(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
                    transform: interpolate([y, scale], (y, s) => `translate3d(0,${y}px,0) scale(${s})`)
                }} 
                children={`${items[index]} , ORIGINALNINDEX+ ${index}`}/>)}
        </Wrapper>
    );
};

const Wrapper = styled.div`
position: relative;
  width: 320px;
  height: 340px;
  margin:10rem;

  >div{
        position:absolute;
        width:320px;
        height:90px;
        overflow:visible;
        pointer-events:auto;
        transform-origin:50% 50% 50%;
        border-radius: 5px;
        color: white;
        line-height: 90px;
        padding-left:32px;
        font-size: 14.5px;
        background: lightblue;
        text-transform: uppercase;
        letter-spacing: 2px;
        cursor:grab;
        user-select:none;
  
  }
  >div:nth-child(1){
      background:linear-gradient(135deg, #f6d365 0%, #fda085 100%)
  }
  >div:nth-child(2){
      background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
  }
  >div:nth-child(3){
      background:linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)
  }
  >div:nth-child(4){
      background:linear-gradient(135deg, #c3cfe2 0%, #c3cfff 100%)
  }
`


export default DraggableList;