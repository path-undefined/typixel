# Typixel

A web-based keyboard only pixel art editor.

## Scope of the MVP

* Implement commands:
  + display related:
    - move cursor for 1 step (4 directions)
    - toggle the grid in canvas display
    - pan canvas display
    - zoom-in canvas display
    - zoom-out canvas display
  + tool selecting related:
    - enter tool selecting mode
    - exit tool selecting mode
    - activate next tool
    - activate previous tool
    - activate first tool
    - activate last tool
    - activate index of tool
  + pixel related:
    - activate pixel editing tool
    - draw a pixel at cursor
    - erase a pixel at cursor
  + line related:
    - activate line tool
    - start a line at cursor, enter line drawing mode
    - stop a line at cursor, exit line drawing mode
  + rect related:
    - activate rect tool
    - start a rect at cursor, enter rect drawing mode
    - stop a rect at cursor, exit rect drawing mode
  + circle related:
    - activate circle tool
    - start a circle's center at cursor, enter circle drawing mode
    - stop a circle's radius at cursor, exit circle drawing mode
  + filling related:
    - activate filling tool
    - fill the area at cursor
    - remove the filling for the area at cursor
  + palette related:
    - enter palette selecting mode
    - exit palette selecting mode
    - activate next palette
    - activate previous palette
    - activate first palette
    - activate last palette
    - activate index of palette
    - set a palette with index
    - unset a palette with index
  + color related:
    - enter color selecting mode
    - exit color selecting mode
    - activate next color
    - activate previous color
    - activate first color
    - activate last color
    - activate index of color
    - set color in current palette
    - unset color in current palette
  + layer related:
    - enter layer editing mode
    - exit layer editing mode
    - activate next layer
    - activate previous layer
    - activate first layer
    - activate last layer
    - activate index of layer
    - toggle visibility of active layer
    - move active layer up
    - move active layer down
    - move active layer to top
    - move active layer to bottom
    - merge down active layer
  + file related:
    - undo
    - redo
    - save editing
    - load editing
    - load script
    - export image as png
  + bind hotkey to command in different mode
