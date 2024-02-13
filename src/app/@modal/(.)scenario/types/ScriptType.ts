export type ScriptType = {
  scenes: Scene[];
  title: string;
  duration: string;
  thumbnail: string;
  reqPerson: number;
  roles: RoleInfo[];
};

export type Scene = {
  seq: number;
  title: string;
  dialogs: Dialog[];
};

export type Dialog = {
  roles: {
    roleName: String;
    roleImg: String;
  }[];
  dialog: string;
};

export type RoleInfo = {
  roleId: number;
  roleImg: string;
  roleName: string;
};
