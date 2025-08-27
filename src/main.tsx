import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';

const rootEl = document.getElementById('root')!;
const root = createRoot(rootEl);

// tiny splash while we fetch config
rootEl.innerHTML = '<div style="font-family:system-ui;margin:2rem">Loading…</div>';

(async () => {
  try {
    const res = await fetch('/amplify_outputs.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('amplify_outputs.json missing');
    const outputs = await res.json();
    Amplify.configure(outputs);
  } catch (e) {
    console.error('Failed to load Amplify outputs:', e);
  } finally {
    root.render(<StrictMode><App /></StrictMode>);
  }
})();