
//lib
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


interface MenuItemProps {
  closeMenu(value: string): void;
  openMenu(event: React.MouseEvent<HTMLElement>): void;
  LoggedOut(): void;
  menuElement: null | HTMLElement;
  userData: any;
}
const MenuItems = ({
  closeMenu,
  openMenu,
  LoggedOut,
  menuElement,
  userData,
}: MenuItemProps) => {
  return (
    <div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={menuElement}
        open={Boolean(menuElement)}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem style={{ justifyContent: "space-between" }}>
          <img
            className="profilePic"
            src={userData.ownerAvatar}
            alt="profile"
            onClick={openMenu}
          />
          {userData.ownerName}
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu("profile");
          }}
        >
          Your Gists
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu("public");
          }}
        >
          Public Gists
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu("starred");
          }}
        >
          Starred Gists
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu("createGist");
          }}
        >
          Create A Gist
        </MenuItem>
        <MenuItem
          onClick={() => {
            LoggedOut();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuItems;
