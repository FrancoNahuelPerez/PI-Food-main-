import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";    // Importa el reductor principal (rootReducer)
import thunkMiddleware from "redux-thunk";    // Importa el middleware "redux-thunk"

// Habilita la extensión de Redux DevTools o utiliza la función "compose" por defecto si no está disponible la extensión
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Crea la tienda (store) pasando el reductor principal (rootReducer) y aplicando el middleware thunkMiddleware
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;