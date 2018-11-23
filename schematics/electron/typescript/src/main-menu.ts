import { Menu } from "electron";

const template: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {role: 'close'},
    ]
  },
  {
    label: "Edit",
    submenu: [
      {role: "undo"},
      {role: "redo"},
      {type: "separator"},
      {role: "cut"},
      {role: "copy"},
      {role: "paste"},
      {role: "pasteandmatchstyle"},
      {role: "delete"},
      {role: "selectall"},
    ],
  },
  {
    label: "View",
    submenu: [
      {role: "reload"},
      {role: "forcereload"},
      {role: "toggledevtools"},
      {type: "separator"},
      {role: "resetzoom"},
      {role: "zoomin"},
      {role: "zoomout"},
      {type: "separator"},
      {role: "togglefullscreen"},
    ],
  },
  {
    role: "window",
    submenu: [
      {role: "minimize"},
      {role: "close"},
    ],
  },
];

const DefaultMenu: Electron.Menu = Menu.buildFromTemplate(template);

export default DefaultMenu;
