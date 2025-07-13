import React, { useState, useEffect, useCallback, useRef } from 'react'
import TabSelector from './TabSelector'
import ControlPanel from './ControlPanel'
import SortingVisualizer from './Sortingvisualizer.jsx'
import GraphVisualizer from './GraphVisualizer.jsx'
import TreeVisualizer from './TreeVisualizer.jsx'
import Legend from './Legend.jsx'
import { generateRandomArray, generateSampleGraph, generateSampleTree } from '../utils/dataGenerators.js'
import './Algovisualizer.css'
import logo from '../assets/myicon.png'

const Algovisulizer = () => {
  const [activeTab, setActiveTab] = useState('sorting');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [currentStep, setCurrentStep] = useState(0);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [totalSteps, setTotalSteps] = useState(0);
  const intervalRef = useRef(null);

  // Sorting state
  const [array, setArray] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sorted, setSorted] = useState([]);

  // Graph state
  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
    visited: [],
    current: null,
    path: []
  });

  // Tree state
  const [tree, setTree] = useState({
    nodes: [],
    visited: [],
    current: null,
    path: []
  });

  // Generate random array
  const generateArray = useCallback((size = 20) => {
    console.log('Generating new array with size:', size);
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 10);
    console.log('Generated array:', newArray);
    setArray(newArray);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  // Generate sample graph
  const generateGraph = useCallback(() => {
    const nodes = [
      { id: 0, x: 100, y: 100, label: 'A' },
      { id: 1, x: 200, y: 50, label: 'B' },
      { id: 2, x: 200, y: 150, label: 'C' },
      { id: 3, x: 300, y: 100, label: 'D' },
      { id: 4, x: 400, y: 50, label: 'E' },
      { id: 5, x: 400, y: 150, label: 'F' },
      { id: 6, x: 500, y: 100, label: 'G' },
      { id: 7, x: 600, y: 50, label: 'H' },
      { id: 8, x: 600, y: 150, label: 'I' },
      { id: 9, x: 150, y: 200, label: 'J' },
      { id: 10, x: 250, y: 200, label: 'K' },
      { id: 11, x: 350, y: 200, label: 'L' },
      { id: 12, x: 450, y: 200, label: 'M' },
      { id: 13, x: 550, y: 200, label: 'N' },
      { id: 14, x: 650, y: 200, label: 'O' }
    ];

    const edges = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 3, to: 5 },
      { from: 4, to: 6 },
      { from: 5, to: 6 },
      { from: 6, to: 7 },
      { from: 6, to: 8 },
      { from: 0, to: 9 },
      { from: 1, to: 10 },
      { from: 2, to: 10 },
      { from: 3, to: 11 },
      { from: 4, to: 12 },
      { from: 5, to: 12 },
      { from: 6, to: 13 },
      { from: 7, to: 14 },
      { from: 8, to: 14 },
      { from: 9, to: 10 },
      { from: 10, to: 11 },
      { from: 11, to: 12 },
      { from: 12, to: 13 },
      { from: 13, to: 14 },
      { from: 9, to: 11 },
      { from: 10, to: 12 },
      { from: 11, to: 13 },
      { from: 12, to: 14 }
    ];

    setGraph({
      nodes,
      edges,
      visited: [],
      current: null,
      path: []
    });
    setCurrentStep(0);
  }, []);

  // Generate sample tree
  const generateTree = useCallback(() => {
    const nodes = [
      { id: 0, x: 400, y: 50, label: '1', parent: null },
      { id: 1, x: 200, y: 120, label: '2', parent: 0 },
      { id: 2, x: 600, y: 120, label: '3', parent: 0 },
      { id: 3, x: 100, y: 190, label: '4', parent: 1 },
      { id: 4, x: 300, y: 190, label: '5', parent: 1 },
      { id: 5, x: 500, y: 190, label: '6', parent: 2 },
      { id: 6, x: 700, y: 190, label: '7', parent: 2 },
      { id: 7, x: 50, y: 260, label: '8', parent: 3 },
      { id: 8, x: 150, y: 260, label: '9', parent: 3 },
      { id: 9, x: 250, y: 260, label: '10', parent: 4 },
      { id: 10, x: 350, y: 260, label: '11', parent: 4 },
      { id: 11, x: 450, y: 260, label: '12', parent: 5 },
      { id: 12, x: 550, y: 260, label: '13', parent: 5 },
      { id: 13, x: 650, y: 260, label: '14', parent: 6 },
      { id: 14, x: 750, y: 260, label: '15', parent: 6 },
      { id: 15, x: 25, y: 330, label: '16', parent: 7 },
      { id: 16, x: 75, y: 330, label: '17', parent: 7 },
      { id: 17, x: 125, y: 330, label: '18', parent: 8 },
      { id: 18, x: 175, y: 330, label: '19', parent: 8 },
      { id: 19, x: 225, y: 330, label: '20', parent: 9 },
      { id: 20, x: 275, y: 330, label: '21', parent: 9 },
      { id: 21, x: 325, y: 330, label: '22', parent: 10 },
      { id: 22, x: 375, y: 330, label: '23', parent: 10 },
      { id: 23, x: 425, y: 330, label: '24', parent: 11 },
      { id: 24, x: 475, y: 330, label: '25', parent: 11 },
      { id: 25, x: 525, y: 330, label: '26', parent: 12 },
      { id: 26, x: 575, y: 330, label: '27', parent: 12 },
      { id: 27, x: 625, y: 330, label: '28', parent: 13 },
      { id: 28, x: 675, y: 330, label: '29', parent: 13 },
      { id: 29, x: 725, y: 330, label: '30', parent: 14 },
      { id: 30, x: 775, y: 330, label: '31', parent: 14 }
    ];

    setTree({
      nodes,
      visited: [],
      current: null,
      path: []
    });
    setCurrentStep(0);
  }, []);

  // Initialize data
  useEffect(() => {
    console.log('Initializing data...');
    generateArray();
    generateGraph();
    generateTree();
  }, [generateArray, generateGraph, generateTree]);

  // Debug array changes
  useEffect(() => {
    console.log('Array changed:', array);
  }, [array]);

  // Sorting algorithms
  const bubbleSort = useCallback(() => {
    const arr = [...array];
    const steps = [];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapping: [],
          sorted: [...Array(i).keys()].map(k => arr.length - 1 - k)
        });

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: [j, j + 1],
            sorted: [...Array(i).keys()].map(k => arr.length - 1 - k)
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
  }, [array]);

  const quickSort = useCallback(() => {
    const arr = [...array];
    const steps = [];

    const partition = (low, high) => {
      const pivot = arr[high];
      let i = low - 1;

      steps.push({
        array: [...arr],
        comparing: [high],
        swapping: [],
        sorted: []
      });

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
            comparing: [j, high],
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
  }, [array]);

  // Graph algorithms
  const bfsGraph = useCallback(() => {
    const steps = [];
    const visited = new Set();
    const queue = [0];
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

        // Add neighbors to queue
        graph.edges
          .filter(edge => edge.from === current)
          .forEach(edge => {
            if (!visited.has(edge.to)) {
              queue.push(edge.to);
            }
          });
      }
    }

    return steps;
  }, [graph]);

  const dfsGraph = useCallback(() => {
    const steps = [];
    const visited = new Set();
    const path = [];

    const dfsHelper = (node) => {
      visited.add(node);
      path.push(node);

      steps.push({
        visited: Array.from(visited),
        current: node,
        path: [...path]
      });

      graph.edges
        .filter(edge => edge.from === node)
        .forEach(edge => {
          if (!visited.has(edge.to)) {
            dfsHelper(edge.to);
          }
        });
    };

    dfsHelper(0);
    return steps;
  }, [graph]);

  // Tree algorithms
  const bfsTree = useCallback(() => {
    const steps = [];
    const visited = new Set();
    const queue = [0];
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

        // Add children to queue
        tree.nodes
          .filter(node => node.parent === current)
          .forEach(child => {
            if (!visited.has(child.id)) {
              queue.push(child.id);
            }
          });
      }
    }

    return steps;
  }, [tree]);

  const dfsTree = useCallback(() => {
    const steps = [];
    const visited = new Set();
    const path = [];

    const dfsHelper = (nodeId) => {
      visited.add(nodeId);
      path.push(nodeId);

      steps.push({
        visited: Array.from(visited),
        current: nodeId,
        path: [...path]
      });

      tree.nodes
        .filter(node => node.parent === nodeId)
        .forEach(child => {
          if (!visited.has(child.id)) {
            dfsHelper(child.id);
          }
        });
    };

    dfsHelper(0);
    return steps;
  }, [tree]);

  const postOrderTree = useCallback(() => {
    const steps = [];
    const visited = new Set();
    const path = [];

    const postOrderHelper = (nodeId) => {
      // Get children of current node
      const children = tree.nodes.filter(node => node.parent === nodeId);

      // Visit left child first (if exists and not visited)
      if (children.length > 0 && !visited.has(children[0].id)) {
        postOrderHelper(children[0].id);
      }

      // Visit right child (if exists and not visited)
      if (children.length > 1 && !visited.has(children[1].id)) {
        postOrderHelper(children[1].id);
      }

      // Visit current node last (if not already visited)
      if (!visited.has(nodeId)) {
        visited.add(nodeId);
        path.push(nodeId);

        steps.push({
          visited: Array.from(visited),
          current: nodeId,
          path: [...path]
        });
      }
    };

    postOrderHelper(0);
    return steps;
  }, [tree]);

  const inOrderTree = useCallback(() => {
    const steps = [];
    const visited = new Set();
    const path = [];

    const inOrderHelper = (nodeId) => {
      // Get children of current node
      const children = tree.nodes.filter(node => node.parent === nodeId);

      // Visit left child first (if exists and not visited)
      if (children.length > 0 && !visited.has(children[0].id)) {
        inOrderHelper(children[0].id);
      }

      // Visit current node (if not already visited)
      if (!visited.has(nodeId)) {
        visited.add(nodeId);
        path.push(nodeId);

        steps.push({
          visited: Array.from(visited),
          current: nodeId,
          path: [...path]
        });
      }

      // Visit right child (if exists and not visited)
      if (children.length > 1 && !visited.has(children[1].id)) {
        inOrderHelper(children[1].id);
      }
    };

    inOrderHelper(0);
    return steps;
  }, [tree]);

  // Animation control
  const getSteps = useCallback(() => {
    switch (activeTab) {
      case 'sorting':
        return algorithm === 'bubble' ? bubbleSort() : quickSort();
      case 'graph':
        return algorithm === 'bfs' ? bfsGraph() : dfsGraph();
      case 'tree':
        switch (algorithm) {
          case 'bfs':
            return bfsTree();
          case 'dfs':
            return dfsTree();
          case 'postorder':
            return postOrderTree();
          case 'inorder':
            return inOrderTree();
          default:
            return bfsTree();
        }
      default:
        return [];
    }
  }, [activeTab, algorithm, bubbleSort, quickSort, bfsGraph, dfsGraph, bfsTree, dfsTree, postOrderTree, inOrderTree]);

  const steps = getSteps();

  useEffect(() => {
    setTotalSteps(steps.length);
  }, [steps]);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length) {
      const timer = setTimeout(() => {
        const step = steps[currentStep];

        if (activeTab === 'sorting') {
          setArray(step.array);
          setComparing(step.comparing);
          setSwapping(step.swapping);
          setSorted(step.sorted);
        } else if (activeTab === 'graph') {
          setGraph(prev => ({
            ...prev,
            visited: step.visited,
            current: step.current,
            path: step.path
          }));
        } else if (activeTab === 'tree') {
          setTree(prev => ({
            ...prev,
            visited: step.visited,
            current: step.current,
            path: step.path
          }));
        }

        setCurrentStep(prev => prev + 1);
      }, 1000 - speed * 9);

      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps, speed, activeTab]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);

    if (activeTab === 'sorting') {
      generateArray();
    } else if (activeTab === 'graph') {
      generateGraph();
    } else if (activeTab === 'tree') {
      generateTree();
    }
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setCurrentStep(0);
    setIsPlaying(false);

    if (newTab === 'sorting') {
      setAlgorithm('bubble');
    } else if (newTab === 'graph') {
      setAlgorithm('bfs');
    } else if (newTab === 'tree') {
      setAlgorithm('bfs');
    }
  };

  const handleStepChange = (newStep) => {
    setCurrentStep(newStep);
  };

  return (
    <div className="algovisualizer-container">
      <div className="heading-container">
        <img src={logo} alt="AlgoFlow Logo" style={{ width: '120px', margin: '0 auto 16px auto', display: 'block' }} />
        <h1 className="heading-gradient heading-glow">
          Algorithm Visualizer
        </h1>
      </div>

      <TabSelector activeTab={activeTab} setActiveTab={handleTabChange} />

      <ControlPanel
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        reset={reset}
        speed={speed}
        setSpeed={setSpeed}
        currentStep={currentStep}
        totalSteps={totalSteps}
        onStepChange={handleStepChange}
      />

      {activeTab === 'sorting' && (
        <>
          <SortingVisualizer
            array={array}
            comparing={comparing}
            swapping={swapping}
            sorted={sorted}
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            generateArray={generateArray}
          />
          <Legend type="sorting" />
        </>
      )}

      {activeTab === 'graph' && (
        <>
          <GraphVisualizer
            graph={graph}
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
          />
          <Legend type="graph" />
        </>
      )}

      {activeTab === 'tree' && (
        <>
          <TreeVisualizer
            tree={tree}
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
          />
          <Legend type="tree" />
        </>
      )}

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          Created by <span className="footer-author">Nishant Yadav</span>
        </p>
      </footer>
    </div>
  )
}

export default Algovisulizer