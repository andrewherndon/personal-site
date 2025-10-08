import React, { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface GraphNode {
  id: number;
  x: number;
  y: number;
  distance: number;
  visited: boolean;
  previous: number | null;
}

interface GraphEdge {
  from: number;
  to: number;
  weight: number;
}

interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  visitedOrder: number[];
  currentNode: number | null;
  heap: { nodeId: number; distance: number }[];
}

const DijkstraVisualizer = () => {
  const [graph, setGraph] = useState<GraphState>({
    nodes: [],
    edges: [],
    visitedOrder: [],
    currentNode: null,
    heap: []
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [speed, setSpeed] = useState(800);
  const [startNode, setStartNode] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [shouldStop, setShouldStop] = useState(false);
  const isPausedRef = useRef(false);
  const shouldStopRef = useRef(false);

  // Generate sample graph
  const generateGraph = useCallback(() => {
    const nodeCount = 8;
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];

    // Create nodes in a circle layout
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i * 2 * Math.PI) / nodeCount;
      const radius = 150;
      const x = 300 + radius * Math.cos(angle);
      const y = 200 + radius * Math.sin(angle);

      nodes.push({
        id: i,
        x,
        y,
        distance: i === startNode ? 0 : Infinity,
        visited: false,
        previous: null
      });
    }

    // Create random edges with weights
    const edgeList = [
      [0, 1, 4], [0, 7, 8], [1, 2, 8], [1, 7, 11],
      [2, 3, 7], [2, 8, 2], [2, 5, 4], [3, 4, 9],
      [3, 5, 14], [4, 5, 10], [5, 6, 2], [6, 7, 1],
      [6, 8, 6], [7, 8, 7]
    ];

    // Only use edges that exist for our node count
    edgeList.forEach(([from, to, weight]) => {
      if (from < nodeCount && to < nodeCount) {
        edges.push({ from, to, weight });
        edges.push({ from: to, to: from, weight }); // Make undirected
      }
    });

    setGraph({
      nodes,
      edges,
      visitedOrder: [],
      currentNode: null,
      heap: [{ nodeId: startNode, distance: 0 }]
    });
    setCurrentStep('Graph generated - Ready to find shortest paths');
  }, [startNode]);

  // Sleep function for animation delays
  const sleep = async (ms: number) => {
    return new Promise<void>((resolve) => {
      const checkPauseAndStop = () => {
        if (shouldStopRef.current) {
          resolve();
          return;
        }
        if (isPausedRef.current) {
          setTimeout(checkPauseAndStop, 100);
        } else {
          setTimeout(resolve, ms);
        }
      };
      checkPauseAndStop();
    });
  };

  // Heap-based Dijkstra implementation
  const dijkstraHeap = async () => {
    if (isAnimating || graph.nodes.length === 0) return;

    setIsAnimating(true);
    setIsPaused(false);
    setShouldStop(false);
    isPausedRef.current = false;
    shouldStopRef.current = false;

    // Initialize
    const nodes = graph.nodes.map(node => ({
      ...node,
      distance: node.id === startNode ? 0 : Infinity,
      visited: false,
      previous: null
    }));

    const heap = [{ nodeId: startNode, distance: 0 }];
    const visitedOrder: number[] = [];

    setGraph(prev => ({ ...prev, nodes, heap, visitedOrder }));
    setCurrentStep(`Starting from node ${startNode}`);
    await sleep(speed);

    while (heap.length > 0 && !shouldStopRef.current) {
      // Extract min (this is simplified - real heap would maintain heap property)
      heap.sort((a, b) => a.distance - b.distance);
      const current = heap.shift();

      if (!current) break;

      const currentNodeId = current.nodeId;

      if (nodes[currentNodeId].visited) continue;

      // Mark as visited
      nodes[currentNodeId].visited = true;
      visitedOrder.push(currentNodeId);

      setGraph(prev => ({
        ...prev,
        nodes: [...nodes],
        currentNode: currentNodeId,
        heap: [...heap],
        visitedOrder: [...visitedOrder]
      }));

      setCurrentStep(`Visiting node ${currentNodeId} (distance: ${nodes[currentNodeId].distance})`);
      await sleep(speed);

      if (shouldStopRef.current) break;

      // Update neighbors
      const neighbors = graph.edges.filter(edge => edge.from === currentNodeId);

      for (const edge of neighbors) {
        if (shouldStopRef.current) break;

        const neighborId = edge.to;
        if (nodes[neighborId].visited) continue;

        const newDistance = nodes[currentNodeId].distance + edge.weight;

        if (newDistance < nodes[neighborId].distance) {
          nodes[neighborId].distance = newDistance;
          nodes[neighborId].previous = currentNodeId;

          // Add to heap if not already there with better distance
          const existingIndex = heap.findIndex(item => item.nodeId === neighborId);
          if (existingIndex >= 0) {
            heap[existingIndex].distance = newDistance;
          } else {
            heap.push({ nodeId: neighborId, distance: newDistance });
          }

          setGraph(prev => ({
            ...prev,
            nodes: [...nodes],
            heap: [...heap]
          }));

          setCurrentStep(`Updated distance to node ${neighborId}: ${newDistance}`);
          await sleep(speed / 2);
        }
      }
    }

    if (!shouldStopRef.current) {
      setCurrentStep('Algorithm completed! Shortest paths found.');
    } else {
      setCurrentStep('Algorithm stopped');
    }

    setGraph(prev => ({ ...prev, currentNode: null }));
    setIsAnimating(false);
    setShouldStop(false);
    shouldStopRef.current = false;
  };

  const pauseAnimation = () => {
    setIsPaused(true);
    isPausedRef.current = true;
    setCurrentStep('Paused');
  };

  const resumeAnimation = () => {
    setIsPaused(false);
    isPausedRef.current = false;
  };

  const stopAnimation = () => {
    setShouldStop(true);
    shouldStopRef.current = true;
    setIsPaused(false);
    isPausedRef.current = false;
    setCurrentStep('Stopping...');
  };

  // Initialize with graph
  useEffect(() => {
    generateGraph();
  }, [generateGraph]);

  // Get node color based on state
  const getNodeColor = (node: GraphNode) => {
    if (node.id === graph.currentNode) return '#f59e0b'; // amber-500 (current)
    if (node.visited) return '#10b981'; // emerald-500 (visited)
    if (node.id === startNode) return '#3b82f6'; // blue-500 (start)
    return '#6b7280'; // gray-500 (unvisited)
  };

  const getNodeTextColor = (node: GraphNode) => {
    return node.visited || node.id === startNode || node.id === graph.currentNode ? 'white' : 'black';
  };

  return (
    <>
      <Head>
        <title>Algorithm Visualizer - Dijkstra's Algorithm (Heap-based)</title>
        <meta name="description" content="Interactive visualization of Dijkstra's shortest path algorithm using heap" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              Dijkstra's Algorithm (Heap-based)
            </h1>
            <p className="text-gray-400 text-sm">
              Find shortest paths from source to all vertices using priority queue
            </p>
            <Link
              href="/dijkstra-array"
              className="inline-block px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors mt-2"
            >
              View Array-based Version
            </Link>
          </div>

          {/* Controls */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={generateGraph}
                disabled={isAnimating}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-700 text-white rounded border border-gray-600 transition-colors text-sm"
              >
                Generate Graph
              </button>

              {!isAnimating ? (
                <button
                  onClick={dijkstraHeap}
                  disabled={graph.nodes.length === 0}
                  className="px-4 py-2 bg-green-700 hover:bg-green-600 disabled:bg-gray-700 text-white rounded border border-green-600 transition-colors text-sm"
                >
                  Start
                </button>
              ) : (
                <div className="flex gap-2">
                  {!isPaused ? (
                    <button
                      onClick={pauseAnimation}
                      className="px-4 py-2 bg-yellow-700 hover:bg-yellow-600 text-white rounded border border-yellow-600 transition-colors text-sm"
                    >
                      Pause
                    </button>
                  ) : (
                    <button
                      onClick={resumeAnimation}
                      className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded border border-green-600 transition-colors text-sm"
                    >
                      Resume
                    </button>
                  )}
                  <button
                    onClick={stopAnimation}
                    className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded border border-red-600 transition-colors text-sm"
                  >
                    Stop
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 bg-gray-800 rounded px-3 py-2">
                <label className="text-gray-300 text-sm">Start Node:</label>
                <select
                  value={startNode}
                  onChange={(e) => setStartNode(parseInt(e.target.value))}
                  disabled={isAnimating}
                  className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
                >
                  {graph.nodes.map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-gray-800 rounded px-3 py-2">
                <label className="text-gray-300 text-sm">Speed:</label>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  value={speed}
                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                  className="w-16 accent-gray-500"
                />
                <span className="text-white text-sm w-8">{speed}ms</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 mb-4">
            <div className="text-center">
              <p className="text-gray-300 text-sm">{currentStep || 'Ready to find shortest paths'}</p>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 mb-4">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-400 text-xs">Start Node</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-gray-400 text-xs">Current Node</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-gray-400 text-xs">Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-gray-400 text-xs">Unvisited</span>
              </div>
            </div>
          </div>

          {/* Graph Visualization */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4">
            <div className="relative" style={{ height: '400px', width: '100%' }}>
              <svg width="100%" height="100%" viewBox="0 0 600 400">
                {/* Edges */}
                {graph.edges.map((edge, index) => {
                  const fromNode = graph.nodes[edge.from];
                  const toNode = graph.nodes[edge.to];
                  if (!fromNode || !toNode) return null;

                  // Only draw each edge once (from lower id to higher id)
                  if (edge.from > edge.to) return null;

                  const midX = (fromNode.x + toNode.x) / 2;
                  const midY = (fromNode.y + toNode.y) / 2;

                  return (
                    <g key={`${edge.from}-${edge.to}`}>
                      <line
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke="#4b5563"
                        strokeWidth="2"
                      />
                      <circle
                        cx={midX}
                        cy={midY}
                        r="12"
                        fill="#374151"
                        stroke="#6b7280"
                        strokeWidth="1"
                      />
                      <text
                        x={midX}
                        y={midY + 4}
                        textAnchor="middle"
                        fontSize="10"
                        fill="white"
                      >
                        {edge.weight}
                      </text>
                    </g>
                  );
                })}

                {/* Nodes */}
                {graph.nodes.map((node) => (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="25"
                      fill={getNodeColor(node)}
                      stroke="#374151"
                      strokeWidth="2"
                      className="transition-all duration-500"
                    />
                    <text
                      x={node.x}
                      y={node.y - 5}
                      textAnchor="middle"
                      fontSize="12"
                      fill={getNodeTextColor(node)}
                      fontWeight="bold"
                    >
                      {node.id}
                    </text>
                    <text
                      x={node.x}
                      y={node.y + 8}
                      textAnchor="middle"
                      fontSize="10"
                      fill={getNodeTextColor(node)}
                    >
                      {node.distance === Infinity ? '∞' : node.distance}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Heap State */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <h3 className="text-white text-lg font-bold mb-3">Priority Queue (Heap)</h3>
            <div className="flex flex-wrap gap-2">
              {graph.heap.length === 0 ? (
                <span className="text-gray-400 text-sm">Empty</span>
              ) : (
                graph.heap
                  .sort((a, b) => a.distance - b.distance)
                  .map((item, index) => (
                    <div
                      key={`${item.nodeId}-${item.distance}`}
                      className="bg-purple-700 text-white px-3 py-2 rounded text-sm border-2"
                      style={{
                        borderColor: index === 0 ? '#f59e0b' : '#6b21a8'
                      }}
                    >
                      Node {item.nodeId}: {item.distance}
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DijkstraVisualizer;