export type Dialog = {
  img: string;
  role: string;
  dialog: string;
};

export type Scene = {
  sequence: number;
  title: string;
  dialogs: Dialog[];
};

export type RoleInfo = {
  img: string;
  role: string;
};

export type ScriptType = {
  scene: Scene[];
  title: string;
  duration: string;
  thumbnail: string;
  person: number;
  roles: RoleInfo[];
};
