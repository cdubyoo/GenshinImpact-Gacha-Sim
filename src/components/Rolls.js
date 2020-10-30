import React, { useState, useEffect } from 'react';
import fiveStarData from '../data/5star'
import fourStarData from '../data/4star'
import threeStarData from '../data/3star'



export default function Rolls() {
    
    // roll state
    const [roll, setRoll] = useState()
    
    // pity count state
    const [tenPityCount, setTenPityCount] = useState(0)
    const [ninetyPityCount, setNinetyPityCount] = useState(0)

    // roll count for 10x wishes
    const [rollCount, setRollCount] = useState(0)
    

    // roll result on page
    const [currentRolls, setCurrentRolls] = useState([])

    // total rolls
    const [totalRolls, setTotalRolls] = useState(0)

    // inventory state
    const [inventory, setInventory] = useState([])

    // render out roll results
    const rollResults = currentRolls.map((item) => 
        <div className="col col-sm-auto">
            <figure>
                <img src={item.image} className="item"/>
                <figcaption>{item.name}</figcaption>
            </figure>
        </div>
    )

    // render out inventory list
    const inventoryItem = inventory.map((item) => 
        <div>
            {item.name}
            <span className="float-right">
            {item.rating}
            
            <svg width="1em" height="1em" viewBox="0 0 16 16" className=" pb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
            </svg>
            </span>
        </div>
    )
       
    // calls function everytime rollCount changes, decrement each time from 10
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


        const newFiveStar = fiveStarData[randomFiveStar]
        const newFourStar = fourStarData[randomFourStar]
        const newThreeStar = threeStarData[randomThreeStar]

        // reset roll result on new roll
        setCurrentRolls([])
        
        // check if ten pity count has hit
        if (tenPityCount === 9) {
            setRoll(fourStarData[randomFourStar].name)
            setTenPityCount(0)
            console.log('obtained a 4 star through pity')
            setCurrentRolls(prevState => [...prevState, newFourStar])
            setTotalRolls(prevState => prevState +1)
            return;
        } 

        // check if 90 pity count has hit
        if (ninetyPityCount === 89) {
            setRoll(fiveStarData[randomFiveStar].name)
            setNinetyPityCount(0)
            console.log('obtained a 5 star through pity')
            setCurrentRolls(prevState => [...prevState, newFiveStar])
            setTotalRolls(prevState => prevState +1)
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
        setCurrentRolls(prevState => [...prevState, newThreeStar])
        setTotalRolls(prevState => prevState +1)
        
        const exists = inventory.find(p => p.name === threeStarData[randomThreeStar].name)
        if (exists) return
        else {
            setInventory(prevState => [...prevState, newThreeStar])
        }
    
  
        // setInventory(prevState => [...prevState, newThreeStar])
    }

    


    const tenRoll = () => {
        // if roll count hits 0, stop function
        if (rollCount === 0) {
            return
        }

        // reset roll result on every try
        if (rollCount === 10) {
            setCurrentRolls([])
        }

        // sets the main rolling RNG
        const rng = Math.floor(Math.random() * 1000) +1
        // pulls a random item from the data set for each star rating
        const randomFiveStar = Math.floor(Math.random() * fiveStarData.length) 
        const randomFourStar = Math.floor(Math.random() * fourStarData.length)
        const randomThreeStar = Math.floor(Math.random() * threeStarData.length)

        const newFiveStar = fiveStarData[randomFiveStar]
        const newFourStar = fourStarData[randomFourStar]
        const newThreeStar = threeStarData[randomThreeStar]
        
        // check if ten pity count has hit
        if (tenPityCount === 9) {
            setRoll(fourStarData[randomFourStar].name)
            setTenPityCount(0)
            console.log('obtained a 4 star through pity')
            setRollCount(rollCount - 1)
            setCurrentRolls(prevState => [...prevState, newFourStar])
            setTotalRolls(prevState => prevState +1)
            return;
        }

        // check if 90 pity count has hit
        if (ninetyPityCount === 89) {
            setRoll(fiveStarData[randomFiveStar].name)
            setNinetyPityCount(0)
            console.log('obtained a 5 star through pity')
            setRollCount(rollCount - 1)
            setCurrentRolls(prevState => [...prevState, newFiveStar])
            setTotalRolls(prevState => prevState +1)
            return;
        } 

        // check if rng hit 5 star which is 0.6%
        if (rng <= 6) {
            setRoll(fiveStarData[randomFiveStar].name)
            setNinetyPityCount(0)
            setCurrentRolls(prevState => [...prevState, newFiveStar])
            console.log('obtained a 5 star, resetting pity')
        // check if rng hit 4 star which is 5.1%
        } else if (rng <= 51) {
            setRoll(fourStarData[randomFourStar].name)
            setTenPityCount(0)
            // only increment for 90 pity counter b/c 10 pity resets upon hitting 4 star
            setNinetyPityCount(prevState => prevState +1)
            setCurrentRolls(prevState => [...prevState, newFourStar])
            console.log('obtained a 4 star, resetting pity')
        // anything else is a 3 star
        } else {
            setRoll(threeStarData[randomThreeStar].name)
            setTenPityCount(prevState => prevState + 1)
            setNinetyPityCount(prevState => prevState +1)
            console.log('obtained a 3 star, pity counter ++')
            setCurrentRolls(prevState => [...prevState, newThreeStar])
        }
        setRollCount(rollCount - 1)
        setTotalRolls(prevState => prevState +1)

    }
    
    // handler for ten roll
    const handleTenRoll = () => {
        // set rollcount state to 10 again, calls useEffect and runs tenRoll()
        setRollCount(10)
    }

    // reset all state
    const handleReset = () => {
        setRoll(null)
        setTenPityCount(0)
        setNinetyPityCount(0)
        setCurrentRolls([])
        setInventory([])
    }

    return (
        <>
        <img src="https://www.freemmostation.com/wp-content/uploads/2020/10/Wanderlust-Banner.jpg"/>
        <div className="container">
            <div className="row">
                <div className="col-8 pt-1">
                    <span>
                        <button onClick={handleSingleRoll} className='btn btn-primary mr-2'>Wish x1</button>
                        <button onClick={handleTenRoll} className='btn btn-primary mr-2'>Wish x10</button>
                        <button onClick={handleReset} className='btn btn-danger'>Reset</button>
                    </span>
                    <div>
                        Ten Pity Count = {tenPityCount}
                        <br></br>
                        Ninety Pity Count = {ninetyPityCount}
                        <br></br>
                            Current Roll = {roll}
                        <div className="container">
                            <div className="row">
                                {rollResults}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-4 pt-1">
                    <span className="d-block p-2 bg-primary text-white">
                        Inventory
                        <span className='float-right'>
                            Spent : ${totalRolls * 2}
                        </span>
                    </span>
                    {inventoryItem}
                    

                </div>
            </div>
        </div>
        </>
    )
}
