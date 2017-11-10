from subprocess import Popen
import subprocess
import os
import time

FOLDER_NAME = "FLAG"
PASSWORD = "KhuljaSimSim"

path = os.getcwd()+"/"+FOLDER_NAME
if not os.path.exists(path):
    os.mkdir(FOLDER_NAME)
os.chdir(path)

arr = [49,  48,  47,  46,  45,  44,  43,  42,  41,  40,  39,  38,  37,  36,  35,  34,  33,  32,  31,  30,  29,  28,  27,  26, 0,  25,  24,  23,  22,  21,  20,  19,  18,  17,  16,  15,  14,  13,  12,  11,  10,  9,  8,  7,  6,  5,  4,  3,  2, 1]

ps = Popen("git init", shell=True)
ps.communicate()

ps = Popen("git commit --allow-empty -m 'Initial Commit'", shell=True)
ps.communicate()

k = 1
for i in arr:
    ps = Popen("git checkout -b Branch"+str(k)+" master", shell=True)
    ps.communicate()
    s = ""
    if(k==25):
            ps = Popen("rm ./-hint", shell=True)
            ps.communicate()
            ps = Popen("echo '"+PASSWORD+"' > .FLAG", shell=True)
            ps.communicate()
            ps = Popen("git add .", shell=True)
            ps.communicate()
            ps = Popen("git commit -m 'This is not the Commit you are Looking for!'", shell=True)
            ps.communicate()
            ps = Popen("rm FLAG", shell=True)
            ps.communicate()
            ps = Popen("git add .", shell=True)
            ps.communicate()
    else:
        s += "The FLAG seems to on a Different Branch. Maybe You Should try Branch"+str(i)+"."
        ps = Popen("echo '"+s+"' > -hint", shell=True)    
        ps.communicate()
        ps = Popen("git add -A", shell=True)
        ps.communicate()
        ps = Popen("git commit -m 'Initial Commit'", shell=True)
        ps.communicate()
    k+=1

ps = Popen("git checkout master", shell=True)
ps.communicate()
ps = Popen("echo 'Hi There! This seems to be a git repo. Look Around :)' > README.md", shell=True)  
ps.communicate()
s = "The FLAG seems to on a Different Branch. Maybe You Should try Branch50."
ps = Popen("echo '"+s+"' > -hint", shell=True)    
ps.communicate()  
ps = Popen("git add -A", shell=True)
ps.communicate()
ps = Popen("git commit -m 'Initial Commit'", shell=True)
ps.communicate()