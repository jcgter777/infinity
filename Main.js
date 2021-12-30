import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View , Image , TouchableOpacity, Animated, Easing } from 'react-native'
import useWindowDimensions from './window'
import { quotes } from './quotes'

const Main = () => {
    const { height, width } = useWindowDimensions();
    const [images, swapImg] = useState(["https://i.imgur.com/gpRy74d.jpg", "https://i.imgur.com/FtP3oAW.jpg", "https://i.imgur.com/ZGeMcjT.jpg"])

    const [color, setColor] = useState('#ffffff')
    const [slider, setSlider] = useState(1)
    const [clock, setClock] = useState(0)
    const [quote, setQuote] = useState('')

    const stones = [
        {id: 'yellow', color: 'rgb(247,180,44)', left: 139, top: 102, rotate: 0, fn: () => {
            setQuote(quotes[Math.floor(Math.random()*101)].quote)
        }},
        {id: 'red', color: 'rgb(218, 84, 95)', left: 165, top: 97, rotate: 0, fn: () => {
            setColor('rgb(' + Math.floor(Math.random()*256) + ', ' + Math.floor(Math.random()*256) + ', ' + Math.floor(Math.random()*256) + ')')
        }},
        {id: 'blue', color: 'rgb(90,126,226)', left: 203, top: 103, rotate: 0, fn: () => {
            setColor('#fff')
        }},
        {id: 'purple', color: 'rgb(140,2,88)', left: 241, top: 110, rotate: 0, fn: () => {
            slider===1? setSlider(0) : setSlider(1)
        }},
        {id: 'green', color: 'rgb(69,176,114)', left: 327, top: 208, rotate: 47, fn: () => {
            clock===0? setClock(1) : setClock(0)
        }}
    ]
    
    const animatedValue = useRef(new Animated.Value(0)).current

    const animation = dir => (
        Animated.sequence([
            Animated.timing(
                animatedValue,//sets the start value
                {
                    toValue: 0,
                    duration: 0, 
                    useNativeDriver: false
                }
            ),
            Animated.timing(
                animatedValue,//sets the destination of the animation
                {
                    toValue: /*animatedValue._value===-200*dir? 200*dir :animatedValue._value*/-200*dir, 
                    duration: 450, 
                    easing: Easing.ease, 
                    useNativeDriver: false
                }
            )
        ]).start()
    )
    // const animation = dir => {
    //     Animated.timing(
    //         animatedValue, 
    //         {
    //             toValue: dir*-200,
    //             duration: 500,
    //             easing: Easing.ease,
    //             useNativeDriver: false
    //         }
    //     ).start()
    // }
    const next = () => {
        animation(1)

        //swapImg([images[1], images[2], images[0]])
        
    }
    const prev = () => {
        animation(-1)

    }
    const update = () => {
        swapImg([images[2], images[0], images[1]])
    }
    const [currentTime, setTime] = useState(Date())
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const time = () => {
        let date = new Date()

        let hh = date.getHours()
        let session = "AM"

        if(hh === 0){hh = 12}
        else if(hh > 12){
            hh -= 12
            session = "PM"
        }
        setTime(week[date.getDay()] + " " + month[date.getMonth()] + " " + date.getDate() + " " + hh + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + session)
    }
    const styles = StyleSheet.create({
        stone: {
            position: 'absolute',
            height: 30,
            width: 20,
            borderRadius: 20
        },
        cover: {
              zIndex: 1,
              height: 100,
              width: parseInt(`${(width-700)/2}`),
              backgroundColor: color,
              position: 'absolute',
        },
        button: {
            textAlign: 'center',
            width: 75,
            height: 20,
            borderWidth: 1,
            borderRadius: 5
        },
        center: {
            justifyContent: 'center' ,
            alignItems: 'center',
        },
        clock: {
            margin: 50,
            fontWeight: 200
        },
    })
    return (
        <>
        <View style={{flexDirection: 'row', height: height, backgroundColor: color}}>
            <View style={{position: 'relative', display: 'flex', overflow: 'hidden', position: 'relative'}}>
                <Image style={{height: 500, width: 500, resizeMode: 'contain', position: 'relative'}} source={{uri: 'https://i.imgur.com/N7dbxaH.png'}}/>
                {stones.map((e) => (<TouchableOpacity key={e.id} id={e.id} style={[styles.stone, {/*backgroundColor: `${e.color}`, */left: parseInt(`${e.left}`), top: parseInt(`${e.top}`), transform: `rotate(${e.rotate}deg)`}]} activeOpacity={.8} onPress={e.fn}/>))}
            </View>

            <View style={[styles.center, {height: '100%', opacity: slider}]}>
                <View id='quote' style={{width: width-600, textAlign: 'center'}}><Text>{quote}</Text></View>
                <View id='clock' style={styles.clock, {opacity: clock}} onLoad={setInterval(time, 1000)}><Text style={[styles.clock]}>{currentTime}</Text></View>

                <View id="container" style={{height: 100, width: width-500, flexDirection: 'row', position: 'relative', display: 'flex', overflow: 'hidden', backgroundColor: color, justifyContent: 'center'}}>

                    {/* <View style={[styles.cover, {left: 0}]}></View> */}

                    <Animated.View id="images" style={{transform: [{translateX: animatedValue}], flexDirection: 'row'}}>
                        {images.map((e, i) => (<Image key={e+i} source={{uri: e}} style={{height: 100, width: 200}}/>))}
                    </Animated.View>

                    {/* <View style={[styles.cover, {right: 0}]}></View> */}
                </View>
                <View id="buttons" style={{margin: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.button} id="prev" onPress={()=> animation(-1)}><Text>Previous</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} id="next" onPress={next}><Text>Next</Text></TouchableOpacity>
                </View>
                
            </View>
        </View>
        </>
    )
}

export default Main