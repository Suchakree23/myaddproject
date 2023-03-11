import React from "react";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller
} from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";

interface FormValues {
  editor: string;
  records: {
    name: string;
    age: string;
    dropdown: {
      name: string;
      code: string;
    };
  }[];
}

const App: React.FC = () => {
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" }
  ];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      records: [{ name: "", age: "", dropdown: { name: "", code: "" } }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "records"
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <div className="App">
      <h1>Dropdown</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          className="p-button-success"
          type="button"
          label="APPEND"
          onClick={() =>
            append({ name: "", age: "", dropdown: { name: "", code: "" } })
          }
        />

        <Controller
          control={control}
          name={`editor`}
          rules={{ required: false }}
          render={({ field: { onChange, value, name } }: any) => (
            <Editor
              value={value}
              className="mt-3"
              style={{ height: "200px" }}
              onTextChange={(e) => onChange(e.htmlValue)}
            />
          )}
        />

        {fields.map((field, index) => {
          return (
            <div key={field.id} className="my-3">
              <div className="block">
                <Controller
                  control={control}
                  name={`records.${index}.dropdown`}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, name } }: any) => (
                    <Dropdown
                      value={value}
                      options={cities}
                      optionLabel="name"
                      placeholder="Select a City"
                      onChange={(e: any) => onChange(e)}
                    />
                  )}
                />
                <InputText
                  placeholder="Enter your name"
                  {...register(`records.${index}.name` as const, {
                    required: true
                  })}
                />
                <InputText
                  placeholder="Enter your age"
                  {...register(`records.${index}.age` as const, {
                    required: true
                  })}
                />
                <Button
                  className="p-button-danger"
                  type="button"
                  label="DELETE"
                  onClick={() => remove(index)}
                />
              </div>
              {errors.records && (
                <div className="block text-red-500 text-sm mb-2">
                  Press Select
                </div>
              )}
            </div>
          );
        })}

        <Button label="SAVE" />
      </form>
    </div>
  );
};

export default App;
