# Slack Hooker

A simple way of storing slack logs out side of slack. Neat.

## Vision
 * Save slack logs
 * Highlight intervals of logs
 * Rate highlights
 * Highligths mashup mode
 * Highlight of the month, year, decade, etc. 

##Commands

###Time
$save -t from to
ex:
$save -t 10:29 10:49
saves conversations between 10:29 - 10:49

PS. Only works for current day. Looking to make with specific day aswell.

###Previous lines
$save -l nrOfLinesBackwards
ex:
$save -l 5
saves the 5 lines before this message