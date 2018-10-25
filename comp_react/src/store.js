import { store } from 'microfront_reference_store/src/store.js';
import { compReact } from './reducers/app.js';

store.addReducers({ compReact });

export default store;