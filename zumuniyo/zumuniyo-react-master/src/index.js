import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from "reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import {GlobalProvider} from 'components/common/GlobalProvider';
import LoadingSpinner from 'components/common/LoadingSpinner';
import Zumuniyo from 'components/common/Zumuniyo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      {/*<React.StrictMode>*/}
        
          <GlobalProvider>
            <LoadingSpinner>
              <Zumuniyo/>
            </LoadingSpinner>
          </GlobalProvider>
        
      {/*</React.StrictMode>*/}
  </BrowserRouter>
);

reportWebVitals();