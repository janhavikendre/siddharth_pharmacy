import * as React from 'react';

// A custom implementation of useEffectEvent
export function useEffectEvent(callback) {
  const callbackRef = React.useRef(callback);
  
  // Update the callback ref whenever the callback changes
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  // Return a stable function that calls the latest callback
  return React.useCallback((...args) => {
    return callbackRef.current(...args);
  }, []);
}

// Make the function also available as default export
export default useEffectEvent;
