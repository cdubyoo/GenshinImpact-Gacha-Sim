import React, { useState, useEffect } from 'react';
import fiveStarData from '../data/5star'
import fourStarData from '../data/4star'
import threeStarData from '../data/3star'



export default function Rolls(props) {
    const [roll, setRoll] = useState(null)
    const [tenPityCount, setTenPityCount] = useState(0)
    const [ninetyPityCount, setNinetyPityCount] = useState(0)
    const [rollCount, setRollCount] = useState(0)

    // calls function everytime rollCount changes
    useEffect(() => {
        tenRoll(rollCount)
    }, [rollCount])

    // handler for single roll
    const handleSingleRoll = () => {
        // sets the main rolling RNG
        const rng = Math.floor(Math.random() * 1000) +1
        // pulls a random item from the data set for each star rating
        const randomFiveStar = Math.floor(Math.random() * fiveStarData.length) 
        const randomFourStar = Math.floor(Math.random() * fourStarData.length)
        const randomThreeStar = Math.floor(Math.random() * threeStarData.length)
        
        // check if ten pity count has hit
        if (tenPityCount === 9) {
            setRoll(fourStarData[randomFourStar].name)
            setTenPityCount(0)
            console.log('obtained a 4 star through pity')
            return;
        } 

        // check if 90 pity count has hit
        if (ninetyPityCount === 89) {
            setRoll(fiveStarData[randomFiveStar].name)
            setNinetyPityCount(0)
            console.log('obtained a 5 star through pity')
            return;
        } 

        // check if rng hit 5 star which is 0.6%
        if (rng <= 6) {
            setRoll(fiveStarData[randomFiveStar].name)
            setNinetyPityCount(0)
            console.log('obtained a 5 star, resetting pity')
        // check if rng hit 4 star which is 5.1%
        } else if (rng <= 51) {
            setRoll(fourStarData[randomFourStar].name)
            setTenPityCount(0)
            // only increment for 90 pity counter b/c 10 pity resets upon hitting 4 star
            setNinetyPityCount(prevState => prevState +1)
            console.log('obtained a 4 star, resetting pity')
        // anything else is a 3 star
        } else {
            setRoll(threeStarData[randomThreeStar].name)
            // pity counter increment for both
            setTenPityCount(prevState => prevState + 1)
            setNinetyPityCount(prevState => prevState +1)
            console.log('obtained a 3 star, pity counter ++')
        }
    }

    const tenRoll = () => {
        if (rollCount === 0) {
            return
        }
        // sets the main rolling RNG
        const rng = Math.floor(Math.random() * 1000) +1
        // pulls a random item from the data set for each star rating
        const randomFiveStar = Math.floor(Math.random() * fiveStarData.length) 
        const randomFourStar = Math.floor(Math.random() * fourStarData.length)
        const randomThreeStar = Math.floor(Math.random() * threeStarData.length)
        
        // check if ten pity count has hit
        if (tenPityCount === 9) {
            setRoll(fourStarData[randomFourStar].name)
            setTenPityCount(0)
            console.log('obtained a 4 star through pity')
            setRollCount(rollCount - 1)
            return;
        }

        // check if 90 pity count has hit
        if (ninetyPityCount === 89) {
            setRoll(fiveStarData[randomFiveStar].name)
            setNinetyPityCount(0)
            console.log('obtained a 5 star through pity')
            setRollCount(rollCount - 1)
            return;
        } 

        // check if rng hit 5 star which is 0.6%
        if (rng <= 6) {
            setRoll(fiveStarData[randomFiveStar].name)
            setNinetyPityCount(0)
            console.log('obtained a 5 star, resetting pity')
        // check if rng hit 4 star which is 5.1%
        } else if (rng <= 51) {
            setRoll(fourStarData[randomFourStar].name)
            setTenPityCount(0)
            // only increment for 90 pity counter b/c 10 pity resets upon hitting 4 star
            setNinetyPityCount(prevState => prevState +1)
            console.log('obtained a 4 star, resetting pity')
        // anything else is a 3 star
        } else {
            setRoll(threeStarData[randomThreeStar].name)
            // pity counter increment for both
            setTenPityCount(prevState => prevState + 1)
            setNinetyPityCount(prevState => prevState +1)
            console.log('obtained a 3 star, pity counter ++')
        }
        setRollCount(rollCount - 1)
    }
    
    const handleTenRoll = () => {
        setRollCount(10)
    }
    return (
        <>
        <div>
            <span>
                <button onClick={handleSingleRoll} className='btn btn-primary mr-2'>Wish x1</button>
                <button onClick={handleTenRoll} className='btn btn-primary mr-2'>Wish x10</button>
                <button className='btn btn-danger'>Reset</button>
            </span>
        </div>

        <div>
               
          
               Ten Pity Count = {tenPityCount}
            <br></br>
               Ninety Pity Count = {ninetyPityCount}
            <br></br>
                Rolls = {roll}
        </div>
        </>
    )
}
