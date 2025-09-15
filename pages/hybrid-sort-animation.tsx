import React, { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface ArraySegment {
  start: number;
  end: number;
  values: number[];
  level: number;
  id: string;
  status: 'pending' | 'dividing' | 'insertion_sorting' | 'merging' | 'completed';
}

const HybridSortVisualizer = () => {
  const [segments, setSegments] = useState<ArraySegment[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [threshold, setThreshold] = useState(4);
  const [speed, setSpeed] = useState(1000);
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const shouldStopRef = useRef(false);
  const segmentDataRef = useRef<Map<string, ArraySegment>>(new Map());

  const generateArray = useCallback(() => {
    const size = 16;
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 99) + 1
    );

    const initialSegment: ArraySegment = {
      start: 0,
      end: size - 1,
      values: [...newArray],
      level: 0,
      id: 'root',
      status: 'pending'
    };

    setSegments([initialSegment]);
    segmentDataRef.current.clear();
    segmentDataRef.current.set('root', initialSegment);
    setCurrentStep('Array generated - Ready to sort');
    setActiveSegment(null);
  }, []);

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

  const updateSegmentInState = (id: string, updates: Partial<ArraySegment>) => {
    const current = segmentDataRef.current.get(id);
    if (current) {
      const updated = { ...current, ...updates };
      segmentDataRef.current.set(id, updated);
      setSegments(prev => prev.map(seg => seg.id === id ? updated : seg));
    }
  };

  const addSegment = (segment: ArraySegment) => {
    segmentDataRef.current.set(segment.id, segment);
    setSegments(prev => [...prev, segment]);
  };

  const insertionSort = async (arr: number[], segmentId: string): Promise<number[]> => {
    const sortArray = [...arr];

    for (let i = 1; i < sortArray.length; i++) {
      if (shouldStopRef.current) return sortArray;

      const key = sortArray[i];
      let j = i - 1;

      updateSegmentInState(segmentId, { values: [...sortArray] });
      await sleep(speed / 3);

      while (j >= 0 && sortArray[j] > key) {
        if (shouldStopRef.current) return sortArray;
        sortArray[j + 1] = sortArray[j];
        j--;

        updateSegmentInState(segmentId, { values: [...sortArray] });
        await sleep(speed / 3);
      }
      sortArray[j + 1] = key;

      updateSegmentInState(segmentId, { values: [...sortArray] });
      await sleep(speed / 3);
    }
    return sortArray;
  };

  const merge = (left: number[], right: number[]): number[] => {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  };

  const hybridSort = async (segmentId: string): Promise<number[]> => {
    if (shouldStopRef.current) return [];

    const segment = segmentDataRef.current.get(segmentId);
    if (!segment) return [];

    setActiveSegment(segmentId);

    if (segment.values.length <= threshold) {
      // Base case: use insertion sort
      setCurrentStep(`Insertion sorting [${segment.start}-${segment.end}] (size: ${segment.values.length})`);
      updateSegmentInState(segmentId, { status: 'insertion_sorting' });
      await sleep(speed);

      const sorted = await insertionSort(segment.values, segmentId);
      if (shouldStopRef.current) return sorted;

      updateSegmentInState(segmentId, { status: 'completed', values: sorted });
      await sleep(speed);
      return sorted;
    } else {
      // Recursive case: divide and conquer
      setCurrentStep(`Dividing [${segment.start}-${segment.end}] (size: ${segment.values.length})`);
      updateSegmentInState(segmentId, { status: 'dividing' });
      await sleep(speed);

      const mid = Math.floor(segment.values.length / 2);
      const leftValues = segment.values.slice(0, mid);
      const rightValues = segment.values.slice(mid);

      // Create child segments
      const leftId = `${segmentId}-L`;
      const rightId = `${segmentId}-R`;

      const leftSegment: ArraySegment = {
        start: segment.start,
        end: segment.start + leftValues.length - 1,
        values: leftValues,
        level: segment.level + 1,
        id: leftId,
        status: 'pending'
      };

      const rightSegment: ArraySegment = {
        start: segment.start + leftValues.length,
        end: segment.end,
        values: rightValues,
        level: segment.level + 1,
        id: rightId,
        status: 'pending'
      };

      addSegment(leftSegment);
      addSegment(rightSegment);
      await sleep(speed);

      // Recursively sort left half
      const leftSorted = await hybridSort(leftId);
      if (shouldStopRef.current) return segment.values;

      // Recursively sort right half
      const rightSorted = await hybridSort(rightId);
      if (shouldStopRef.current) return segment.values;

      // Merge the sorted halves
      setCurrentStep(`Merging [${segment.start}-${segment.start + leftSorted.length - 1}] and [${segment.start + leftSorted.length}-${segment.end}]`);
      setActiveSegment(segmentId);
      updateSegmentInState(segmentId, { status: 'merging' });
      await sleep(speed);

      const merged = merge(leftSorted, rightSorted);

      updateSegmentInState(segmentId, { status: 'completed', values: merged });
      await sleep(speed);

      return merged;
    }
  };

  const startSort = async () => {
    if (isAnimating || segments.length === 0) return;

    setIsAnimating(true);
    setIsPaused(false);
    isPausedRef.current = false;
    shouldStopRef.current = false;

    await hybridSort('root');

    if (!shouldStopRef.current) {
      setCurrentStep('Sorting completed!');
    } else {
      setCurrentStep('Sorting stopped');
    }

    setActiveSegment(null);
    setIsAnimating(false);
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
    shouldStopRef.current = true;
    setIsPaused(false);
    isPausedRef.current = false;
    setActiveSegment(null);
    setCurrentStep('Stopping...');
  };

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const getSegmentColor = (segment: ArraySegment) => {
    if (activeSegment === segment.id) {
      switch (segment.status) {
        case 'dividing': return '#f59e0b'; // amber-500
        case 'insertion_sorting': return '#10b981'; // emerald-500
        case 'merging': return '#3b82f6'; // blue-500
        default: return '#8b5cf6'; // violet-500
      }
    }

    switch (segment.status) {
      case 'completed': return '#6b7280'; // gray-500
      case 'pending': return '#374151'; // gray-700
      default: return '#4b5563'; // gray-600
    }
  };

  const maxLevel = Math.max(...segments.map(s => s.level), 0);

  return (
    <>
      <Head>
        <title>Hybrid Sort Visualizer - Divide & Conquer</title>
        <meta name="description" content="Visual representation of hybrid merge-insertion sort algorithm" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-white mb-1">
              Hybrid Sort Visualizer
            </h1>
            <Link
              href="/hybrid-sort"
              className="inline-block px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
            >
              View Bar Chart Version
            </Link>
          </div>

          {/* Controls */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 mb-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={generateArray}
                disabled={isAnimating}
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-700 text-white rounded text-sm"
              >
                Generate
              </button>

              {!isAnimating ? (
                <button
                  onClick={startSort}
                  disabled={segments.length === 0}
                  className="px-3 py-1 bg-green-700 hover:bg-green-600 disabled:bg-gray-700 text-white rounded text-sm"
                >
                  Start
                </button>
              ) : (
                <div className="flex gap-1">
                  {!isPaused ? (
                    <button
                      onClick={pauseAnimation}
                      className="px-3 py-1 bg-yellow-700 hover:bg-yellow-600 text-white rounded text-sm"
                    >
                      Pause
                    </button>
                  ) : (
                    <button
                      onClick={resumeAnimation}
                      className="px-3 py-1 bg-green-700 hover:bg-green-600 text-white rounded text-sm"
                    >
                      Resume
                    </button>
                  )}
                  <button
                    onClick={stopAnimation}
                    className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-sm"
                  >
                    Stop
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <label className="text-gray-300 text-xs">S:</label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={threshold}
                  onChange={(e) => setThreshold(parseInt(e.target.value))}
                  disabled={isAnimating}
                  className="w-12"
                />
                <span className="text-white text-xs w-4">{threshold}</span>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-gray-300 text-xs">Speed:</label>
                <input
                  type="range"
                  min="200"
                  max="2000"
                  value={speed}
                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                  className="w-12"
                />
                <span className="text-white text-xs w-8">{speed}ms</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-2 mb-3">
            <div className="text-center">
              <p className="text-gray-300 text-sm">{currentStep || 'Ready to sort'}</p>
            </div>
          </div>

          {/* Visualization */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4" style={{ minHeight: '70vh' }}>
            <div className="space-y-8">
              {Array.from({ length: maxLevel + 1 }, (_, level) => (
                <div key={level} className="space-y-3">
                  <h4 className="text-gray-400 text-sm font-semibold">Level {level} {level === 0 ? '(Original Array)' : `(Subarray Level)`}</h4>
                  <div className="flex flex-wrap gap-6 justify-center">
                    {segments
                      .filter(segment => segment.level === level)
                      .map(segment => (
                        <div
                          key={segment.id}
                          className={`border-3 rounded-xl p-4 transition-all duration-700 transform ${
                            activeSegment === segment.id ? 'border-yellow-400 scale-110 shadow-2xl' : 'border-gray-600'
                          }`}
                          style={{
                            backgroundColor: getSegmentColor(segment),
                            minWidth: `${Math.max(segment.values.length * 40, 200)}px`,
                            boxShadow: activeSegment === segment.id ? '0 0 30px rgba(255, 255, 0, 0.3)' : 'none'
                          }}
                        >
                          <div className="text-white text-sm mb-3 font-bold text-center">
                            {segment.id} • [{segment.start}-{segment.end}] • Size: {segment.values.length}
                          </div>
                          <div className="flex flex-wrap gap-2 justify-center mb-3">
                            {segment.values.map((value, index) => (
                              <div
                                key={index}
                                className="bg-white bg-opacity-30 rounded-lg px-3 py-2 text-white text-sm font-bold min-w-8 text-center"
                                style={{
                                  backgroundColor: activeSegment === segment.id && segment.status === 'insertion_sorting'
                                    ? 'rgba(16, 185, 129, 0.8)'
                                    : 'rgba(255, 255, 255, 0.3)'
                                }}
                              >
                                {value}
                              </div>
                            ))}
                          </div>
                          <div className={`text-sm font-semibold text-center p-2 rounded ${
                            segment.status === 'insertion_sorting' ? 'text-green-300 bg-green-900 bg-opacity-50' :
                            segment.status === 'dividing' ? 'text-amber-300 bg-amber-900 bg-opacity-50' :
                            segment.status === 'merging' ? 'text-blue-300 bg-blue-900 bg-opacity-50' :
                            segment.status === 'completed' ? 'text-gray-300 bg-gray-700 bg-opacity-50' :
                            'text-gray-400'
                          }`}>
                            {segment.status === 'insertion_sorting' ? 'INSERTION SORTING' :
                             segment.status === 'dividing' ? 'DIVIDING' :
                             segment.status === 'merging' ? 'MERGING' :
                             segment.status === 'completed' ? 'COMPLETED' :
                             'PENDING'}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Algorithm Info */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 mt-3">
            <div className="text-gray-400 text-xs space-y-1">
              <p><strong className="text-white">Hybrid Sort:</strong> If size {">"} {threshold}, divide. If size ≤ {threshold}, insertion sort. Then merge.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HybridSortVisualizer;