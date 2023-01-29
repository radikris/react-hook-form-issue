import React from "react";
import EditableDayMenu from "./EditableDayMenu";

const MobileWeeklyMenu = ({
  isEditView,
  weeks,
  menus,
  currentWeek,
  elRefs,
  menuThisWeek,
}) => {
  return (
    <table className="w-full mx-auto border-collapse border-spacing-10 block lg:hidden whitespace-normal border-2 border-gray-500 rounded-xl overflow-x-auto">
      {weeks.map((week, dayOfWeek) => {
        return (
          <tr key={week}>
            <th className="border w-[30%] border-gray-400 text-Brand-Secondary px-1 xl:px-6">
              {week}
            </th>
            <td
              valign="top"
              className={`border border-gray-400 p-3 ${
                menuThisWeek == null ? "bg-slate-200" : ""
              }`}
            >
              {menuThisWeek?.[dayOfWeek]?.day?.map((day, index) => {
                return (
                  <div key={day.menuCategory + index}>
                    {!isEditView ? (
                      <div>
                        <p className="font-bold text-lg">{day.menuCategory}</p>
                        <p className="font-base text-gray-700 break-all">
                          {day.menuDescription}
                        </p>
                      </div>
                    ) : (
                      <EditableDayMenu
                        ref={elRefs.current[dayOfWeek]}
                        weekOfYear={currentWeek}
                        dayOfWeek={dayOfWeek}
                        menu={menus?.[dayOfWeek]?.day}
                      />
                    )}
                  </div>
                );
              })}
              {isEditView && menuThisWeek?.[dayOfWeek]?.day.length == 0 && (
                <EditableDayMenu
                  ref={elRefs.current[dayOfWeek]}
                  weekOfYear={currentWeek}
                  dayOfWeek={dayOfWeek}
                  menu={menus?.[dayOfWeek]?.day}
                />
              )}
            </td>
          </tr>
        );
      })}
    </table>
  );
};

export default MobileWeeklyMenu;
