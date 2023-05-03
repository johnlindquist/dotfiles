import {
  ifApp,
  map,
  mapPointingButton,
  mapSimultaneous,
  rule,
  withCondition,
} from 'karabiner.ts'
import {
  ifChrome,
  ifEscapeMode,
  ifMultitouchFingerCount,
  ifVSCode,
} from '../condition'
import {
  _a,
  _b,
  _d,
  _e,
  _f,
  _g,
  _p,
  _q,
  _r,
  _s,
  _t,
  _v,
  _w,
  _x,
  _z,
  focusExplorer,
  focusGit,
  openAlfred,
} from '../from-to'

export const windowsApp = rule(
  'windows',
  ifApp('com.microsoft.rdc.macos'),
).manipulators([
  map('left_command').to('left_control'),
  map('left_control').to('left_command'),
])

export const abletonApp = rule(
  'ableton',
  ifApp('com.ableton.live'),
).manipulators([
  withCondition(ifMultitouchFingerCount(0))([
    map('`').to('b', '⌘⌥'),
    mapSimultaneous(['␣', 's']).to('f9'),
    mapSimultaneous(['␣', 'a']).to('[').to('['),
  ]),

  withCondition(ifMultitouchFingerCount(1))([
    map('⇥').to('⇥', '⇧'),
    map('left_option').to('e', '⌘').to('j', '⌘'),
    map(_b).toPointingButton('button1', '⇧').to('m', '⌘⇧'), // add_midi_clip
    map(_q).to('q').to('q'),
    map(_w).to('l', '⌘⌥'),
    map(_d).toPointingButton('button1').toPointingButton('button1'),

    map(_g).to(4, '⌘'),
    map('-').to(1, '⌘'),
    map('=').to(2, '⌘'),

    map(_f).to('⇥', '⇧'),
    map(_p).to('p', '⌘⌥'),

    map('left_shift').toPointingButton('button1').to('⌫'),
    map('⌫').toPointingButton('button1').to('⌫'),

    map(1).to(1, '⌘'), // narrow_grid
    map(2).to(2, '⌘'), // widen_grid
    map(_g).to(4, '⌘'), // snap_to_grid
  ]),

  withCondition(ifMultitouchFingerCount(2))([
    map(_a).to('b', '⌘⌥'),
    map(_r).to('l', '⌘'), // loop_selection
    map(_s).to('e', '⌘'), // split_clip
    map(_t).to('l', '⌘'), // loop_selection
  ]),

  withCondition(ifMultitouchFingerCount(3))([
    map(_t).to('t', '⌘⌥'), // add_midi_track
  ]),
])

export const alfredApp = rule('alfred').manipulators([
  map('home').to('home').toIfAlone(openAlfred),
  map('page_up').to('page_up').toIfAlone(openAlfred),
])

export const chromeApp = rule('chrome', ifChrome).manipulators([
  map('left_command').to('left_command').toIfAlone('t', '⌘'),

  withCondition(ifMultitouchFingerCount(2))([
    map(_d).to('i', '⌘⌥'), // open dev tools
    map(_a).to('←', '⌘⌥'),
    map(_t).to('→', '⌘⌥'),
  ]),

  withCondition(ifEscapeMode)([
    map(_f).to('f', '⌘⌃'), // chrome_full_screen
  ]),
])

export const codeApp = rule('code', ifVSCode).manipulators([
  map('left_command').to('left_command').toIfAlone('p', '⌘'), // go_to_file
  map('left_control').to('left_control').toIfAlone('p', '⌘⇧'), // command_palette
  map('right_control').to('right_control').toIfAlone('p', '⌘⇧'), // command_palette
  map('s', '⌘').to('f', '⌘⌥'), // replace

  map('home').to('f5'), // start_debugger
  map('end').to('f5', '⌘⌥'), // restart_debugger

  // view
  // note - I try to keep these on my left hand so I can keep my right on the mouse
  withCondition(ifEscapeMode)([
    map(_g).to(focusGit),
    map(_e).to(focusExplorer),
    map(_x).to(focusExplorer),
    map(_s).to('s', 'Hyper'), // Status Bar
    map(_f).to('f', '⌘⇧'), // find_in_project
    map(_z).to('k', '⌘').to('z'), // zen mode
    map(_v).to('v', 'Hyper'),
    map(_x).to('x', 'Hyper'),
    map(_p).to('r', 'Hyper'), // toggle panel
    map(';').to(';', 'Hyper'),
  ]),

  // trackpad
  withCondition(ifMultitouchFingerCount(1))([
    map('left_command').to('left_command').toIfAlone('f5'), // :start_debugger
  ]),

  // trackpad 2
  withCondition(ifMultitouchFingerCount(2))([
    map('t').toPointingButton('button1').to('f2'),
  ]),
])

export const finalCutApp = rule(
  'final cut pro',
  ifApp('com.apple.FinalCut'),
).manipulators([
  mapPointingButton('button3')
    .to('h')
    .toPointingButton('button1')
    .toAfterKeyUp('a'),

  withCondition(ifMultitouchFingerCount(1))([
    map('⌫').toPointingButton('button1').to('⌫'),
  ]),
])

export const miroApp = rule(
  'miro',
  ifApp('com.electron.realtimeboard'),
).manipulators([
  withCondition(ifMultitouchFingerCount(1))([
    map('⌫').to('⎋').toPointingButton('button1').to('⌫'),
    map('a').to('⎋').to('n').toPointingButton('button1'),
  ]),
  withCondition(ifMultitouchFingerCount(2))([
    map('f').to('⎋').to('n').toPointingButton('button1'),
    map('c').to('c', '⌘').toPointingButton('button1').to('v', '⌘'),
  ]),
])

export const screenflowApp = rule(
  'screenflow',
  ifApp('net.telestream.screenflow10'),
).manipulators([
  // mouse
  mapPointingButton('button3')
    .to('h')
    .toPointingButton('button1')
    .toAfterKeyUp('a'),
  mapPointingButton('button2')
    .toPointingButton('button1', 'left_shift')
    .to('⌫', '⌘'),

  // trackpad
  withCondition(ifMultitouchFingerCount(1))([
    map('␣').to('␣'),
    map('d').toPointingButton('button1', 'left_shift').to('⌫', '⌘'),
    map('a').to(';', '⌘⌥'),
  ]),
])

export const slackApp = rule(
  'slack',
  ifApp('com.tinyspeck.slackmacgap'),
).manipulators([map('left_command').to('left_command').toIfAlone('t', '⌘')])
