# Typixel

A web-based keyboard only pixel art editor.

## TODOs

* Implement PNG exporting mechanism
* Design and implement the redo / undo mechanism
* Redesign the UI of the whole app (or improve)
* Implement the layer overlay to be prepared for line / rect / circle drawings

## Scope of the MVP

* Implement commands:
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
  + file related:
    - undo
    - redo
    - export image as PNG
