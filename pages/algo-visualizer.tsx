import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const [shouldStop, setShouldStop] = useState(false);
  const isPausedRef = useRef(false);
  const shouldStopRef = useRef(false);

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

  // Sleep function for animation delays with pause/stop support
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

  // Insertion sort for small arrays
  const insertionSort = async (arr: ArrayItem[], left: number, right: number, updateArray: (arr: ArrayItem[]) => void) => {
    if (shouldStopRef.current) return;
    setCurrentStep(`Using Insertion Sort for subarray [${left}-${right}] (size: ${right - left + 1})`);
    setSorting([left, right]);
    
    for (let i = left + 1; i <= right; i++) {
      if (shouldStopRef.current) return;
      const key = arr[i];
      let j = i - 1;
      
      setComparing([i]);
      await sleep(310 - speed);
      if (shouldStopRef.current) return;
      
      while (j >= left && arr[j].value > key.value) {
        if (shouldStopRef.current) return;
        setComparing([j, j + 1]);
        await sleep(310 - speed);
        if (shouldStopRef.current) return;
        
        arr[j + 1] = arr[j];
        updateArray([...arr]);
        await sleep(310 - speed);
        if (shouldStopRef.current) return;
        
        j--;
      }
      
      arr[j + 1] = key;
      updateArray([...arr]);
      await sleep(310 - speed);
    }
    
    setSorting([]);
    setComparing([]);
  };

  // Merge function for merge sort
  const merge = async (arr: ArrayItem[], left: number, mid: number, right: number, updateArray: (arr: ArrayItem[]) => void) => {
    if (shouldStopRef.current) return;
    setCurrentStep(`Merging subarrays [${left}-${mid}] and [${mid + 1}-${right}]`);
    setMerging([left, right]);
    
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
      if (shouldStopRef.current) return;
      setComparing([left + i, mid + 1 + j]);
      await sleep(310 - speed);
      if (shouldStopRef.current) return;
      
      if (leftArr[i].value <= rightArr[j].value) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      
      updateArray([...arr]);
      await sleep(310 - speed);
      if (shouldStopRef.current) return;
      k++;
    }
    
    while (i < leftArr.length) {
      if (shouldStopRef.current) return;
      arr[k] = leftArr[i];
      updateArray([...arr]);
      await sleep(310 - speed);
      if (shouldStopRef.current) return;
      i++;
      k++;
    }
    
    while (j < rightArr.length) {
      if (shouldStopRef.current) return;
      arr[k] = rightArr[j];
      updateArray([...arr]);
      await sleep(310 - speed);
      if (shouldStopRef.current) return;
      j++;
      k++;
    }
    
    setMerging([]);
    setComparing([]);
  };

  // Hybrid merge sort
  const hybridMergeSort = async (arr: ArrayItem[], left: number, right: number, updateArray: (arr: ArrayItem[]) => void) => {
    if (shouldStopRef.current || left >= right) return;
    
    const size = right - left + 1;
    
    // Use insertion sort for small subarrays
    if (size <= threshold) {
      await insertionSort(arr, left, right, updateArray);
    } else {
      // Use merge sort for larger subarrays
      if (shouldStopRef.current) return;
      setCurrentStep(`Dividing array [${left}-${right}] (size: ${size})`);
      const mid = Math.floor((left + right) / 2);
      
      await hybridMergeSort(arr, left, mid, updateArray);
      if (shouldStopRef.current) return;
      await hybridMergeSort(arr, mid + 1, right, updateArray);
      if (shouldStopRef.current) return;
      await merge(arr, left, mid, right, updateArray);
    }
  };

  // Start sorting animation
  const startSort = async () => {
    if (isAnimating || array.length === 0) return;
    
    setIsAnimating(true);
    setIsPaused(false);
    setShouldStop(false);
    isPausedRef.current = false;
    shouldStopRef.current = false;
    const arrCopy = [...array];
    
    await hybridMergeSort(arrCopy, 0, arrCopy.length - 1, setArray);
    
    if (!shouldStopRef.current) {
      setCurrentStep('Sorting completed!');
    } else {
      setCurrentStep('Sorting stopped');
    }
    setComparing([]);
    setSorting([]);
    setMerging([]);
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
    setComparing([]);
    setSorting([]);
    setMerging([]);
    setCurrentStep('Stopping...');
  };

  // Initialize with random array
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Get bar color based on state
  const getBarColor = (index: number) => {
    if (comparing.includes(index)) return '#f87171'; // red-400
    if (sorting.length >= 2 && sorting[0] <= index && index <= sorting[1]) return '#34d399'; // emerald-400
    if (merging.length >= 2 && merging[0] <= index && index <= merging[1]) return '#22d3ee'; // cyan-400
    return '#94a3b8'; // slate-400
  };

  return (
    <>
      <Head>
        <title>Algorithm Visualizer - Hybrid Merge-Insertion Sort</title>
        <meta name="description" content="Interactive visualization of hybrid merge-insertion sort algorithm" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              Hybrid Merge-Insertion Sort
            </h1>
            <p className="text-gray-400 text-sm">
              Combines merge sort with insertion sort for optimal performance
            </p>
          </div>

          {/* Controls */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={generateArray}
                disabled={isAnimating}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-700 text-white rounded border border-gray-600 transition-colors text-sm"
              >
                Generate Array
              </button>
              
              {!isAnimating ? (
                <button
                  onClick={startSort}
                  disabled={array.length === 0}
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
                <label className="text-gray-300 text-sm">Threshold:</label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={threshold}
                  onChange={(e) => setThreshold(parseInt(e.target.value))}
                  disabled={isAnimating}
                  className="w-16 accent-gray-500"
                />
                <span className="text-white text-sm w-6">{threshold}</span>
              </div>

              <div className="flex items-center gap-2 bg-gray-800 rounded px-3 py-2">
                <label className="text-gray-300 text-sm">Speed:</label>
                <input
                  type="range"
                  min="10"
                  max="300"
                  value={speed}
                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                  className="w-16 accent-gray-500"
                />
                <span className="text-white text-sm w-8">{speed}</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 mb-4">
            <div className="text-center">
              <p className="text-gray-300 text-sm">{currentStep || 'Ready to sort'}</p>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 mb-4">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded"></div>
                <span className="text-gray-400 text-xs">Default</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-400 text-xs">Comparing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-400 text-xs">Insertion Sort</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-gray-400 text-xs">Merging</span>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-end justify-center gap-1 min-h-80">
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
        </div>
      </div>
    </>
  );
};

export default HybridSortVisualizer;