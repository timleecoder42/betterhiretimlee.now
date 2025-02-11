import type { Variants } from 'framer-motion';

import { FormStatus } from '@/components/newsletter/types';

export const formVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const messageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const buttonVariants: Variants = {
  [FormStatus.Idle]: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 0 20px rgba(79, 70, 229, 0.4)',
  },
  tap: {
    scale: 0.95,
    boxShadow: '0 0 10px rgba(79, 70, 229, 0.2)',
  },
  [FormStatus.Loading]: {
    opacity: 0.75,
  },
  [FormStatus.Success]: {
    opacity: 0.75,
  },
};

export const statusVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};
