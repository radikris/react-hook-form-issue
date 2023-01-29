import React, { forwardRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import PrimaryButton from "./PrimaryButton";
import { useProfileContext } from "../context/ProfileContext";


const EditableDayMenu = forwardRef(({ weekOfYear, dayOfWeek, menu }, ref) => {
  const { register, control, handleSubmit, watch, getValues } = useForm({
    defaultValues: {
      menu: menu?.map((item) => {
        return {
          menuCategory: item.menuCategory,
          menuDescription: item.menuDescription,
        };
      }),
    },
  });

  const { handleMenu } = useProfileContext();


  const { fields, append, remove } = useFieldArray({
    control,
    name: "menu",
  });

  const onSubmit = (data) => {
    console.log(data);
    handleMenu(weekOfYear, dayOfWeek, data);
  };

  console.log(watch());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => {
        return (
          <div className="" key={item.id}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Thing category
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register(`menu.${index}.menuCategory`, { required: true })}
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Thing description
            </label>
            <textarea
              rows={5}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register(`menu.${index}.menuDescription`, { required: true })}
            />

            <button
              className="mb-3"
              type="button"
              onClick={() => remove(index)}
            >
              Menü törlése
            </button>
          </div>
        );
      })}
      <button
        className="block lg:hidden xl:block mx-auto"
        type="button"
        onClick={() => {
          append({ menuCategory: "", menuDescription: "" });
        }}
      >
        <PrimaryButton text={"New thing"} />
      </button>
      <button
        className="hidden lg:block xl:hidden mx-auto"
        type="button"
        onClick={() => {
          append({ menuCategory: "", menuDescription: "" });
        }}
      >
        <PrimaryButton text={"+"} />
      </button>
      <button onClick={()=>console.log('KRISZI',watch())} hidden={true} ref={ref} type={"submit"} />
    </form>
  );
});

export default EditableDayMenu;
EditableDayMenu.displayName = "EditableDayMenu";
