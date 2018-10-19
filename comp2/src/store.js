import { store } from 'microfront_reference_store/src/store.js';
import { comp2 } from './reducers/app.js';

store.addReducers({ comp2 });

export default store;