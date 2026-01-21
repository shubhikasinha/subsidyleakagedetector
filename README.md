# Overview 
Smart Subsidy Leakage Detector is a machine learning–based system that identifies fraud, leakages, and anomalies in government subsidy distribution. It helps ensure subsidies reach genuine beneficiaries while reducing misuse and financial loss.

## Key Features
- Detects duplicate subsidy claims
- Identifies unusual claim frequency
- Flags outlier beneficiaries
- Scalable cloud-based analysis

## Tech Stack
- ML: Isolation Forest, Autoencoders
- Cloud: Google BigQuery, Dataflow, Vertex AI

## Demo
Uses synthetic subsidy transaction data, suitable for hackathons and demonstrations.

## Impact
- Saves taxpayer money
- Improves transparency
- Supports sustainable and digital governance

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
