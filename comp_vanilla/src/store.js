import { store } from 'microfront_reference_store/src/store.js';
import { compVanilla } from './reducers/app.js';

store.addReducers({ compVanilla });

export default store;