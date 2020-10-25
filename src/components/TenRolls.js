import React from 'react'
import Rolls from './Rolls'

export default function TenRolls() {
    for (i = 0; i < 10; i++) {
        Rolls()
    }
    return (
        <div>
            Ten Rolls Result
        </div>
    )
}
