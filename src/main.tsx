import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { BasicFlowProps } from './components/BasicFlow.tsx';
import { flowJson, sidebarJson } from './TestJson.ts';

const props: BasicFlowProps = { flowJson: flowJson, sidebarJson: sidebarJson };

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App {...props}/>
  </StrictMode>,
)
