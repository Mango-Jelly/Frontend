export type ScriptType = {
  scenes: Scene[];
  title: string;
  duration: string;
  thumbnail: string;
  person: number;
  roles: RoleInfo[];
};

export type Scene = {
  sequence: number;
  title: string;
  dialogs: Dialog[];
};

export type Dialog = {
  role: {
    name: String;
    img: String;
  }[];
  dialog: string;
};

export type RoleInfo = {
  id: number;
  img: string;
  role: string;
};
