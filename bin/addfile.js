a=new ActiveXObject("scripting.filesystemobject")
offset=a.getfile("BUILD\\TOTAL.IDX").size
new ActiveXObject("wscript.shell").run('cmd /c copy /b /y BUILD\\TOTAL.IDX  + ' + WScript.Arguments(0) + ' BUILD\\TOTAL.IDX', 0, 1)
size=a.getfile(WScript.Arguments(0)).size
a.createtextfile(WScript.Arguments(1)).write(";\n; Index record for " + WScript.Arguments(0).replace(/\\/, "/") + "\n;\n; This file is automatically generated\n;\n         !byte 0\n         !be24 " + "         ".substr(0, 8 - offset.toString().length) + offset + "\n         !le16 " + "         ".substr(0, 8 - size.toString().length) + size + "\n")