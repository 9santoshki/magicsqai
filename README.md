# BODMAS Challenge - Daily Mathematical Puzzle

A React-based mathematical puzzle game that challenges players to solve BODMAS (order of operations) equations in a 5x5 grid format.

## Features

- **Daily Puzzles**: Different puzzle each day based on date
- **Interactive Grid**: 5x5 mathematical equation grid
- **Timer**: Track your solving time
- **Difficulty Levels**: Varying difficulty from Very Easy to Hard
- **Social Sharing**: Share your results on Facebook, Twitter, WhatsApp, and LinkedIn
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Validation**: Check your solution as you progress

## Game Rules

1. **BODMAS Rule**: Evaluate left to right in rows, top to bottom in columns
2. **Fill Empty Cells**: Use digits 1-9 to complete all equations
3. **Unique Digits**: Each digit may appear only once per row or column equation
4. **Complete Grid**: All digits 1-9 must be used at least once in the complete grid

## How to Play

1. Click on an empty cell to select it
2. Use the number buttons (1-9) to enter values
3. Follow BODMAS order of operations
4. Use the Clear button to remove a number from selected cell
5. Use Reset to start over
6. Click Submit to check your solution

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd bodmas-puzzle

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## Technologies Used

- **React 19**: Frontend framework
- **Vite**: Build tool and development server
- **React Icons**: Icon library for UI elements
- **html2canvas**: For screenshot functionality
- **Tailwind CSS**: Styling framework

## Project Structure

```
src/
├── components/
│   ├── BODMASPuzzle.jsx      # Main puzzle component
│   ├── DifficultyLevel.jsx   # Difficulty indicator
│   ├── puzzleConfigs.js      # Puzzle data configurations
│   └── puzzleType.js         # Type definitions
├── App.jsx                   # Main app component
├── App.css                   # Global styles
└── main.jsx                  # Entry point
```

## Puzzle Configuration

The game includes 8 pre-configured puzzles with varying difficulty levels:
- Very Easy (5 blanks)
- Easy (10 blanks) 
- Medium (15 blanks)

Each puzzle contains:
- 5x5 grid with fixed and empty cells
- Row and column operators (+, -, *, /)
- Target values for each row and column
- Complete solution for validation

## Development

To add new puzzles, modify the `puzzleConfigs.js` file with new puzzle objects containing:
- `grid`: 5x5 array of cell objects with value and fixed properties
- `rowOperators`: 4x5 array of operators for rows
- `colOperators`: 4x5 array of operators for columns  
- `rowTargets`: Array of 5 target values for rows
- `colTargets`: Array of 5 target values for columns
- `answers`: 5x5 array with complete solution
- `difficulty`: Number of empty cells

## License

This project is open source and available under the MIT License.
