import { VFC, ReactNode } from 'react';
import { SimpleTemplate } from './Simple.template';

type DetailTemplateProps = {
  useFooter: boolean;
  questionnaireDetail: ReactNode;
}

export const DetailTemplate: VFC<DetailTemplateProps> = (props) => {
  return (
    <SimpleTemplate useFooter={props.useFooter}>
      <div style={{ width: "75vw", marginRight: ".5em" }}>
        <div style={{ width: "100%", backgroundColor: "white", borderRadius: "4px", marginBottom: "1em" }}>
          {props.questionnaireDetail}
        </div>
      </div>
    </SimpleTemplate>
  )
}