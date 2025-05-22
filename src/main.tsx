import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { BasicFlowProps } from './components/BasicFlow.tsx';
import { flowJson } from './TestJson.ts';

const props: BasicFlowProps = { json: flowJson };

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App {...props}/>
  </StrictMode>,
)
