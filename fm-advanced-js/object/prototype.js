// Circle = function
// Square = Object


                      Object

                    XXXXXXXXXXX                 +--------------+
                   XX          XX               | .toString()  |
                  X             X  .prototype   | .valueOf()   |
                  X             X +-----------> |              |
                  XX           XX               |              |
                   XXX         X                |              |
                     XXXXXXXXXX                 +------+-------+
                                                       ^
                                                       |
                                                       |
+-------------------------------------------------------------------------------------+
                                                       |
                        Foo                            |[[p]]
                                                       |
                    XXXXXXXXXXX                 +------+-------+
                   XX          XX               |              |
                  X             X  .prototype   |  .identify() |
                  X             X +-----------> |              |
                  XX           XX  .constructor |              |
                   XXX         X  <-------------+              |
                     XXXXXXXXXX            +--^ +--------------+ <--+
                                           |                        |
                                           |                        |
                                           |                        |
                                           |[[p]]                   |[[p]]
                                           |                        |
                                       a1  |                    a2  |
                                    +------+-------+         +------+-------+
                                    |              |         |              |
                                    |  me;         |         |  me;         |
                                    |              |         |  speak()     |
                                    |              |         |              |
                                    |              |         |              |
                                    +--------------+         +--------------+
