import { store } from 'microfront_reference_store/src/store.js';
import { comp1 } from './reducers/app.js';

store.addReducers({ comp1 });

export default store;