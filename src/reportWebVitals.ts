// import { ReportHandler } from 'web-vitals';

// const reportWebVitals = (onPerfEntry?: ReportHandler) => {
//   if (onPerfEntry && onPerfEntry instanceof Function) {
//     import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
//       getCLS(onPerfEntry);
//       getFID(onPerfEntry);
//       getFCP(onPerfEntry);
//       getLCP(onPerfEntry);
//       getTTFB(onPerfEntry);
//     });
//   }
// };

// export default reportWebVitals;

import {onLCP, onINP, onCLS} from 'web-vitals';

onCLS(console.log);
onINP(console.log);
onLCP(console.log);
