
// Polyfill for Node.js global object
if (typeof window !== 'undefined' && !window.global) {
  window.global = window;
}

// Polyfill for Node.js Buffer
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = {
    from: (arr: any) => arr,
    alloc: () => ({}),
    allocUnsafe: () => ({}),
    isBuffer: () => false
  } as any;
}

// Polyfill for Node.js process
if (typeof window !== 'undefined' && !window.process) {
  window.process = { 
    env: {},
    version: '',
    nextTick: (cb: () => void) => setTimeout(cb, 0)
  } as any;
}
