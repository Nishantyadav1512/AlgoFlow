// ─────────────────────────────────────────────
// Sorting Algorithms (with steps)
// ─────────────────────────────────────────────

export const bubbleSortSteps = (inputArray) => {
    const arr = [...inputArray];
    const steps = [];
  
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapping: [],
          sorted: []
        });
  
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: [j, j + 1],
            sorted: []
          });
        }
      }
    }
  
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...Array(arr.length).keys()]
    });
  
    return steps;
  };
  
  export const quickSortSteps = (inputArray) => {
    const arr = [...inputArray];
    const steps = [];
  
    const partition = (low, high) => {
      const pivot = arr[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        steps.push({
          array: [...arr],
          comparing: [j, high],
          swapping: [],
          sorted: []
        });
  
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({
            array: [...arr],
            comparing: [i, j],
            swapping: [i, j],
            sorted: []
          });
        }
      }
  
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i + 1, high],
        sorted: []
      });
  
      return i + 1;
    };
  
    const quickSortHelper = (low, high) => {
      if (low < high) {
        const pi = partition(low, high);
        quickSortHelper(low, pi - 1);
        quickSortHelper(pi + 1, high);
      }
    };
  
    quickSortHelper(0, arr.length - 1);
  
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...Array(arr.length).keys()]
    });
  
    return steps;
  };
  
  // ─────────────────────────────────────────────
  // Graph Algorithms (with steps)
  // ─────────────────────────────────────────────
  
  export const bfsGraphSteps = (graph) => {
    const steps = [];
    const visited = new Set();
    const queue = [1]; // Start with node ID 1
    const path = [];
  
    console.log('BFS Graph Steps - Starting with graph:', graph);
  
    while (queue.length > 0) {
      const current = queue.shift();
  
      if (!visited.has(current)) {
        visited.add(current);
        path.push(current);
  
        const step = {
          visited: Array.from(visited),
          current,
          path: [...path]
        };
        
        steps.push(step);
        console.log('BFS Step:', step);
  
        // Find all edges from current node
        const neighbors = graph.edges
          .filter(edge => edge.from === current)
          .map(edge => edge.to);
  
        neighbors.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        });
      }
    }
  
    console.log('BFS Total Steps:', steps.length);
    return steps;
  };
  
  export const dfsGraphSteps = (graph) => {
    const steps = [];
    const visited = new Set();
    const path = [];
  
    const dfs = (node) => {
      if (visited.has(node)) return;
      
      visited.add(node);
      path.push(node);
  
      steps.push({
        visited: Array.from(visited),
        current: node,
        path: [...path]
      });
  
      // Find all edges from current node
      const neighbors = graph.edges
        .filter(edge => edge.from === node)
        .map(edge => edge.to);
  
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      });
    };
  
    dfs(1); // Start with node ID 1
  
    return steps;
  };
  
  // ─────────────────────────────────────────────
  // Tree Algorithms (with steps)
  // ─────────────────────────────────────────────
  
  export const bfsTreeSteps = (tree) => {
    const steps = [];
    const visited = new Set();
    const queue = [1]; // Start with node ID 1
    const path = [];
  
    while (queue.length > 0) {
      const current = queue.shift();
  
      if (!visited.has(current)) {
        visited.add(current);
        path.push(current);
  
        steps.push({
          visited: Array.from(visited),
          current,
          path: [...path]
        });
  
        // Find children of current node
        const children = tree.nodes
          .filter(node => node.parent === current)
          .map(node => node.id);
  
        children.forEach(child => {
          if (!visited.has(child)) {
            queue.push(child);
          }
        });
      }
    }
  
    return steps;
  };
  
  export const dfsTreeSteps = (tree) => {
    const steps = [];
    const visited = new Set();
    const path = [];
  
    const dfs = (nodeId) => {
      if (visited.has(nodeId)) return;
      
      visited.add(nodeId);
      path.push(nodeId);
  
      steps.push({
        visited: Array.from(visited),
        current: nodeId,
        path: [...path]
      });
  
      // Find children of current node
      const children = tree.nodes
        .filter(node => node.parent === nodeId)
        .map(node => node.id);
  
      children.forEach(child => {
        if (!visited.has(child)) {
          dfs(child);
        }
      });
    };
  
    dfs(1); // Start with node ID 1
  
    return steps;
  };
  