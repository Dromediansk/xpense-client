export enum Size {
  TINY = '4px',
  SMALL = '8px',
  MEDIUM = '12px',
  LARGE = '16px',
  X_LARGE = '24px',
  XX_LARGE = '32px',
  HUGE = '64px',
}

export const sizes = Object.values(Size).map(size => size);
