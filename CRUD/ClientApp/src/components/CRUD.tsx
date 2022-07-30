import { Splitter, SplitterOnChangeEvent } from "@progress/kendo-react-layout";
import React from 'react';
import '../styles/App.scss';
import GroupGrid from './GroupGrid';
import BigForm from './BigForm';

const CRUD = () => {
    // разделение таблицы и формы
    const [nestedPanes, setNestedPanes] = React.useState<Array<any>>([
        { size: 1000, resizable: true, collapsible: true },
        { resizable: true, collapsible: true },
    ]);
    const onNestedChange = (event: SplitterOnChangeEvent) => {
        setNestedPanes(event.newState);
    };

    const [data, setData] = React.useState<Array<any>>([]);
    const [editItem, setEditItem] = React.useState<any>({});

    return (
        <div>
            <div className="header">
                <h1>Табличка</h1>
            </div>

            <Splitter
                style={{ height: 900 }}
                panes={nestedPanes}
                orientation={"vertical"}
                onChange={onNestedChange}
            >
                <div className="table">
                    <GroupGrid data={data} setData={setData} setEditItem={setEditItem} />
                </div>

                <div className="form">
                    <BigForm editItem={editItem} setEditItem={setEditItem} data={data} setData={setData} />
                </div>
            </Splitter>
        </div>
    )
}

export default CRUD
