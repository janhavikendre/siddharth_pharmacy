// This file provides polyfills for React features that may be used by dependencies
// but aren't available in the current React version

// If React doesn't have useEffectEvent, provide a simple implementation
if (typeof React !== 'undefined' && !React.useEffectEvent) {
  // Simple polyfill for useEffectEvent
  React.useEffectEvent = function useEffectEvent(callback) {
    const callbackRef = React.useRef(callback);
    
    // Update the callback ref when the callback changes
    React.useEffect(() => {
      callbackRef.current = callback;
    }, [callback]);
    
    // Return a stable function that calls the latest callback
    return React.useCallback((...args) => {
      return callbackRef.current(...args);
    }, []);
  };
}

// Export a no-op function so this module can be imported
export default function reactPolyfill() {
  // This function does nothing, it's just here so the file can be imported
}
