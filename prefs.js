'use strict';

const Gtk = imports.gi.Gtk;
const GLib = imports.gi.GLib;

function init() {
}

function buildPrefsWidget() {
    const button = new Gtk.Button({ label: 'Open preferences in dconf-editor' });
    button.connect('clicked', () => {
      GLib.spawn_async(
        null, 
        ['dconf-editor', '/org/gnome/shell/extensions/direct-input-source-switcher/'],
        null,
        GLib.SpawnFlags.SEARCH_PATH | GLib.SpawnFlags.DO_NOT_REAP_CHILD,
        null);
    });
    return button;
}