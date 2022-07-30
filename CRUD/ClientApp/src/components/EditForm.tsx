import { Form, Field, FormElement, FieldRenderProps } from "@progress/kendo-react-form";
import { Checkbox, Input, NumericTextBox } from "@progress/kendo-react-inputs";
import { Error } from "@progress/kendo-react-labels";
import { Label } from "@progress/kendo-react-labels";
import { Product } from '../interfaces';
// import fields from "./fields.json";

interface EditFormProps {
    onSubmit: (id: number, obj: any) => void,
    onDelete: (id: number) => void,
    item: Product,
    setItem: (item: any) => void,
    data: any,
    setData: (newData: any) => void,
}

// Проврека числовых полей на корректность
const minValueValidator = (value: number) => value >= 0 ? "" : "The value must be 0 or higher";
const NonNegativeNumericInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
        <div>
            <NumericTextBox {...others} />
            {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>
    );
};

const EditForm = (props: EditFormProps) => {
    
    const handleSubmit = (dataItem: { [name: string]: any }) => {
        console.log(dataItem)
        props.onSubmit(dataItem.id, dataItem);
        props.setItem(dataItem);
        let newData = props.data.map((item: any) => {
            if (dataItem.id === item.id) {
                item = { ...dataItem };
            }
            return item;
        });
        props.setData(newData);
    }

    const DelButton = () => {
        props.onDelete(props.item.id ?? 0)
        const newData = props.data.filter((item: any) => props.item.id !== item.id)
        props.setData(newData);
        console.log(props.data)
        props.setItem({});
    }

    return (
        <Form
            key={props.item.id}
            initialValues={props.item}
            onSubmit={handleSubmit}
            render={(formRenderProps) => (
                <FormElement style={{ maxWidth: 650 }}>
                    <div className="k-form-buttons">
                        <button
                            type="submit"
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                            disabled={!formRenderProps.allowSubmit}
                        >
                            Update
                        </button>
                        <button
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                            onClick={DelButton}
                        >
                            Delete
                        </button>
                    </div>
                    <fieldset className={"k-form-fieldset"}>
                        <div className="mb-3">
                            <Label>{`ID: ${props.item.id}`}</Label>
                        </div>

                        {/* {fields.map(field =>
                            <Field
                                name={field.name}
                                label={field.label}
                            />
                        )} */}

                        <Field
                            name={"productName"}
                            component={Input}
                            label={"Product Name"}
                        />

                        <Field
                            name={"supplierID"}
                            component={NonNegativeNumericInput}
                            label={"Supplier ID"}
                            validator={minValueValidator}
                        />

                        <Field
                            name={"quantityPerUnit"}
                            component={Input}
                            label={"Quantity Per Unit"}
                        />

                        <Field
                            name={"unitPrice"}
                            component={NonNegativeNumericInput}
                            label={"Unit Price"}
                            validator={minValueValidator}
                        />

                        <Field
                            name={"unitsInStock"}
                            component={NonNegativeNumericInput}
                            label={"Units In Stock"}
                            validator={minValueValidator}
                        />

                        <Field
                            name={"unitsOnOrder"}
                            component={NonNegativeNumericInput}
                            label={"units On Order"}
                            validator={minValueValidator}
                        />

                        <Field
                            name={"reorderLevel"}
                            component={NonNegativeNumericInput}
                            label={"Reorder Level"}
                            validator={minValueValidator}
                        />

                        <Field
                            name={"discontinued"}
                            component={Checkbox}
                            label={"Discontinued"}
                        />
                    </fieldset>
                </FormElement>
            )}
        />
    );
};

export default EditForm;