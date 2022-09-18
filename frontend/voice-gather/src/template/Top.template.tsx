import { VFC, ReactNode } from 'react';
import { SimpleTemplate } from './Simple.template';

type TopTemplateProps = {
  useFooter: boolean;
  categorizedQuestionnaire: ReactNode;
  trendKeyword: ReactNode;
  simpleQuestionnaire: ReactNode;
}

export const TopTemplate: VFC<TopTemplateProps> = (props) => {
  return (
    <SimpleTemplate useFooter={props.useFooter}>
      <div style={{ width: "75vw", marginRight: ".5em" }}>
        <div style={{ width: "100%", backgroundColor: "white", borderRadius: "4px", marginBottom: "1em" }}>
          {props.categorizedQuestionnaire}
        </div>
        <div style={{ width: "100%", backgroundColor: "#fafafa", borderRadius: "4px", marginBottom: "1em" }}>
          {props.trendKeyword}
        </div>
        <div style={{ width: "100%", backgroundColor: "white", borderRadius: "4px" }}>
          {props.simpleQuestionnaire}
        </div>
      </div>
    </SimpleTemplate>
  )
}