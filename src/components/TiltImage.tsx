"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function TiltCard() {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 20;
        const rotateX = -((y / rect.height) - 0.5) * 20;

        setRotate({
            x: rotateX,
            y: rotateY,
        });
    };

    return (

        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setRotate({ x: 0, y: 0 })}
            animate={{
                rotateX: rotate.x,
                rotateY: rotate.y,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
            }}
            style={{
                transformStyle: "preserve-3d",
            }}
            className="rounded-3xl "
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                }}
                className="flex h-full items-center justify-center text-3xl font-bold border-3 border-orange-200 hover:border-orange-500/60 rounded-md"
            >
                <img src="/demo_dynamic.png" alt="demo1" className='rounded-md w-full h-full  ' />
            </div>
        </motion.div>
    )
}