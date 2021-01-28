import React from 'react'
import PropTypes from 'prop-types'
import Measure from 'react-measure'
import { Transition, animated, interpolate } from 'react-spring/renderprops'


const styles={
    outer:{ position:"relative", width:"100%", height:"100%"},
    inner:{ 
      
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        minHeight: '100%',
    },
    cell:{
        
        position:'absolute',
        willChange: 'transform, width, height, opacity',
    }
}



export default class Grid extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        keys: PropTypes.func,
        occupySpace: PropTypes.bool,
        columns: PropTypes.number,
        margin: PropTypes.number,
        heights: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
        lockScroll: PropTypes.bool,
        closeDelay: PropTypes.number,
    }
    static defaultProps = {
        occupySpace: true,
        columns: 3,
        margin: 0,
        heights: 400,
        lockScroll: false,
        closeDelay: 0,
      }
    //width and height containera
    state = { width: 0, height: 0, open: undefined, lastOpen: undefined }
    

    scrollOut=e=>{
        if(!this.props.lockScroll){
            //ugasi open
            this.state.open && this.toggle(undefined)
            this.clicked=false
        }
    }


    //kad se pritisne na cell aktivira se onclick, definicija cell
    //komponente, onda se aktivira toggle funkcija, koja
    //setuje open sa c.key, ime objekta
    toggle=key=>this.setState(
        state=>({
            lastOpen: state.open,
            //ovo znaci da je open =key, samo prvi put kada se klikne
            //u ostalim slucajevima je undefined,nema vise kliktanja
            open:state.open===key?undefined:key,
        }),
        ()=>(this.clicked=true)
    )


    //inicijalne wrijednosti za width and height contenera, odreduju se 
    //sa resiza na osnovu mjerenja,.measure component
    //state je objekat, pa se pojedini propertu 
    //u objektu targetiraju sa []
    resize=(width,height,props)=>{
        this.setState(({
            [width]:props.client.width,
            [height]:props.client.height
        }))
    }
    //'widthOuter', 'heightOuter' su iygleda property koji
    //se dinamicki dodaju statu, za razliku od 
    //width and height koji u state definisani sa 0,
    //vjerovatno jer se koriste u drugim tracunanjima
    resizeOuter=(props)=>this.resize('widthOuter', 'heightOuter', props)
    resizeInner=(props)=>this.resize('width', "height", props)

    //updajtuj dimenzija  cellova nakon promjene ,open, state
    update=({key,x,y,width,height})=>{
        //NA PCETKU JE this.state.open undefined, 
        //pa je const open, false za sve keys
        const open=this.state.open===key
        return {
            opacity:this.state.open && !open ? 0 : 1,
            //da bi smo ovdije,u child-u, pristupili scrollLeft
            //koristiomo outerref na parentu
            x:open?this.outerRef.scrollLeft:x,
            y:open?this.outerRef.scrollTop:y,
            width:open ?this.state.width :width,
            height:open?this.state.heightOuter:height
        }
    }


    componentDidUpdate(){
        this.clicked = false
    }
    render(){
        
        let {
            children,//JE FUNKCIJA KOJA VRACA CELLL
            columns,
            margin,
            occupySpace,
            impl,
            config,
            data,
            keys,
            heights,
            closeDelay,
            lockScroll,
            ...rest
          } = this.props
          
          let { lastOpen, open, width } = this.state
          let column=0
          //je niz koju sadrzi kumulativno sbarane visine celija,
          // u slucaju columns=2, to je niz od dve cifre
          let columnHeights=new Array(columns).fill(0)
          
          //konvertuje svaki data u objekat {x,y,width,height,key,object}
          let displayData=data.map((child,i)=>{
              
              //u slucaju dve kolone, index moze biti 0 ili 1
              //occupySpace je true
              let index= occupySpace?columnHeights.indexOf(Math.min(...columnHeights)): column++ % columns
             //fixna velicina zavisna od 
             //ukupne sirine kontainera podijeljena sa brojekolone
             //i oduzreta sa nekom vrijednostu zavsnom od margine
              let cellWidth=width / columns - margin / (1 - (1 / (columns + 1)))
              
              //lijeva granica celije pomnozena sa indexom kolone
              //moze biit 0 i 1*cellwidth
              let left=cellWidth*index
             
              //ofset moze bito margin i 2*margin
              let offset=(index+1)*margin
             
              //top celije u zvisnosti od prethonih celija
              let top=columnHeights[index] + margin
              
              //dobijeni height od svakog data
              let height = typeof heights === 'function' ? heights(child) : heights
              
              //kumulativni height za svaki kolumn, na osnovu
              //kojeg se mijenja top svake naredne celije
              columnHeights[index]+=height+margin
   
              return {
                  x:margin?left+offset:left,
                  y:top,
                  width:cellWidth,
                  height:height,
                  key:keys(child),
                  object:child

              }
            })
        //lockScroll je false
        const overflow = lockScroll ? (open ? 'hidden' : 'auto') : 'auto'
         //visina inner diva containera
         const height=Math.max(...columnHeights)+margin
        return (
                <Measure 
                    client 
                    innerRef={r => (this.outerRef = r)}
                    onResize={this.resizeOuter}>
                    {({measureRef})=>(
                        <div 
                            ref={measureRef}
                            style={{...styles.outer,...this.props.style, overflow}}
                            {...rest}
                            onScroll={this.scrollOut}
                            onWheel={this.scrollOut}
                            onTouchMove={this.scrollOut}>
                            <Measure 
                                client 
                                innerRef={r => (this.innerRef = r)}
                                onResize={this.resizeInner}>
                                {({measureRef})=>(
                                    <div 
                                        ref={measureRef}
                                        style={{...styles.inner, height}}>
                                        <Transition
                                            native
                                            items={displayData}
                                            keys={d=>d.key}
                                            from={{opacity:0}}
                                            leave={{opacity:0}}
                                            enter={this.update}
                                            update={this.update}
                                            config={{
                                                ...config,
                                                delay: this.clicked && !open ? closeDelay : 0,}}>
                                                {(c,i)=>({opacity, x, y, width, height})=>(
                                                    <animated.div 
                                                        style={{
                                                            ...styles.cell,
                                                            opacity,
                                                            width,
                                                            height,
                                                            zIndex:
                                                                lastOpen === c.key || open === c.key ? 1000 : i,
                                                            transform:interpolate(
                                                                [x,y],
                                                                (x,y)=>`translate3d(${x}px,${y}px,0)`)
                                                        }}
                                                        /* OVO JE CHILDREN FUUNKCIJA (data, active,toggle)=>(
                                                        <Cell {...data} active={active} toggle={toggle}></Cell>
                                                        )*/
                                                        children={children(c.object, open===c.key, ()=>this.toggle(c.key))}>
                                                        
                                                    </animated.div>
                                                )}

                                        </Transition>
                                    </div>
                                )}
                            </Measure>
                        </div>
                    )}
                </Measure>
           
        )
    }
}