import React, { useEffect } from "react";
import axios from "axios";

import {
    Grid,
    GridColumn as Column,
    GridDataStateChangeEvent,
    GridExpandChangeEvent,
    GridNoRecords,
    GridRowClickEvent,
    GridToolbar,
} from "@progress/kendo-react-grid";
import { LoadingPanel } from "./LoadingPanel";
import { DataResult, process, State } from "@progress/kendo-data-query";
import { getGroupIds, setExpandedState, setGroupIds } from "@progress/kendo-react-data-tools";
import columns from "./columns";
import { Product } from "../interfaces";

interface GridProps {
    data: any[],
    setData: (data: any[]) => void,
    setEditItem: (event: any) => void,
}

const initialDataState: State = {
    take: 10,
    skip: 0,
    group: [],
};

const GroupGrid = (props: GridProps) => {
    // группировка
    const processWithGroups = (data: any[], dataState: State) => {
        const newDataState = process(data, dataState);

        setGroupIds({ data: newDataState.data, group: dataState.group });

        return newDataState;
    };

    // хуки
    const [dataState, setDataState] = React.useState<State>(initialDataState);
    const [resultState, setResultState] = React.useState<DataResult>(
        processWithGroups(props.data, initialDataState)
    );
    const [collapsedState, setCollapsedState] = React.useState<string[]>([]);

    // const [stateColumns, setStateColumns] = React.useState<Array<columnInterface>>(props.columns);

    // Событие на изменение данных
    const onDataStateChange = React.useCallback(
        (event: GridDataStateChangeEvent) => {
            onUpdate();
            const newDataState = processWithGroups(props.data, event.dataState);

            setDataState(event.dataState);
            setResultState(newDataState);
        },
        []
    );

    // Нажатие кнопки группировки
    const onGroupsToggle = React.useCallback(() => {
        const dataStateWithoutPaging = processWithGroups(props.data, {
            group: dataState.group,
        });

        setCollapsedState(
            collapsedState.length
                ? []
                : getGroupIds({ data: dataStateWithoutPaging.data })
        );
    }, [collapsedState, dataState]);

    // Расскрытие/закрытие группы
    const onExpandChange = React.useCallback(
        (event: GridExpandChangeEvent) => {
            const item = event.dataItem;

            if (item.groupId) {
                const collapsedIds = !event.value
                    ? [...collapsedState, item.groupId]
                    : collapsedState.filter((groupId) => groupId !== item.groupId);
                setCollapsedState(collapsedIds);
            }
        },
        [collapsedState]
    );

    // Получение данных при запуске
    const baseUrl = "http://localhost:5186/api/Products";
    const onUpdate = async () => {
        const response = await axios.get(baseUrl)
        console.log(response.data)
        props.setData(response.data)
    }

    React.useEffect(() => {
        onUpdate();
    }, []);

    // Повторная группировка при изменении данных
    React.useEffect(() => {
        const newDataState = processWithGroups(props.data, dataState);
        setResultState(newDataState);
    }, [props.data]);


    // Данные с учетом группировок
    const newData = setExpandedState({
        data: resultState.data,
        collapsedIds: collapsedState,
    });
    
    // Добавление записи
    const onAddNew = async () => {
        const response = await axios.post(baseUrl, {});
        const newProduct: Product = response.data;
        let newItem = { id: newProduct.id, productName: "", quantityPerUnit: "" };
        props.setData([newItem, ...props.data])
        props.setEditItem(newItem);
    }

    // Обработка нажатия на строку таблицы
    const rowClick = (event: GridRowClickEvent) => {
        props.setEditItem(event.dataItem);
    };

    return (
        <div>
            <Grid
                style={dataState.take === 5 ? { height: 410 } : { height: 590 }}
                data={newData}
                pageable={{ pageSizes: true }}
                groupable={true}
                total={resultState.total}
                onDataStateChange={onDataStateChange}
                {...dataState}
                sortable={true}
                filterable={true}
                onRowClick={rowClick}
                onExpandChange={onExpandChange}
                expandField="expanded"
                // resizable={true}
            >
                <GridToolbar>
                    <div>
                        <button
                            title="update"
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                            onClick={onUpdate}
                        >
                            Обновить
                        </button>
                        <button
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                            onClick={onAddNew}
                            style={{ marginLeft: "15px" }}
                        >
                            Add new
                        </button>
                        <button
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                            onClick={onGroupsToggle}
                            style={{ marginLeft: "15px" }}
                        >
                            {collapsedState.length ? "Expand" : "Collapse"} Groups
                        </button>
                    </div>
                </GridToolbar>
                <GridNoRecords>
                    {props.data.length === 0 ? 'No records' : <LoadingPanel />}
                </GridNoRecords>
                {columns.map(
                    (column, idx) =>
                        column.show && (
                            <Column
                                key={idx}
                                field={column.field}
                                title={column.title}
                                filter={column.filter}
                            />
                        )
                )}
            </Grid>
        </div>
    );
};

export default GroupGrid;