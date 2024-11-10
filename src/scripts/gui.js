import dat from "lil-gui";
export const debug = {};

const defaults = {
  title: "Base project",
};

export const GUI = (config = {}) => new dat(Object.assign(defaults, config));

//use this or the previous but not both (or you'll have two instances og GUI!)
export const gui = GUI();
gui.close();
gui.hide();

export const guiHandler = (key) => {
  if (key === "s") {
    gui._hidden ? gui.show() : gui.hide();
  }
};
