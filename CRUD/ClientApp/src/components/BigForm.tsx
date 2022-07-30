import React from 'react'
import {
    TabStrip,
    TabStripSelectEventArguments,
    TabStripTab,
} from "@progress/kendo-react-layout";
import { edit, del } from "./Server"
import EditForm from './EditForm';

const BigForm = (props: any) => {
    // tabstrip
    const [selected, setSelected] = React.useState<number>(0);
    const handleSelect = (e: TabStripSelectEventArguments) => {
        setSelected(e.selected);
    };

    return (
        <div>
            <TabStrip selected={selected} onSelect={handleSelect}>
                <TabStripTab title="Tab 1 Title">


                    <EditForm onSubmit={edit} onDelete={del} item={props.editItem} setItem={props.setEditItem} data={props.data} setData={props.setData} />

                </TabStripTab>
                <TabStripTab title="Tab 2 Title">
                    <p>Tab 2 Content</p>
                </TabStripTab>
                <TabStripTab title="Tab 3 Title">
                    <p>Tab 3 Content</p>
                </TabStripTab>
            </TabStrip>
        </div>
    )
}

export default BigForm
