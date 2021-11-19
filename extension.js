const {Gio, Shell, Meta} = imports.gi;
const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;

function init() {
  
}
let added = 0;
const name = 'switch-to-input-source-';

function enable() {
  let settings = ExtensionUtils.getSettings("org.gnome.shell.extensions.direct-input-source-switcher");
  
  const n = settings.get_int('input-source-count');
  if (n < 0) n = 0;
  if (n > 4) n = 4;
  settings.set_int('input-source-count', n);
  
  for (var i = 1; i <= n; i++) {
    settings.set_strv(name + i, settings.get_strv(name + i));
  
    // Shell.ActionMode.NORMAL
    // Shell.ActionMode.OVERVIEW
    // Shell.ActionMode.LOCK_SCREEN
    // Shell.ActionMode.ALL
    let mode = Shell.ActionMode.ALL;

    // Meta.KeyBindingFlags.NONE
    // Meta.KeyBindingFlags.PER_WINDOW
    // Meta.KeyBindingFlags.BUILTIN
    // Meta.KeyBindingFlags.IGNORE_AUTOREPEAT
    let flag = Meta.KeyBindingFlags.BUILTIN;
    const j = i;

    Main.wm.addKeybinding(name + i, settings, flag, mode, () => {
      const manager = imports.ui.status.keyboard.getInputSourceManager();
      //For gnome versions 41+ || 40-
      const sources = manager._inputSource || manager.inputSources;
      sources[j-1].activate()
    });
  }
  added = n;
}

function disable() {
  for (var i = 1; i <= added; i++) {
    Main.wm.removeKeybinding(name + i);
  }
}