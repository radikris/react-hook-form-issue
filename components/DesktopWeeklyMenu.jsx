import React from 'react'
import EditableDayMenu from './EditableDayMenu';

const DesktopWeeklyMenu = ({
    isEditView,
    weeks,
    menus,
    currentWeek,
    elRefs,
    menuThisWeek,
}) => {
  return (
    <table className="table-fixed w-[90%] mx-auto border-2 border-gray-500 rounded-xl">
    <thead>
      <tr>
        {weeks.map((item) => {
          return (
            <th
              key={item}
              className="border border-gray-400 text-Brand-Secondary px-1 xl:px-6"
            >
              <div className='min-h-[52px] flex items-center justify-center'>
              {item}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
    <tbody>
      <tr>
        {menuThisWeek?.map((day, dayOfWeek) => {
          return (
            <td
              key={day + dayOfWeek}
              valign="top"
              className="border border-gray-400 p-1 2xl:p-3"
            >
              <div className="flex flex-col gap-y-3">
                {!isEditView &&
                  day.day?.map((menu, idx) => {
                    return (
                      <div key={menu.menuCategory + idx}>
                        <p className="font-bold text-lg">
                          {menu.menuCategory}
                        </p>
                        <p className="font-base text-gray-700 break-all">
                          {menu.menuDescription}
                        </p>
                      </div>
                    );
                  })}
              </div>
              {isEditView && (
                <EditableDayMenu
                  ref={elRefs.current[dayOfWeek]}
                  weekOfYear={currentWeek}
                  dayOfWeek={dayOfWeek}
                  menu={day.day}
                />
                
              )}
            </td>
          );
        })}
      </tr>
    </tbody>
  </table>
    )
}

export default DesktopWeeklyMenu