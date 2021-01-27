import React from 'react'
import { Transition, Trail, animated } from 'react-spring/renderprops'

//ABOUT React.Children
//Luckily, React provides us with a clean API to 
//handle looping of children. If there is only one child 
//(or none at all), it won't throw a fuss — it'll handle 
//things for us nicely in the background




//ovaj slug ce pomjerat svu djecu u TRAIL prema gore
//i bice koristen u unutrasnjem divu
export class Slug extends React.PureComponent{
    render(){
        const {
            children, 
            from={opacity:0,transform:"translate3d(0,40px,0)"}, 
            to={opacity: 1, transform: 'translate3d(0,0px,0)'}, 
            ...rest
        }=this.props
        //result ce sadrzati nase modifikovane childrene
        const result=React.Children.map(children, child =>styles=>{
            //definisemo svaki child kao animated komponentu
            //destruktujemo child props, i posebno sdtyles
            const Component=animated[child.type] || animated(child.type)
            const props={
                ...child.props,
                style:{
                    willChange: 'opacity, transform',
                    ...child.props.style,
                    ...styles
                }
            }
            return <Component {...props}></Component>
        })
        return <Trail 
                    native 
                    items={result} 
                    keys={result.map((_,i)=>i)} 
                    from={from} 
                    to={to}
                    {...rest}>

                </Trail>

    }
}

//fade je cijeli div koji se pojavljuje TRANSITION
//i pomjera ime gore
export class Fade extends React.PureComponent {
    render(){
        const {
            children,
            show,
            from,
            enter,
            leave,    
            ...rest
        }=this.props
        const {type, props}=children
        const Component=animated[type] || animated(type)
        const result=styles=>{
            const newProps={
                ...props,
                style:{
                    willChange: 'opacity, transform',
                    ...props.style,
                    ...styles
                },
                
            }
            return <Component {...newProps}></Component>
        }
        return (
            <Transition 
                native
                items={show}
                {...rest}
                from={from}
                enter={enter}
                leave={leave}
                children={show =>show && result}>
                
            </Transition>)
    }
}