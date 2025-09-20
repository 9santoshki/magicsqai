// Puzzle configurations for the BODMAS Challenge
export const puzzleConfigs = [
  // Puzzle 1: Medium
  {
    id: 1,
    name: "Puzzle 1: Medium",
    grid: [
      [
        { value: '5', fixed: true },
        { value: '', fixed: false },
        { value: '', fixed: false },
        { value: '', fixed: false },
        { value: '8', fixed: true }
      ],
      [
        { value: '', fixed: false },
        { value: '3', fixed: true },
        { value: '', fixed: false },
        { value: '1', fixed: true },
        { value: '', fixed: false }
      ],
      [
        { value: '', fixed: false },
        { value: '', fixed: false },
        { value: '1', fixed: true },
        { value: '', fixed: false },
        { value: '5', fixed: true }
      ],
      [
        { value: '', fixed: false },
        { value: '', fixed: false },
        { value: '7', fixed: true },
        { value: '4', fixed: true },
        { value: '', fixed: false }
      ],
      [
        { value: '7', fixed: true },
        { value: '2', fixed: true },
        { value: '', fixed: false },
        { value: '', fixed: false },
        { value: '', fixed: false }
      ]
    ],
    rowOperators: [
      ['+', '*', '/', '-'],
      ['/', '*', '-', '+'],
      ['+', '/', '*', '-'],
      ['*', '+', '-', '/'],
      ['+', '-', '*', '/']
    ],
    colOperators: [
      ['+', '/', '+', '+', '/'],
      ['*', '+', '/', '*', '-'],
      ['/', '-', '-', '/', '+'],
      ['-', '*', '*', '-', '*']
    ],
    rowTargets: [9, 18, 55, 10, -6],
    colTargets: [34, -1, -12, -1, -1],
    answers: [
      [5, 6, 4, 2, 8],
      [9, 3, 5, 1, 4],
      [4, 7, 1, 8, 5],
      [1, 5, 7, 4, 2],
      [7, 2, 3, 5, 1]
    ],
    difficulty: 3
  },

  // Puzzle 2: Medium
{
  id: 2,
  name: "Puzzle 2: Medium",
  grid: [
    [
      { value: '1', fixed: true },
      { value: '', fixed: false },
      { value: '', fixed: false },
      { value: '', fixed: false },
      { value: '9', fixed: true }
    ],
    [
      { value: '', fixed: false },
      { value: '1', fixed: true },
      { value: '', fixed: false },
      { value: '7', fixed: true },
      { value: '', fixed: false }
    ],
    [
      { value: '', fixed: false },
      { value: '', fixed: false },
      { value: '1', fixed: true },
      { value: '', fixed: false },
      { value: '5', fixed: true }
    ],
    [
      { value: '', fixed: false },
      { value: '', fixed: false },
      { value: '7', fixed: true },
      { value: '2', fixed: true },
      { value: '', fixed: false }
    ],
    [
      { value: '7', fixed: true },
      { value: '2', fixed: true },
      { value: '', fixed: false },
      { value: '', fixed: false },
      { value: '', fixed: false }
    ]
  ],
  rowOperators: [
    ['+', '*', '/', '-'],
    ['/', '*', '-', '+'],
    ['+', '/', '*', '-'],
    ['*', '+', '-', '/'],
    ['+', '-', '*', '/']
  ],
  colOperators: [
    ['+', '/', '+', '+', '/'],
    ['*', '+', '/', '*', '-'],
    ['/', '-', '-', '/', '+'],
    ['-', '*', '*', '-', '*']
  ],
  rowTargets: [6, 6, 28, 20, 20],
  colTargets: [0, -10, -8, 26, 0],
  answers: [
    [1, 7, 8, 4, 9],
    [2, 1, 5, 7, 3],
    [9, 3, 1, 8, 5],
    [3, 5, 7, 2, 1],
    [7, 2, 3, 6, 2]
  ],
  difficulty: 3
},

// Puzzle 3: Easy
{
  id: 3,
  name: "Puzzle 3: Easy",
  grid: [
    [
      { value: '3', fixed: true },
      { value: '', fixed: false },
      { value: '4', fixed: true },
      { value: '', fixed: false },
      { value: '1', fixed: true }
    ],
    [
      { value: '', fixed: false },
      { value: '4', fixed: true },
      { value: '2', fixed: true },
      { value: '1', fixed: true },
      { value: '', fixed: false }
    ],
    [
      { value: '5', fixed: true },
      { value: '', fixed: false },
      { value: '', fixed: false },
      { value: '4', fixed: true },
      { value: '2', fixed: true }
    ],
    [
      { value: '', fixed: false },
      { value: '6', fixed: true },
      { value: '3', fixed: true },
      { value: '', fixed: false },
      { value: '5', fixed: true }
    ],
    [
      { value: '8', fixed: true },
      { value: '2', fixed: true },
      { value: '', fixed: false },
      { value: '3', fixed: true },
      { value: '', fixed: false }
    ]
  ],
  rowOperators: [
    ['+', '*', '-', '/'],
    ['-', '*', '/', '+'],
    ['/', '+', '*', '-'],
    ['*', '/', '+', '-'],
    ['/', '*', '-', '+']
  ],
 colOperators: [
    ['-', '+', '/', '+', '*'],
    ['+', '/', '*', '-', '/'],
    ['/', '-', '-', '/', '+'],
    ['*', '*', '+', '*', '-']
  ],
  rowTargets: [32, 7, 35, -1, 25],
  colTargets: [36, 1, 19, 2, 5],
  answers: [
    [3, 9, 4, 7, 1],
    [7, 4, 2, 1, 8],
    [5, 1, 8, 4, 2],
    [1, 6, 3, 2, 5],
    [8, 2, 6, 3, 4]
  ],
  difficulty: 2
},

// Puzzle 4: Easy
{
  id: 4,
  name: "Puzzle 4: Easy",
  grid: [
    [
      { value: '7', fixed: true },
      { value: '', fixed: false },
      { value: '8', fixed: true },
      { value: '', fixed: false },
      { value: '2', fixed: true }
    ],
    [
      { value: '', fixed: false },
      { value: '6', fixed: true },
      { value: '4', fixed: true },
      { value: '2', fixed: true },
      { value: '', fixed: false }
    ],
    [
      { value: '9', fixed: true },
      { value: '', fixed: false },
      { value: '', fixed: false },
      { value: '6', fixed: true },
      { value: '1', fixed: true }
    ],
    [
      { value: '', fixed: false },
      { value: '4', fixed: true },
      { value: '2', fixed: true },
      { value: '', fixed: false },
      { value: '5', fixed: true }
    ],
    [
      { value: '6', fixed: true },
      { value: '2', fixed: true },
      { value: '', fixed: false },
      { value: '7', fixed: true },
      { value: '', fixed: false }
    ]
  ],
  rowOperators: [
    ['+', '*', '-', '/'],
    ['-', '*', '/', '+'],
    ['/', '+', '*', '-'],
    ['*', '/', '+', '-'],
    ['/', '*', '-', '+']
  ],
  colOperators: [
    ['-', '+', '/', '+', '*'],
    ['+', '/', '*', '-', '/'],
    ['/', '-', '-', '/', '+'],
    ['*', '*', '+', '*', '-']
  ],
  rowTargets: [77, -1, 44, 0, 12],
  colTargets: [58, 3, 17, -8, 17],
  answers: [
    [7, 9, 8, 4, 2],
    [3, 6, 4, 2, 8],
    [9, 3, 7, 6, 1],
    [1, 4, 2, 3, 5],
    [6, 2, 5, 7, 4]
  ],
  difficulty: 2
},

// Puzzle 5: Very Easy
{
  id: 5,
  name: "Puzzle 5: Very Easy",
  grid: [
    [
      { value: '', fixed: false },
      { value: '4', fixed: true },
      { value: '2', fixed: true },
      { value: '5', fixed: true },
      { value: '1', fixed: true }
    ],
    [
      { value: '9', fixed: true },
      { value: '', fixed: false },
      { value: '8', fixed: true },
      { value: '1', fixed: true },
      { value: '6', fixed: true }
    ],
    [
      { value: '7', fixed: true },
      { value: '5', fixed: true },
      { value: '', fixed: false },
      { value: '2', fixed: true },
      { value: '3', fixed: true }
    ],
    [
      { value: '1', fixed: true },
      { value: '8', fixed: true },
      { value: '5', fixed: true },
      { value: '', fixed: false },
      { value: '2', fixed: true }
    ],
    [
      { value: '3', fixed: true },
      { value: '4', fixed: true },
      { value: '1', fixed: true },
      { value: '9', fixed: true },
      { value: '', fixed: false }
    ]
  ],
  rowOperators: [
    ['*', '/', '-', '+'],
    ['/', '+', '*', '-'],
    ['+', '-', '/', '*'],
    ['-', '*', '+', '/'],
    ['-', '/', '*', '+']
  ],
  colOperators: [
    ['+', '*', '-', '/', '+'],
    ['*', '-', '/', '+', '/'],
    ['/', '+', '*', '-', '*'],
    ['-', '/', '+', '*', '-']
  ],
  rowTargets: [37, 5, 6, -36, -26],
  colTargets: [68, 9, -7, -47, -2],
  answers: [
    [8, 4, 2, 5, 1],
    [9, 3, 8, 1, 6],
    [7, 5, 4, 2, 3],
    [1, 8, 5, 6, 2],
    [3, 4, 1, 9, 7]
  ],
  difficulty: 1
},

// Puzzle 6: Easy
{
  id: 6,
  name: "Puzzle 6: Easy",
  grid: [
    [
      { value: '5', fixed: true },
      { value: '', fixed: false },
      { value: '3', fixed: true },
      { value: '', fixed: false },
      { value: '4', fixed: true }
    ],
    [
      { value: '', fixed: false },
      { value: '3', fixed: true },
      { value: '8', fixed: true },
      { value: '4', fixed: true },
      { value: '', fixed: false }
    ],
    [
      { value: '4', fixed: true },
      { value: '', fixed: false },
      { value: '', fixed: false },
      { value: '1', fixed: true },
      { value: '3', fixed: true }
    ],
    [
      { value: '', fixed: false },
      { value: '4', fixed: true },
      { value: '5', fixed: true },
      { value: '', fixed: false },
      { value: '1', fixed: true }
    ],
    [
      { value: '3', fixed: true },
      { value: '2', fixed: true },
      { value: '', fixed: false },
      { value: '9', fixed: true },
      { value: '', fixed: false }
    ]
  ],
  rowOperators: [
    ['*', '/', '-', '+'],
    ['/', '+', '*', '-'],
    ['+', '-', '/', '*'],
    ['-', '*', '+', '/'],
    ['-', '/', '*', '+']
  ],
  colOperators: [
    ['+', '*', '-', '/', '+'],
    ['*', '-', '/', '+', '/'],
    ['/', '+', '*', '-', '*'],
    ['-', '/', '+', '*', '-']
  ],
  rowTargets: [11, 25, 3, -11, -10],
  colTargets: [14, 24, -16, -60, 2],
  answers: [
    [5, 9, 3, 8, 4],
    [6, 3, 8, 4, 9],
    [4, 5, 2, 1, 3],
    [2, 4, 5, 7, 1],
    [3, 2, 1, 9, 5]
  ],
  difficulty: 2
},

// Puzzle 7: Easy
{
  id: 7,
  name: "Puzzle 7: Easy",
  grid: [
    [
      { value: '5', fixed: true },
      { value: '', fixed: false },
      { value: '9', fixed: true },
      { value: '', fixed: false },
      { value: '6', fixed: true }
    ],
    [
      { value: '', fixed: false },
      { value: '8', fixed: true },
      { value: '1', fixed: true },
      { value: '6', fixed: true },
      { value: '', fixed: false }
    ],
    [
      { value: '1', fixed: true },
      { value: '', fixed: false },
      { value: '', fixed: false },
      { value: '2', fixed: true },
      { value: '7', fixed: true }
    ],
    [
      { value: '', fixed: false },
      { value: '3', fixed: true },
      { value: '4', fixed: true },
      { value: '', fixed: false },
      { value: '8', fixed: true }
    ],
    [
      { value: '4', fixed: true },
      { value: '2', fixed: true },
      { value: '', fixed: false },
      { value: '7', fixed: true },
      { value: '', fixed: false }
    ]
  ],
  rowOperators: [
    ['*', '-', '/', '+'],
    ['+', '/', '-', '*'],
    ['-', '+', '/', '*'],
    ['/', '+', '-', '*'],
    ['+', '*', '-', '/']
  ],
  colOperators: [
    ['*', '*', '-', '*', '/'],
    ['/', '/', '+', '-', '*'],
    ['-', '-', '/', '/', '-'],
    ['+', '+', '*', '+', '+']
  ],
  rowTargets: [38, 3, 25, -1, 3],
  colTargets: [30, 13, 14, 23, 14],
  answers: [
    [5, 7, 9, 3, 6],
    [7, 8, 1, 6, 2],
    [1, 4, 8, 2, 7],
    [9, 3, 4, 1, 8],
    [4, 2, 3, 7, 1]
  ],
  difficulty: 2
},

// Puzzle 8: Easy
{
  id: 8,
  name: "Puzzle 8: Easy",
  grid: [
    [
      { value: '8', fixed: true },
      { value: '', fixed: false },
      { value: '5', fixed: true },
      { value: '', fixed: false },
      { value: '6', fixed: true }
    ],
    [
      { value: '', fixed: false },
      { value: '6', fixed: true },
      { value: '2', fixed: true },
      { value: '7', fixed: true },
      { value: '', fixed: false }
    ],
    [
      { value: '2', fixed: true },
      { value: '', fixed: false },
      { value: '', fixed: false },
      { value: '4', fixed: true },
      { value: '7', fixed: true }
    ],
    [
      { value: '', fixed: false },
      { value: '3', fixed: true },
      { value: '4', fixed: true },
      { value: '', fixed: false },
      { value: '8', fixed: true }
    ],
    [
      { value: '7', fixed: true },
      { value: '4', fixed: true },
      { value: '', fixed: false },
      { value: '5', fixed: true },
      { value: '', fixed: false }
    ]
  ],
  rowOperators: [
    ['*', '-', '/', '+'],
    ['+', '/', '-', '*'],
    ['-', '+', '/', '*'],
    ['/', '+', '-', '*'],
    ['+', '*', '-', '/']
  ],
  colOperators: [
    ['*', '*', '-', '*', '/'],
    ['/', '/', '+', '-', '*'],
    ['-', '-', '/', '/', '-'],
    ['+', '+', '*', '+', '+']
  ],
  rowTargets: [57, -14, 15, -10, 38],
  colTargets: [17, 43, 21, 10, 7],
  answers: [
    [8, 7, 5, 1, 6],
    [4, 6, 2, 7, 3],
    [2, 1, 8, 4, 7],
    [6, 3, 4, 2, 8],
    [7, 4, 9, 5, 1]
  ],
  difficulty: 2
}
];
