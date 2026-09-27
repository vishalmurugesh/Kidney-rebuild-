import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { executePrediction } from './src/predictionEngine';

function predictionApiPlugin(): Plugin {
  return {
    name: 'prediction-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        if (req.method === 'POST' && (url === '/predict' || url === '/api/predict')) {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            try {
              if (!body.trim()) {
                res.statusCode = 400;
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'Please fill in all medical inputs.',
                  })
                );
                return;
              }
              const parsed = JSON.parse(body);
              const result = executePrediction(parsed);
              res.statusCode = 200;
              res.end(JSON.stringify(result));
            } catch (err: any) {
              res.statusCode = 400;
              res.end(
                JSON.stringify({
                  success: false,
                  error: err?.message || 'Invalid medical inputs provided. Please verify all clinical fields.',
                })
              );
            }
          });
          return;
        }

        if (req.method === 'GET' && url === '/api/health') {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(
            JSON.stringify({
              status: 'ok',
              project: 'Chronic Kidney Disease Prediction System',
              models: ['random_forest', 'adaboost', 'logistic_regression'],
              service: 'Active',
            })
          );
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), predictionApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
