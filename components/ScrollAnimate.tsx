'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { ReactNode } from 'react';

interface ScrollAnimateProps {
    children: ReactNode;
    className?: string;
    delay?: number; // Delay in ms
    threshold?: number;
    staggerIndex?: number; // For staggered lists
    as?: React.ElementType; // To render as different tag (e.g., 'main', 'section')
}

export default function ScrollAnimate({
    children,
    className = "",
    delay = 0,
    threshold = 0.1,
    staggerIndex = 0,
    as: Component = motion.div
}: ScrollAnimateProps) {
    const { ref, controls } = useScrollAnimation(threshold);

    const variants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for "pop" effect
                delay: (delay / 1000) + (staggerIndex * 0.1)
            }
        }
    };

    // If 'as' is not a motion component, we need to wrap it or use motion(Component)
    // But for simplicity in this project, we usually use div or section.
    // To support 'as="main"', we can dynamically create the motion component if needed, 
    // or just stick to basic motion.div / motion.section if passed explicitly.
    // For now, simpler approach:

    const MotionComponent = motion(Component as any);

    return (
        <MotionComponent
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
        >
            {children}
        </MotionComponent>
    );
}
