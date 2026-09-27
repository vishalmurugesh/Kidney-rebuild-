import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { executePrediction } from './src/predictionEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '500kb' }));

// Custom JSON body-parser error handler
app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'Malformed JSON payload. Please ensure request body is valid JSON.',
    });
  }
  next();
});

// CORS headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    project: 'Chronic Kidney Disease Prediction System',
    models: ['random_forest', 'adaboost', 'logistic_regression'],
    service: 'Active',
  });
});

// Models metadata endpoint
app.get('/api/models', (_req: Request, res: Response) => {
  res.json({
    models: [
      {
        id: 'random_forest',
        name: 'Random Forest Classifier',
        accuracy: '100.0%',
        recall: '100.0%',
        precision: '100.0%',
        f1Score: '100.0%',
        description: 'Ensemble of 100 decision trees evaluating non-linear orthogonal splits without feature correlation bias.',
      },
      {
        id: 'adaboost',
        name: 'AdaBoost Classifier',
        accuracy: '98.75%',
        recall: '98.0%',
        precision: '100.0%',
        f1Score: '98.99%',
        description: 'Adaptive boosting combining sequential decision stumps focused on hard-to-classify samples.',
      },
      {
        id: 'logistic_regression',
        name: 'Logistic Regression',
        accuracy: '98.75%',
        recall: '98.0%',
        precision: '100.0%',
        f1Score: '98.99%',
        description: 'Standardized L2 regularized linear model delivering smooth, calibrated prediction probabilities.',
      },
    ],
  });
});

// Primary Prediction Controller
const handlePredict = async (req: Request, res: Response) => {
  try {
    const inputData = req.body;
    if (!inputData || typeof inputData !== 'object' || Object.keys(inputData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all medical inputs.',
      });
    }

    const result = executePrediction(inputData);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error?.message || 'Invalid medical inputs provided. Please verify all clinical fields.',
    });
  }
};

app.post('/predict', handlePredict);
app.post('/api/predict', handlePredict);

// Dev / Prod serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Chronic Kidney Disease Prediction Server running on port ${PORT}`);
  });
}

startServer();
