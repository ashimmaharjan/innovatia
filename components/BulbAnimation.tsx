"use client";

import React from 'react'
import Lottie from "lottie-react";
import bulbAnimationJson from "../public/bulb-animation.json"

const BulbAnimation = () => {
    return (
        <div>
            <Lottie
                animationData={bulbAnimationJson}
                loop
                autoPlay
                className="w-[40px] h-[40px]"
            />
        </div>
    )
}
export default BulbAnimation
