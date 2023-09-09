import { Buffer } from 'buffer';

// Ensure that global, Buffer, and process.env are defined in the global scope
window.global = window.global ?? window;
window.Buffer = window.Buffer ?? Buffer;
window.process = window.process ?? { env: {} }; // Minimal process polyfill

export {};