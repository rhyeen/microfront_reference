import { store } from 'microfront_reference_store/src/store.js';
import { compLitElement } from './reducers/app.js';

store.addReducers({ compLitElement });

export default store;