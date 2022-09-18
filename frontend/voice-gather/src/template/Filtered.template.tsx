import { VFC, ReactNode } from 'react';
import { SimpleTemplate } from './Simple.template';

type FilteredTemplateProps = {
    useFooter: boolean;
    displayFilter: ReactNode;
    simpleQuestionnaire: ReactNode;
}

export const FilteredTemplate: VFC<FilteredTemplateProps> = (props) => {
    return (
        <SimpleTemplate useFooter={props.useFooter}>
            <div style={{ width: "75vw", marginRight: ".5em" }}>
                <div style={{ width: "100%", backgroundColor: "white", borderRadius: "4px" }}>
                    <div style={{ padding: ".5em" }}>
                        {props.displayFilter}
                    </div>
                    {props.simpleQuestionnaire}
                </div>
            </div>
        </SimpleTemplate>
    )
}