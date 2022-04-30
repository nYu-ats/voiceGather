import { legacy_createStore as createStore, combineReducers } from 'redux';

export type Category = {
    id: number;
    name: string;
    count: number;
}

export type SearchFilterState = {
    startDate: string;
    endDate: string;
    category: Array<string>;
}

type SearchFilterAction = {type: 'STARTAT'; value: string} 
| {type: 'ENDAT'; value: string} 
| {type: 'CATEGORY'; value: string} 
| {type: 'RESET'; value: null} 

class Store{
    category: Array<Category>;
    initialFilterState: SearchFilterState;
    rootReducer
    store;

    private static instance: Store;

    constructor(){
        this.category = [];
        this.initialFilterState = {startDate: '',endDate: '',category: []}
        const categoryReducer = (state=this.category, action: { type: string; data: Array<string>; }) => {
            switch(action.type){
                case 'SET':
                    return action.data;
                default:
                    return state;
            }
        };
        const searchFilterReducer = (state=this.initialFilterState, action: SearchFilterAction) => {
            switch (action.type){
                case 'STARTAT':
                    return {...state, startDate: action.value}
                case 'ENDAT':
                    return {...state, endDate: action.value}
                case 'CATEGORY':
                    let newCategoryState = state.category.filter((item) => item !== action.value);
                    if(newCategoryState.length === state.category.length){
                    newCategoryState.push(action.value)
                    }
                    return {...state, category: newCategoryState}
                case 'RESET':
                    return {startDate: '',endDate: '',category: []}
                default:
                    return state
                }
            }
        this.rootReducer = combineReducers({
            categoryReducer, searchFilterReducer
        });
        this.store = createStore(this.rootReducer);
    }

    public static getStore(){
        if(!this.instance){
            this.instance = new Store();
        }

        return this.instance.store;
    }
}

export default Store.getStore();