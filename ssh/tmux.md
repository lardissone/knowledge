# tmux tips

## Command line

### Start new

```bash
tmux
```

### Start new with session name

```bash
tmux new -s myname
```

### Attach to existing session

```bash
tmux a  #  (or at, or attach)
```

### Attach to existing named session

```bash
tmux a -t myname
```

### List sessions

```bash
tmux ls
```

### Kill session

```bash
tmux kill-session -t myname
```

### Kill all sessions

```bash
tmux ls | grep : | cut -d. -f1 | awk '{print substr($1, 0, length($1)-1)}' | xargs kill
```

## Usage

In tmux, hit the prefix `ctrl+b` (my modified prefix is ctrl+a) and then:

### Sessions

```text
:new<CR>  new session
s  list sessions
$  name session
```

### Windows (tabs)

```text
c  create window
w  list windows
n  next window
p  previous window
f  find window
,  name window
&  kill window
```

Change windows with shift+ left or right:

```text
# Shift arrow to switch windows
bind -n S-Left  previous-window
bind -n S-Right next-window
```

### Panes (splits)

```text
%  vertical split
"  horizontal split

o  swap panes
q  show pane numbers
x  kill pane
+  break pane into window (e.g. to select text by mouse to copy)
-  restore pane from window
⍽  space - toggle between layouts
<prefix> q (Show pane numbers, when the numbers show up type the key to goto that pane)
<prefix> { (Move the current pane left)
<prefix> } (Move the current pane right)
<prefix> z toggle pane zoom
```

Change to use | and - to split vertically and horizontally:

```text
# split panes using | and -
bind | split-window -h
bind - split-window -v
unbind %
unbind '"'
```

### Sync Panes

You can do this by switching to the appropriate window, typing your Tmux prefix (commonly Ctrl-B or Ctrl-A) and then a colon to bring up a Tmux command line, and typing:

```text
:setw synchronize-panes
```

You can optionally add on or off to specify which state you want; otherwise the option is simply toggled. This option is specific to one window, so it won’t change the way your other sessions or windows operate. When you’re done, toggle it off again by repeating the command. [tip source](http://blog.sanctum.geek.nz/sync-tmux-panes/)

### Resizing Panes

You can also resize panes if you don’t like the layout defaults. I personally rarely need to do this, though it’s handy to know how. Here is the basic syntax to resize panes:

```text
PREFIX : resize-pane -D (Resizes the current pane down)
PREFIX : resize-pane -U (Resizes the current pane upward)
PREFIX : resize-pane -L (Resizes the current pane left)
PREFIX : resize-pane -R (Resizes the current pane right)
PREFIX : resize-pane -D 20 (Resizes the current pane down by 20 cells)
PREFIX : resize-pane -U 20 (Resizes the current pane upward by 20 cells)
PREFIX : resize-pane -L 20 (Resizes the current pane left by 20 cells)
PREFIX : resize-pane -R 20 (Resizes the current pane right by 20 cells)
PREFIX : resize-pane -t 2 20 (Resizes the pane with the id of 2 down by 20 cells)
PREFIX : resize-pane -t -L 20 (Resizes the pane with the id of 2 left by 20 cells)
```

## Copy mode

Pressing PREFIX [ places us in Copy mode. We can then use our movement keys to move our cursor around the screen. By default, the arrow keys work. we set our configuration file to use Vim keys for moving between windows and resizing panes so we wouldn’t have to take our hands off the home row. tmux has a vi mode for working with the buffer as well. To enable it, add this line to .tmux.conf:

```text
setw -g mode-keys vi
```

With this option set, we can use h, j, k, and l to move around our buffer.

To get out of Copy mode, we just press the ENTER key. Moving around one character at a time isn’t very efficient. Since we enabled vi mode, we can also use some other visible shortcuts to move around the buffer.

For example, we can use "w" to jump to the next word and "b" to jump back one word. And we can use "f", followed by any character, to jump to that character on the same line, and "F" to jump backwards on the line.

```text
Function                vi             emacs
   Back to indentation     ^              M-m
   Clear selection         Escape         C-g
   Copy selection          Enter          M-w
   Cursor down             j              Down
   Cursor left             h              Left
   Cursor right            l              Right
   Cursor to bottom line   L
   Cursor to middle line   M              M-r
   Cursor to top line      H              M-R
   Cursor up               k              Up
   Delete entire line      d              C-u
   Delete to end of line   D              C-k
   End of line             $              C-e
   Goto line               :              g
   Half page down          C-d            M-Down
   Half page up            C-u            M-Up
   Next page               C-f            Page down
   Next word               w              M-f
   Paste buffer            p              C-y
   Previous page           C-b            Page up
   Previous word           b              M-b
   Quit mode               q              Escape
   Scroll down             C-Down or J    C-Down
   Scroll up               C-Up or K      C-Up
   Search again            n              n
   Search backward         ?              C-r
   Search forward          /              C-s
   Start of line           0              C-a
   Start selection         Space          C-Space
   Transpose chars                        C-t
```

## Misc

```text
d  detach
t  big clock
?  list shortcuts
:  prompt
```

Add reload with prefix r

```text
# reload config file (change file location to your the tmux.conf you want to use)
bind r source-file ~/.tmux.conf
```

## Configurations Options

```text
# Mouse support - set to on if you want to use the mouse
* setw -g mode-mouse off
* set -g mouse-select-pane off
* set -g mouse-resize-pane off
* set -g mouse-select-window off

# Set the default terminal mode to 256color mode
set -g default-terminal "screen-256color"

# enable activity alerts
setw -g monitor-activity on
set -g visual-activity on

# Center the window list
set -g status-justify centre

# Maximize and restore a pane
unbind Up bind Up new-window -d -n tmp \; swap-pane -s tmp.1 \; select-window -t tmp
unbind Down
bind Down last-window \; swap-pane -s tmp.1 \; kill-window -t tmp
```

Source: [tmux shortcuts & cheatsheet](https://gist.github.com/MohamedAlaa/2961058)