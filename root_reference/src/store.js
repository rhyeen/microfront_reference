import { store } from 'microfront_reference_store/src/store.js';
import root from './reducers/root.js';
import { compLitElement } from 'microfront_reference_comp_litelement/src/reducers/app.js';
// import { compLitElement } from './comp_litelement/src/reducers/app.js';
import { compVanilla } from 'microfront_reference_comp_vanilla/src/reducers/app.js';
import { compReact } from 'microfront_reference_comp_react/src/reducers/app.js';

store.addReducers({ root });
store.addReducers({ compLitElement });
store.addReducers({ compVanilla });
store.addReducers({ compReact });
export default store;