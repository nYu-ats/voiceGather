import { VFC, ReactNode } from 'react';
import { Header } from '../components/organisms/header/Header';
import { SearchFilterForm } from '../components/organisms/form/SearchFilterForm';

type SimpleTemplateProps = {
    children: ReactNode;
    useFooter: boolean;
}

export const SimpleTemplate: VFC<SimpleTemplateProps> = (props) => {
  return (
    <>
      <Header/>
      <div style={{
        backgroundColor:"#eaedf7",
        width: "95vw",padding:"16px 2.5vw"}}>
        <div style={{display:"flex", flexWrap:"nowrap", justifyContent:"space-between"}}>
            {props.children}
            <SearchFilterForm />
        </div>
      </div>
      {<footer></footer> ? props.useFooter : <></>}
    </>
  )
}