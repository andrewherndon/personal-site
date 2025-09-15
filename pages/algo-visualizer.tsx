import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

interface ArrayItem {
  value: number;
  id: number;
  originalIndex: number;
}

const HybridSortVisualizer = () => {
  const [array, setArray] = useState<ArrayItem[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [threshold, setThreshold] = useState(10);
  const [speed, setSpeed] = useState(100);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorting, setSorting] = useState<number[]>([]);
  const [merging, setMerging] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  // Generate random array
  const generateArray = useCallback(() => {
    const size = 50;
    const newArray: ArrayItem[] = Array.from({ length: size }, (_, i) => ({
      value: Math.floor(Math.random() * 300) + 10,
      id: i,
      originalIndex: i
    }));
    setArray(newArray);
    setComparing([]);
    setSorting([]);
    setMerging([]);
    setCurrentStep('Array generated');
  }, []);

  // Sleep function for animation delays
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Insertion sort for small arrays
  const insertionSort = async (arr: ArrayItem[], left: number, right: number, updateArray: (arr: ArrayItem[]) => void) => {
    setCurrentStep(`Using Insertion Sort for subarray [${left}-${right}] (size: ${right - left + 1})`);
    setSorting([left, right]);
    
    for (let i = left + 1; i <= right; i++) {
      const key = arr[i];
      let j = i - 1;
      
      setComparing([i]);
      await sleep(speed);
      
      while (j >= left && arr[j].value > key.value) {
        setComparing([j, j + 1]);
        await sleep(speed);
        
        arr[j + 1] = arr[j];
        updateArray([...arr]);
        await sleep(speed);
        
        j--;
      }
      
      arr[j + 1] = key;
      updateArray([...arr]);
      await sleep(speed);
    }
    
    setSorting([]);
    setComparing([]);
  };

  // Merge function for merge sort
  const merge = async (arr: ArrayItem[], left: number, mid: number, right: number, updateArray: (arr: ArrayItem[]) => void) => {
    setCurrentStep(`Merging subarrays [${left}-${mid}] and [${mid + 1}-${right}]`);
    setMerging([left, right]);
    
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
      setComparing([left + i, mid + 1 + j]);
      await sleep(speed);
      
      if (leftArr[i].value <= rightArr[j].value) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      
      updateArray([...arr]);
      await sleep(speed);
      k++;
    }
    
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      updateArray([...arr]);
      await sleep(speed);
      i++;
      k++;
    }
    
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      updateArray([...arr]);
      await sleep(speed);
      j++;
      k++;
    }
    
    setMerging([]);
    setComparing([]);
  };

  // Hybrid merge sort
  const hybridMergeSort = async (arr: ArrayItem[], left: number, right: number, updateArray: (arr: ArrayItem[]) => void) => {
    if (left < right) {
      const size = right - left + 1;
      
      // Use insertion sort for small subarrays
      if (size <= threshold) {
        await insertionSort(arr, left, right, updateArray);
      } else {
        // Use merge sort for larger subarrays
        setCurrentStep(`Dividing array [${left}-${right}] (size: ${size})`);
        const mid = Math.floor((left + right) / 2);
        
        await hybridMergeSort(arr, left, mid, updateArray);
        await hybridMergeSort(arr, mid + 1, right, updateArray);
        await merge(arr, left, mid, right, updateArray);
      }
    }
  };

  // Start sorting animation
  const startSort = async () => {
    if (isAnimating || array.length === 0) return;
    
    setIsAnimating(true);
    setIsPaused(false);
    const arrCopy = [...array];
    
    await hybridMergeSort(arrCopy, 0, arrCopy.length - 1, setArray);
    
    setCurrentStep('Sorting completed!');
    setComparing([]);
    setSorting([]);
    setMerging([]);
    setIsAnimating(false);
  };

  const pauseAnimation = () => {
    setIsPaused(true);
  };

  const resumeAnimation = () => {
    setIsPaused(false);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    setIsPaused(false);
    setComparing([]);
    setSorting([]);
    setMerging([]);
    setCurrentStep('Stopped');
  };

  // Initialize with random array
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Get bar color based on state
  const getBarColor = (index: number) => {
    if (comparing.includes(index)) return '#ff6b6b';
    if (sorting.length >= 2 && sorting[0] <= index && index <= sorting[1]) return '#4ecdc4';
    if (merging.length >= 2 && merging[0] <= index && index <= merging[1]) return '#45b7d1';
    return '#95a5a6';
  };

  return (
    <>
      <Head>
        <title>Algorithm Visualizer - Hybrid Merge-Insertion Sort</title>
        <meta name="description" content="Interactive visualization of hybrid merge-insertion sort algorithm" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Hybrid Merge-Insertion Sort
            </h1>
            <p className="text-gray-300">
              Combines merge sort with insertion sort for optimal performance
            </p>
          </div>

          {/* Controls */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={generateArray}
                disabled={isAnimating}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Generate New Array
              </button>
              
              {!isAnimating ? (
                <button
                  onClick={startSort}
                  disabled={array.length === 0}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  ▶ Start Sort
                </button>
              ) : (
                <div className="flex gap-2">
                  {!isPaused ? (
                    <button
                      onClick={pauseAnimation}
                      className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                    >
                      ⏸ Pause
                    </button>
                  ) : (
                    <button
                      onClick={resumeAnimation}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      ▶ Resume
                    </button>
                  )}
                  <button
                    onClick={stopAnimation}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    ⏹ Stop
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <label className="text-white">Threshold (S):</label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={threshold}
                  onChange={(e) => setThreshold(parseInt(e.target.value))}
                  disabled={isAnimating}
                  className="w-20"
                />
                <span className="text-white w-8">{threshold}</span>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-white">Speed:</label>
                <input
                  type="range"
                  min="10"
                  max="300"
                  value={speed}
                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                  className="w-20"
                />
                <span className="text-white w-12">{speed}ms</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="text-center">
              <p className="text-white text-lg">{currentStep || 'Ready to sort'}</p>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <span className="text-white">Default</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 rounded"></div>
                <span className="text-white">Comparing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-teal-400 rounded"></div>
                <span className="text-white">Insertion Sort</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-400 rounded"></div>
                <span className="text-white">Merging</span>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-end justify-center gap-1 min-h-96">
              {array.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="transition-all duration-300 flex flex-col items-center"
                  style={{
                    height: `${item.value}px`,
                    width: `${Math.max(600 / array.length, 8)}px`,
                    backgroundColor: getBarColor(index),
                    transform: comparing.includes(index) ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  <div className="text-xs text-white mt-1 text-center">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Algorithm Info */}
          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-bold text-white mb-3">How it works:</h3>
            <div className="text-gray-300 space-y-2">
              <p>• <strong>Threshold S = {threshold}:</strong> When a subarray size ≤ {threshold}, use insertion sort</p>
              <p>• <strong>Large subarrays:</strong> Use merge sort (divide and conquer)</p>
              <p>• <strong>Small subarrays:</strong> Use insertion sort (more efficient for small datasets)</p>
              <p>• <strong>Hybrid approach:</strong> Combines the best of both algorithms</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HybridSortVisualizer;