import React from 'react';
import ReactDOM from 'react-dom';

//
// Global Style: index.html에서는 모두 제외하고 여기에서 할 것.....
//
import 'bootstrap/dist/css/bootstrap.min.css'

//
// fontAwesome css only
//
import '@fortawesome/fontawesome-free/css/all.min.css'

//
// fontAwesome component
//
// Ref for Using SVG in React : https://www.daleseo.com/react-font-awesome/
//
// Npm: https://www.npmjs.com/package/@fortawesome/react-fontawesome
// $ yarn add @fortawesome/fontawesome-svg-core
// $ yarn add @fortawesome/free-solid-svg-icons
// $ yarn add @fortawesome/react-fontawesome
//
// IT's BETTER to import seperately in each pages

// 
// Custom CSS Template
//  
// import './templates/templated-binary/assets/css/main.css'
// import './templates/templated-industrious/assets/css/main.css'
// import './templates/templated-theory/assets/css/main.css'
// import './templates/templated-transitive/assets/css/main.css'
// import './templates/templated-transit/css/style-xlarge.css'


//
// React Default style
//
import './index.css';

import App from './App';
// import App from './test/root';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
