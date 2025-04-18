/**
 * This script patches the @radix-ui/react-use-effect-event module
 * to use our custom implementation instead of the React one.
 */
const fs = require('fs');
const path = require('path');

// Path to the problematic module
const modulePath = path.join(
  __dirname, 
  '../node_modules/.pnpm/@radix-ui+react-use-effect-event@0.0.0_@types+react@18.3.20_react@18.3.1/node_modules/@radix-ui/react-use-effect-event/dist/index.mjs'
);

try {
  // Our replacement code that uses our custom implementation
  const replacementCode = `
// Patched version that uses a custom implementation of useEffectEvent
import * as React from 'react';

// Custom implementation of useEffectEvent
function useEffectEvent(callback) {
  const callbackRef = React.useRef(callback);
  
  // Update the callback ref when the callback changes
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  // Return a stable function that calls the latest callback
  return React.useCallback((...args) => {
    return callbackRef.current(...args);
  }, []);
}

export { useEffectEvent };
`;

  // Write the replacement code to the module file
  fs.writeFileSync(modulePath, replacementCode);
  console.log('Successfully patched @radix-ui/react-use-effect-event module');
} catch (error) {
  console.error('Failed to patch @radix-ui/react-use-effect-event module:', error);
}
