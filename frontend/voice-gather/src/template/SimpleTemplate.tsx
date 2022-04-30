import { VFC, ReactNode, useEffect, useReducer, createContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/blocks/header/Header';
import { SearchFilterForm } from '../components/blocks/filterBox/SearchFilterForm';
import { getCategory } from '../features/category/getCategory';
import { getQuestionnaire } from '../features/questionnaire/getQuestionnaire';

type SimpleTemplateProps = {
    children: ReactNode;
    useFooter: boolean;
}

export const FilterContext = createContext<any>({startDate: '',endDate: '',category: []})

export const SimpleTemplate: VFC<SimpleTemplateProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const category = useSelector((state: any) => state.categoryReducer);
  const loadCategory = async () => {
    const response = await getCategory({})
    return {type: 'SET', data: response};
  }
  const setCategory = async () => dispatch(await loadCategory());

  const searchFilterState = useSelector((state: any) => state.searchFilterReducer);
  const selectStartDate = (
    e:React.ChangeEvent<HTMLInputElement>) => dispatch({type: 'STARTAT', value: e.target.value})
  const selectEndDate = (
    e:React.ChangeEvent<HTMLInputElement>) => dispatch({type: 'ENDAT', value: e.target.value})
  const toggleCategory = (
    e:React.ChangeEvent<HTMLInputElement>) => dispatch({type: 'CATEGORY', value: e.target.value})
  const resetFilter = () => dispatch({type: 'RESET', value:null})

  const filterValue = useMemo(
    ()=>({
      searchFilterState,
      selectStartDate,
      selectEndDate,
      toggleCategory,
      resetFilter
    }), [searchFilterState]
  );

  console.log(searchFilterState);

  const submit: React.MouseEventHandler<HTMLButtonElement> = async (e: React.MouseEvent) => {
    e.preventDefault();

    const searchResult = await getQuestionnaire(searchFilterState);
    const head = searchFilterState.category.join('/')
    navigate(
      '/search/', 
      {state:{data: searchResult, head:head}})
  };
  
  useEffect(()=>{
    setCategory();
  }, []);

  return (
    <>
      <Header/>
      <div style={{
        backgroundColor:"#eaedf7",
        width: "95vw",padding:"16px 2.5vw"}}>
        <div style={{display:"flex", flexWrap:"nowrap", justifyContent:"space-between"}}>
            {props.children}
            <FilterContext.Provider value={filterValue}>
              <SearchFilterForm data={category} onClick={submit}/>
          </FilterContext.Provider>
        </div>
      </div>
      {<footer></footer> ? props.useFooter : <></>}
    </>
  )
}