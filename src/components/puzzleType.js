// Type definitions for the BODMAS puzzle

export const PuzzleConfig = {
  difficulty: 'number',
  grid: 'array', // Array of arrays containing cell objects
  rowOperators: 'array', // Array of arrays containing operators for rows
  colOperators: 'array', // Array of arrays containing operators for columns
  rowTargets: 'array', // Array of target values for each row
  colTargets: 'array', // Array of target values for each column
  answers: 'array' // Array of arrays containing the correct answers
};

export const CellType = {
  value: 'string|number',
  fixed: 'boolean'
};
