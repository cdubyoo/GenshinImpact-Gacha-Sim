import React, { useState, useEffect } from 'react';
import star5_data from '../data/star5_data'



export default function Rolls(props) {
    const [roll, setRoll] = useState(null)
    const [pityCount, setPityCount] = useState(0)
    console.log(star5_data)


    // handler for single roll
    const handleSingleRoll = () => {
        // sets the main rolling RNG
        const rng = Math.floor(Math.random() * 1000) +1
        // sets the rng for each item depending on star level
        const fiveStarRng = Math.floor(Math.random() * 15) + 1 // 15 items total
        const fourStarRng = Math.floor(Math.random() * 32) + 1 // 32 items total
        const threeStarRng = Math.floor(Math.random() * 13) + 1 // 13 items total 
        
        // check if rng hit 5 star which is 0.6%
        if (rng <= 6) {
            setRoll(fiveStarRng)
            console.log('obtained 5 star')
        // check if rng hit 4 star which is 5.1%
        } else if (rng <= 51) {
            setRoll(fourStarRng)
            console.log('obtained 4 star')
        // anything else is a 3 star
        } else {
            setRoll(threeStarRng)
            console.log('obtained 3 star')
            
        }
    }
        


    return (
        <>
        <div>
            <span>
                <button onClick={handleSingleRoll} className='btn btn-primary mr-2'>Wish x1</button>
                <button className='btn btn-primary mr-2'>Wish x10</button>
                <button className='btn btn-danger'>Reset</button>
            </span>
        </div>

        <div>
            <ul>
               Roll # = {roll}
            </ul>
        </div>
        </>
    )
}
