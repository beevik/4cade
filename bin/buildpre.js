a = new ActiveXObject("scripting.filesystemobject")
b = a.opentextfile("res\\GAMES.CONF")

entries = []

while (!b.atendofstream)
{
  c = b.readline()
  d = c.indexOf("#")

  if (d >= 0)
  {
    c = c.substr(0, d)
  }

  d = c.indexOf("=")

  if (d >= 0)
  {
    c = c.substr(0, d)
  }

  if (c.indexOf("[") >= 0)
  {
    break
  }

  c = c.substr(c.indexOf(",") + 1)

  if (c.length > 0)
  {
    entries.push(c)
  }
}

entries.sort()
a.createtextfile("build\\games.lst").write(entries.toString().replace(/,/g, "\n"))
pre_off = a.getfile(WScript.Arguments(0) + "\\STANDARD").size
osize = pre_off

groups = "*=0\n" + "!le16 " + entries.length.toString() + ", 0\n"

for (i = 0; i < entries.length; i++)
{
  c = 0
  size = osize

  if (a.fileexists(WScript.Arguments(0) + "\\" + entries[i]))
  {
    c = pre_off
    size = a.getfile(WScript.Arguments(0) + "\\" + entries[i]).size
    pre_off += size
  }

  groups += "!byte " + (1 + 1 + entries[i].length + 5).toString() + "\n" + "!byte " + entries[i].length.toString() + "\n" + "!text \"" + entries[i] + "\"\n" + "!be24 " + c + "\n" + "!le16 " + size + "\n"
}

f = a.createtextfile("build\\pre.tmp")
f.write(groups)
f.close()
x = new ActiveXObject("wscript.shell")
x.run('cmd /c %acme% -o ' + WScript.Arguments(1) + ' build\\pre.tmp', 0, 1)
x.run('cmd /c bin\\buildpreall.bat ' + WScript.Arguments(0) + ' ' + WScript.Arguments(2) + ' ' + WScript.Arguments(3), 0, 1)
