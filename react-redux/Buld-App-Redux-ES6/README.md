[The Setup Babel, Webpack, npm](chzz.md)
[Container VS Presentation](ch01.md)
[Files structure](ch02.md)

Predictable state container for JavaScript Apps. Redux Docs

## The three Principles
1. Single Source of Truth
2. State is Read only
3. Changes are made with Pure Functions.

Redux can be utilised with many library.

## Data Flow

```
+------------+
|            |                            Dispatch
|   Action   <------------------------------------+
|            |                                    |
+------+-----+                                    |
       |                                          |
       |                                          |
       |                                          |
+------v-----+        +------------+       +------+-----+
|            |        |            |       |            |
|  Reducers  +-------->   Store    +------->   View     |
|            |        |            |       |            |
+------------+        +------------+       +------------+

```
