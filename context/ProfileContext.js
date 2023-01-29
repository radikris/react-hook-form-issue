import { createContext, useContext, useState } from "react";
const allMenu = [
  {
      "weekOfYear": 0,
      "weeklyMenu": [
          {
              "day": []
          },
          {
              "day": []
          },
          {
              "day": [
                  {
                      "menuCategory": "A thing",
                      "menuDescription": "First thing"
                  },
                  {
                      "menuCategory": "B thing",
                      "menuDescription": "Secondary thing"
                  },
              ]
          },
          {
              "day": []
          },
          {
              "day": [
                {
                  "menuCategory": "A thing",
                  "menuDescription": "First thing"
              },
              {
                  "menuCategory": "B thing",
                  "menuDescription": "Secondary thing"
              },
              {
                  "menuCategory": "C thing",
                  "menuDescription": "Third thing"
              },
              ]
          },
          {
              "day": []
          },
          {
              "day": []
          }
      ]
  }
]
export const ProfileContext = createContext({
  menu: allMenu,
  handleMenu: (weekOfYear, dayOfWeek, menu) => {},
  setMenu: (menu) => {},
  user: undefined,
  setUser: () => {},
});


export const useProfileContext = () => useContext(ProfileContext);

const ProfileProvider = ({ children }) => {
  const [menuData, setMenuData] = useState(allMenu);


  const handleMenu = (weekOfYear, dayOfWeek, menu) => {

    //not calculating the week, only hardcoded
    weekOfYear=0
    console.log(weekOfYear, dayOfWeek, menu)

    
    setMenuData((prevMenu) => {
      //prevMenu.find((m)=>m.weekOfYear==weekOfYear)?.[dayOfWeek].day=menu
      const copyMenu = JSON.parse(JSON.stringify(prevMenu))
      const indexOfUpdateableMenu = copyMenu.findIndex(
        (m) => m.weekOfYear == weekOfYear
      );
      copyMenu[indexOfUpdateableMenu].weeklyMenu[dayOfWeek].day=menu.menu

      console.log(copyMenu)
      return copyMenu;
    });
  };

  const [userData, setUserData] = useState();
    
  const handleUser = (user) => {
      setUserData(user);
    };


  return (
    <ProfileContext.Provider
      value={{ menu: menuData, setMenu: setMenuData, handleMenu: handleMenu, user: userData, setUser: handleUser }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
