import React, { createRef, useEffect, useState } from "react";
import moment from "moment-with-locales-es6";
import MobileWeeklyMenu from "./MobileWeeklyMenu";
import DesktopWeeklyMenu from "./DesktopWeeklyMenu";

function calcCurrentWeek(deficitFromCurrentWeek) {
    var currentDate = moment();
  
    var weekStart = currentDate.clone().startOf("isoWeek");
    weekStart = weekStart.subtract(deficitFromCurrentWeek, "week");
  
    var days = [];
  
    for (var i = 0; i <= 6; i++) {
      days.push(
        moment(weekStart).add(i, "days").locale("hu").format("MMMM Do  dddd")
      );
    }
    return days;
  }




  
const Wrapper = ({ allMenu, isEditable = true }) => {
  const [currentWeek, setCurrentWeek] = useState();
  const [isEditView, setIsEditView] = useState(false);
  const fixWeek = Number(moment().format("w"));
  const arrLength = 7;
  const currentYear = (moment().format("y"))
  const elRefs = React.useRef([]);
  const mobileelRefs = React.useRef([]);

  const [isMobileView, setIsMobileView] = useState();
  const handleResize = () => {
    window.innerWidth>1024 ? setIsMobileView(false) : setIsMobileView(true)
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  if (elRefs.current.length !== arrLength) {
    // add or remove refs
    elRefs.current = Array(arrLength)
      .fill()
      .map((_, i) => elRefs.current?.[i] || createRef());
  }
  
  if (mobileelRefs.current.length !== arrLength) {
    // add or remove refs
    mobileelRefs.current = Array(arrLength)
      .fill()
      .map((_, i) => mobileelRefs.current?.[i] || createRef());
  }

  useEffect(() => {
    setCurrentWeek(Number(moment().format("w")));
  }, []);

  const handleNextWeek = () => {
    setCurrentWeek((prev) => Number(moment(currentYear).week(prev).add(1, 'weeks').format("w")));
    setIsEditView(false)
  };
  const handlePrevWeek = () => {
    setCurrentWeek((prev) => Number(moment(currentYear).week(prev).subtract(1, 'weeks').format("w")));
    setIsEditView(false)

  };

  //var weekStart = currentDate.clone().startOf('isoWeek');

  const menuOfTheWeek = (currentWeek) => {
    return allMenu?.[0]?.weeklyMenu;
  };

  /*   if (currentWeek == null) return <p>Loading...</p>;
   */
  const menuThisWeek = menuOfTheWeek(currentWeek);


  return (
    <div className="text-Brand-Primary relative pt-4 lg:pt-0">
      {menuThisWeek != null && isEditable && (
        <div className="flex items-center gap-x-2 absolute right-0 w-full justify-center sm:w-fit">
 {/*  */}
          {!isEditView ? (
            <button
              onClick={() => setIsEditView(true)}
              className="bg-Brand-Secondary rounded-2xl px-3 py-2 text-white hover:bg-opacity-80"
            >
              EDIT
            </button>
          ) : (
            <button
              onClick={() => {
                setIsEditView(false);
                const weekResponsiveButtons = isMobileView ? mobileelRefs : elRefs
                weekResponsiveButtons.current.forEach((ref) => {
                  console.log(ref.current);
                  ref.current?.click();
                });
              }}
              className="bg-green-500 rounded-2xl px-3 py-2 text-white hover:bg-opacity-80"
            >
              SAVE
            </button>
          )}
        </div>
      )}
      <div className="block lg:hidden h-12" />
      <p className="text-3xl">Weekly things</p>
      <div className="w-full relative mx-auto mt-5">
        <p className="text-center text-2xl font-bold text-gray-800">
          {currentWeek} week
        </p>
      </div>

      <div className="w-full space-x-3 hidden lg:flex">
      <DesktopWeeklyMenu
          isEditView={isEditView}
          weeks={calcCurrentWeek(fixWeek - currentWeek)}
          menus={menuThisWeek}
          currentWeek={currentWeek}
          elRefs={elRefs}
          menuThisWeek={menuThisWeek}
        />
      </div>
      {(
        <MobileWeeklyMenu
          isEditView={isEditView}
          weeks={calcCurrentWeek(fixWeek - currentWeek)}
          menus={menuThisWeek}
          currentWeek={currentWeek}
          elRefs={mobileelRefs}
          menuThisWeek={menuThisWeek}
        />
      )}
    </div>
  );
};

export default Wrapper;
