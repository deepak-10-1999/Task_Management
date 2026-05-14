// src/mocks/index.ts
export async function initMSW() {
    if (process.env.NODE_ENV === 'development') {
      const { worker } = await import('./browser');
      return worker.start({
        onUnhandledRequest: 'warn',
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
      });
    }
    return Promise.resolve();
  }