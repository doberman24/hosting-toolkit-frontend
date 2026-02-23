import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from '@/app/App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
)
