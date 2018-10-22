import { store } from 'microfront_reference_store/src/store.js';
import root from './reducers/root.js';
import { comp1 } from 'microfront_reference_comp1/src/reducers/app.js';
import { comp2 } from 'microfront_reference_comp2/src/reducers/app.js';
import { compVanilla } from 'microfront_reference_comp_vanilla/src/reducers/app.js';

store.addReducers({ root });
store.addReducers({ comp1 });
store.addReducers({ comp2 });
store.addReducers({ compVanilla });

export default store;