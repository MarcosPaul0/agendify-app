export const BUTTON_VARIANTS = {
  filled: 'filled',
  outlined: 'outlined',
} as const;

export type TButtonVariants =
  (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];
