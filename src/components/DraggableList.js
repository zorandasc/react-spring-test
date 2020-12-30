import React, { useRef } from "react"
import styled from "styled-components"
import { useSprings, animated, interpolate } from "react-spring"
import { useGesture } from "react-use-gesture"
import clamp from "lodash-es/clamp"
import swap from "lodash-move"

//The _.clamp() method is used to clamp number 
//within the inclusive range within the lower and upper bounds.
//_.clamp(number, lower, upper)

//_.swap(array, fromIndex, toIndex)

//helperska fukkcija koja je trebala da zamjeni swap od loadasha
const swapArrayLocs = (arr, index1, index2) => {
  ;[arr[index1], arr[index2]] = [arr[index2], arr[index1]]
  return arr
}

//FUNKCIJA KOJA VRACA FUNKVIJU
//funkcija za generisanje springonje  , pri cemu je y pozicija za svaki item
//*100px veca od prethodnog
//trenutniz je kao parametar, konstanta za generisanu funkciju
const finicspring = (
  trenutniNiz, //ODREDJUJE POMJERAJ SVIH ITEMA
  down, //MISONJA DOWN DOBIJEN OD GESTURE
  originalIndex, //ORGINALNI POLOZAJ ITEMA , DOBIJEN OD BAJDOVANJA U VIEWU {...bind(i)}
  currentIndex, //TRENUTNI POLOZAJ ITEMA, U ODNU NA NJEGA SE RACUNA POMJERAJ ITEMA SA MISOM
  y //POMJERAJ MISA DOBIJEN OD GESURE
) => index => {
  //kad je somi pritisnut, y sa desne starane je ono sto se mjenja (somi) u useGestureeu funkcij. A y sa lijeve strane je IPSILON polozaj itema
  //KADA SE KLIKNE misom down, GESTURE, POMJERAJU SE SVI SPRINGOVI (index ide od o do 3) I ZA SVE CE BITI ONAJ DONJI OBJEKAT,  OSIM ZA selectovani item index===originalIndex, ZA KOGA CE VRIJEDITI GORNJI OBJEKAT
  return down && index === originalIndex
    ? {
        y: currentIndex * 100 + y,
        scale: 1.1,
        zIndex: "1",
        shadow: 15,
        immediate: n => n === "y" || n === "zIndex",
      }
    : { y: trenutniNiz.indexOf(index) * 100, scale: 1, zIndex: "0", shadow: 1 }
}

const DraggableList = ({ items }) => {
  //TRENUTNRI NIZ je niz koji sadrzi ove brojeve 0,1,2,3 i memoris trenutni redoslijed
  //IZGLEDA DA MOZE I BEZ useref()
  const trenutniNiz = useRef(items.map((_, index) => index))
  //console.log(trenutniNiz.current)

  //ovo ce na pocetku biti bez ikakvog dragovanja
  const [springs, setSprings] = useSprings(
    items.length,
    //ovdije FUNKCIJA finicspring SE POZIVA NA POCETKU, OSTALI PARAMETRI SU UNDEFINED I VRIJEDI CE DONJI OBIJEKAT
    finicspring(trenutniNiz.current)
  )

  //ovo je promjena koja se dogadja tokom i nakon drgovanja
  const bind = useGesture({
    //originalIndex je ORGINALANA POZICIJA ITEMA KAD SE LOADUJE CIJELA STARNICA
    //originalIndex SE NE MIJENJA, PREKO NJEGA ITEM ZNA DA JE ON SELECTOVAN
    onDrag: ({ args: [originalIndex], down, movement: [, y] }) => {
      //console.log("y", y)
      //pronaci trenutni polozaj orginalnogindeksa,  originalIndex
      const currentIndex = trenutniNiz.current.indexOf(originalIndex)
      //ZA RAZLIKU OD currentIndex KOJI SE NE MIJENJA SA POMJERAJEM MISA y
      //ODNOSNO DOK JE ITEM U VAZDUHU, curROW SE MIJENJA
      //CURROW JE MIJESTO NA KOME TREBA DA SPUSTIMO ITEM
      const curRow = clamp(
        Math.round((currentIndex * 100 + y) / 100),
        0,
        items.length - 1
      )
      const newOrder = swap(trenutniNiz.current, currentIndex, curRow)
      //JAKO BITNO, setSprings POKRECE SVE SPRINGOVE (NJIH 4)
      setSprings(finicspring(newOrder, down, originalIndex, currentIndex, y))
      if (!down) trenutniNiz.current = newOrder
    },
  })

  //svaki sping {zIndex,shadow,y,scale} se mapira u jedan animated div,
  //pti cemu je y parametar svakog diva vezan za ref
  return (
    <Wrapper>
      {springs.map(({ zIndex, shadow, y, scale }, index) => (
        <animated.div
          {...bind(index)}
          key={index}
          style={{
            zIndex,
            boxShadow: shadow.interpolate(
              s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            transform: interpolate(
              [y, scale],
              (y, s) => `translate3d(0,${y}px,0) scale(${s})`
            ),
          }}
          children={`${items[index]} , ORIGINALNINDEX= ${index}`}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 320px;
  height: 340px;
  margin: 10rem;

  > div {
    position: absolute;
    width: 320px;
    height: 90px;
    overflow: visible;
    pointer-events: auto;
    transform-origin: 50% 50% 50%;
    border-radius: 5px;
    color: white;
    line-height: 90px;
    padding-left: 32px;
    font-size: 14.5px;
    background: lightblue;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: grab;
    user-select: none;
  }
  > div:nth-child(1) {
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  }
  > div:nth-child(2) {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  > div:nth-child(3) {
    background: linear-gradient(135deg, #5ee7df 0%, #b490ca 100%);
  }
  > div:nth-child(4) {
    background: linear-gradient(135deg, #c3cfe2 0%, #c3cfff 100%);
  }
`

export default DraggableList
