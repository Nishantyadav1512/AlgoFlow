// ──────────────────────────────
// Generate Random Array for Sorting
// ──────────────────────────────

export const generateRandomArray = (size = 30, min = 10, max = 200) => {
    const array = Array.from({ length: size }, () =>
      Math.floor(Math.random() * (max - min + 1)) + min
    );
  
    return {
      array,
      comparing: [],
      swapping: [],
      sorted: [],
    };
  };
  
  // ──────────────────────────────
  // Generate Complex Graph (Nodes & Edges)
  // ──────────────────────────────
  
  export const generateSampleGraph = () => {
    const nodes = [
      { id: 1, label: 'A', x: 100, y: 50 },
      { id: 2, label: 'B', x: 200, y: 50 },
      { id: 3, label: 'C', x: 300, y: 50 },
      { id: 4, label: 'D', x: 150, y: 120 },
      { id: 5, label: 'E', x: 250, y: 120 },
      { id: 6, label: 'F', x: 350, y: 120 },
      { id: 7, label: 'G', x: 50, y: 190 },
      { id: 8, label: 'H', x: 100, y: 190 },
      { id: 9, label: 'I', x: 200, y: 190 },
      { id: 10, label: 'J', x: 300, y: 190 },
      { id: 11, label: 'K', x: 350, y: 190 },
      { id: 12, label: 'L', x: 400, y: 190 }
    ];
  
    const edges = [
      { from: 1, to: 2 },
      { from: 1, to: 4 },
      { from: 2, to: 3 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
      { from: 4, to: 7 },
      { from: 4, to: 8 },
      { from: 4, to: 9 },
      { from: 5, to: 9 },
      { from: 5, to: 10 },
      { from: 6, to: 10 },
      { from: 6, to: 11 },
      { from: 6, to: 12 },
      { from: 7, to: 8 },
      { from: 8, to: 9 },
      { from: 9, to: 10 },
      { from: 10, to: 11 },
      { from: 11, to: 12 }
    ];
  
    return {
      nodes,
      edges,
      visited: [],
      current: null,
      path: []
    };
  };
  
  // ──────────────────────────────
  // Generate Complex Tree (Binary Tree Style)
  // ──────────────────────────────
  
  export const generateSampleTree = () => {
    const nodes = [
      { id: 1, label: 'A', x: 200, y: 30, parent: null },
      { id: 2, label: 'B', x: 100, y: 80, parent: 1 },
      { id: 3, label: 'C', x: 300, y: 80, parent: 1 },
      { id: 4, label: 'D', x: 50, y: 130, parent: 2 },
      { id: 5, label: 'E', x: 150, y: 130, parent: 2 },
      { id: 6, label: 'F', x: 250, y: 130, parent: 3 },
      { id: 7, label: 'G', x: 350, y: 130, parent: 3 },
      { id: 8, label: 'H', x: 25, y: 180, parent: 4 },
      { id: 9, label: 'I', x: 75, y: 180, parent: 4 },
      { id: 10, label: 'J', x: 125, y: 180, parent: 5 },
      { id: 11, label: 'K', x: 175, y: 180, parent: 5 },
      { id: 12, label: 'L', x: 225, y: 180, parent: 6 },
      { id: 13, label: 'M', x: 275, y: 180, parent: 6 },
      { id: 14, label: 'N', x: 325, y: 180, parent: 7 },
      { id: 15, label: 'O', x: 375, y: 180, parent: 7 },
      { id: 16, label: 'P', x: 12, y: 230, parent: 8 },
      { id: 17, label: 'Q', x: 38, y: 230, parent: 8 },
      { id: 18, label: 'R', x: 62, y: 230, parent: 9 },
      { id: 19, label: 'S', x: 88, y: 230, parent: 9 },
      { id: 20, label: 'T', x: 112, y: 230, parent: 10 },
      { id: 21, label: 'U', x: 138, y: 230, parent: 10 },
      { id: 22, label: 'V', x: 162, y: 230, parent: 11 },
      { id: 23, label: 'W', x: 188, y: 230, parent: 11 },
      { id: 24, label: 'X', x: 212, y: 230, parent: 12 },
      { id: 25, label: 'Y', x: 238, y: 230, parent: 12 },
      { id: 26, label: 'Z', x: 262, y: 230, parent: 13 },
      { id: 27, label: 'AA', x: 288, y: 230, parent: 13 },
      { id: 28, label: 'BB', x: 312, y: 230, parent: 14 },
      { id: 29, label: 'CC', x: 338, y: 230, parent: 14 },
      { id: 30, label: 'DD', x: 362, y: 230, parent: 15 },
      { id: 31, label: 'EE', x: 388, y: 230, parent: 15 }
    ];
  
    return {
      nodes,
      visited: [],
      current: null,
      path: []
    };
  };
  