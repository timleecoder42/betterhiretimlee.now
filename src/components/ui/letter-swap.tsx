'use client';

import type { AnimationOptions} from 'framer-motion';
import { motion, stagger, useAnimate } from 'framer-motion';
import { debounce } from 'lodash';
import { useState } from 'react';

interface TextProps {
  label: string;
  reverse?: boolean;
  transition?: AnimationOptions;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | number;
  className?: string;
  onClick?: () => void;
}

interface TextPropsWithInView extends TextProps {
  inViewOnce?: boolean;
  inViewDelay?: number;
  inViewDirection?: 'up' | 'down';
}

// Original component from https://www.fancycomponents.dev/docs/components/text/letter-swap
// Enhanced with:
// 1. InView trigger support for initial animation
// 2. Mobile-friendly tap gesture support
// 3. Configurable animation direction and timing
// 4. Proper state management for animation sequences

export const LetterSwapPingPong = ({
  label,
  reverse = true,
  transition = {
    type: 'spring',
    duration: 0.7,
  },
  staggerDuration = 0.03,
  staggerFrom = 'first',
  className,
  onClick,
  ...props
}: TextProps) => {
  const [scope, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);

  const mergeTransition = (baseTransition: AnimationOptions) => ({
    ...baseTransition,
    delay: stagger(staggerDuration, {
      from: staggerFrom,
    }),
  });

  const hoverStart = debounce(
    () => {
      if (isHovered) return;
      setIsHovered(true);

      animate('.letter', { y: reverse ? '100%' : '-100%' }, mergeTransition(transition));

      animate(
        '.letter-secondary',
        {
          top: '0%',
        },
        mergeTransition(transition)
      );
    },
    100,
    { leading: true, trailing: true }
  );

  const hoverEnd = debounce(
    () => {
      setIsHovered(false);

      animate(
        '.letter',
        {
          y: 0,
        },
        mergeTransition(transition)
      );

      animate(
        '.letter-secondary',
        {
          top: reverse ? '-100%' : '100%',
        },
        mergeTransition(transition)
      );
    },
    100,
    { leading: true, trailing: true }
  );

  return (
    <motion.span
      className={`flex justify-center items-center relative overflow-hidden  ${className} `}
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{label}</span>

      {label.split('').map((letter: string, i: number) => {
        return (
          <span className="whitespace-pre relative flex" key={i}>
            <motion.span className={`relative letter`} style={{ top: 0 }}>
              {letter}
            </motion.span>
            <motion.span
              className="absolute letter-secondary "
              aria-hidden={true}
              style={{ top: reverse ? '-100%' : '100%' }}
            >
              {letter}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
};

export const LetterSwapPingPongInView = ({
  label,
  reverse = true,
  transition = {
    type: 'spring',
    duration: 0.7,
  },
  staggerDuration = 0.03,
  staggerFrom = 'first',
  className,
  onClick,
  inViewOnce = true,
  inViewDelay = 0.6,
  inViewDirection = 'up',
  ...props
}: TextPropsWithInView) => {
  const [scope, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);
  const [hasInitialAnimationCompleted, setHasInitialAnimationCompleted] = useState(false);
  const [isInitialAnimating, setIsInitialAnimating] = useState(false);

  const mergeTransition = (baseTransition: AnimationOptions) => ({
    ...baseTransition,
    delay: stagger(staggerDuration, {
      from: staggerFrom,
    }),
  });

  const startAnimation = debounce(
    () => {
      if (isHovered || isInitialAnimating) return;
      setIsHovered(true);

      animate('.letter', { y: reverse ? '100%' : '-100%' }, mergeTransition(transition));
      animate(
        '.letter-secondary',
        {
          top: '0%',
        },
        mergeTransition(transition)
      );
    },
    100,
    { leading: true, trailing: true }
  );

  const endAnimation = debounce(
    () => {
      if (isInitialAnimating) return;
      setIsHovered(false);

      animate(
        '.letter',
        {
          y: 0,
        },
        mergeTransition(transition)
      );

      animate(
        '.letter-secondary',
        {
          top: reverse ? '-100%' : '100%',
        },
        mergeTransition(transition)
      );
    },
    100,
    { leading: true, trailing: true }
  );

  const triggerAnimation = () => {
    if (hasInitialAnimationCompleted || isInitialAnimating) return;
    setIsInitialAnimating(true);

    setTimeout(() => {
      animate(
        '.letter',
        { y: inViewDirection === 'up' ? '-100%' : '100%' },
        mergeTransition(transition)
      );
      animate(
        '.letter-secondary',
        {
          top: '0%',
        },
        mergeTransition(transition)
      ).then(() => {
        animate('.letter', { y: 0 }, { duration: 0 });
        animate('.letter-secondary', { top: reverse ? '-100%' : '100%' }, { duration: 0 }).then(
          () => {
            setHasInitialAnimationCompleted(true);
            setIsInitialAnimating(false);
          }
        );
      });
    }, inViewDelay * 1000);
  };

  return (
    <motion.span
      className={`flex justify-center items-center relative overflow-hidden ${className}`}
      onHoverStart={startAnimation}
      onHoverEnd={endAnimation}
      onTapStart={startAnimation}
      onTapCancel={endAnimation}
      onTap={endAnimation}
      onClick={onClick}
      ref={scope}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: inViewOnce }}
      onViewportEnter={triggerAnimation}
      {...props}
    >
      <span className="sr-only">{label}</span>

      {label.split('').map((letter: string, i: number) => {
        return (
          <span className="whitespace-pre relative flex" key={i}>
            <motion.span className={`relative letter`} style={{ top: 0 }}>
              {letter}
            </motion.span>
            <motion.span
              className="absolute letter-secondary"
              aria-hidden={true}
              style={{ top: inViewDirection === 'up' ? '100%' : '-100%' }}
            >
              {letter}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
};
