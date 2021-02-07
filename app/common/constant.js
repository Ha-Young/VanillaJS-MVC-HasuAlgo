const distance = 5;
export const LIMIT_MAX_NUMBER = 50;
export const LIMIT_MIN_NUMBER = 1;
export const LIMIT_NUMBERS_OF = 10;

const rect = {
  WIDTH: 45,
};

const text = {
  SIZE: '.35em',
  X_POS: 22.5,
  Y_POS_DISTANCE: 15,
  BASE_HEIGHT: 30,
};

export const ITEM = {
  RECT: rect,
  TEXT: text,
  DISTANCE_X_POS: rect.WIDTH + distance,
  FIRST_X_POS: 475,
  MAX_HEIGHT: 230,
};

export const ARROW = {
  DISTANCE_XPOS: 10,
  DISTANCE_YPOS: 30,
};

export const THEME = {
  LIGHT_THEME: 'light',
  DARK_THEME: 'dark',
};

export const SORT_TYPE = {
  INSERT: 'insert',
  QUICK: 'quick',
};

export const PIVOT_KINDS = {
  MID: 'mid',
  FIRST: 'first',
  END: 'end',
};

export const SORT_STATUS = {
  SORTED: 'sorted',
  SELECTED: 'selected',
  CHECK: 'check',
  PIVOT: 'pivot',
  SMALL: 'small',
  LARGE: 'large',
}

export const ARROW_TYPE = {
  LEFT: 'left',
  RIGHT: 'right',
}

export default {
  LIMIT_MAX_NUMBER,
  LIMIT_MIN_NUMBER,
  LIMIT_NUMBERS_OF,
};
