# Observing the Observers

A web based software that can be used to collect data from human subjects in a reliable and scalable way. This software further enables researchers to develop and analyze their own segmentation experiments.

	This project is designed with: 

	Node.js as Javascript runtime environment + 
	Express as backend server  + 
	Webpack as module bundler + 
	MongoDB for database +
	Redux + React as frontend state management and view library.


You can generate experimental procedures similar to the following:

<p align="center"><img src="https://github.mit.edu/egeozin/observer-dashboard/blob/master/images/retrospective_protocol.png"/></p>

<p align="center"><img src="https://github.mit.edu/egeozin/observer-dashboard/blob/master/images/simultaneous_protocol.png"/></p>



Folder Structure:

```
.
├── bin                      # Build/Start scripts
├── config                   # Project and build configurations
├── public                   # Static public assets (not imported anywhere in source code)
├── server                   # Express application that provides webpack middleware
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── main.js              # Application bootstrap and rendering
│   ├── components           # Global Reusable Presentational Components
│   ├── containers           # Global Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   │   └── CoreLayout.js    # CoreLayout which receives children for each route
│   │   └── CoreLayout.scss  # Styles related to the CoreLayout
│   │   └── index.js         # Main file for layout
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes with store
│   │   ├── Home             # Fractal route
│   │   │   ├── index.js     # Route definitions and async split points
│   │   │   ├── assets       # Assets required to render components
│   │   │   ├── components   # Presentational React Components
│   │   │   └── routes **    # Fractal sub-routes (** optional)
│   │   ├── Experiment       # Fractal route
│   │   │   ├── index.js     # Route definitions and async split points
│   │   │   ├── assets       # Assets required to render components
│   │   │   ├── components   # Presentational React Components
│   │   │   └── routes **
│   │   │   	├── Analysis
│   │   │   		├── index.js     # Route definitions and async split points
│   │   │   		├── assets       # Assets required to render components
│   │   │   		├── components   # Presentational React Components
│   │   │   		└── routes **
│   │   │   	├── index.js     # Route definitions and async split points
│   │   │   	├── assets       # Assets required to render components
│   │   │   	├── components   # Presentational React Components
│   │   │   	└── routes ** 
│   │   ├── Auth             # Fractal route
│   │   │   ├── index.js     # Route definitions and async split points
│   │   │   ├── assets       # Assets required to render components
│   │   │   ├── components   # Presentational React Components
│   │   │   └── routes ** 
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
└── tests                    # Unit tests
```


## Note

This project uses David Zukowski's [React-Redux-Starter-Kit](https://github.com/davezuko/react-redux-starter-kit) for basic folder structure and webpack configurations.
