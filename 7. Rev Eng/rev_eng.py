from subprocess import Popen
import subprocess
import os
import time

FOLDER_NAME = "Question"
PASSWORD = "KhulJaSimSim"

path = os.getcwd()+"/"+FOLDER_NAME
if not os.path.exists(path):
    os.mkdir(FOLDER_NAME)
os.chdir(path)

branches = ["JjyMJgJv", "ktHEBUlU", "GztRMqIq", "sgpcsLaD", "dEySNlrY","NotThisBranch", "zlgPcwMA", "GdtGXXUc", "XKuYtDBI", "DSSOiLzQ", "hqhLixqd", "ocggdkPK", "dxfkIZQW", "znSercUj", "RMySwRCI", "yxkEZmMA", "zBrZwiKp", "OzLVSfJt", "qFjGIYnU", "xhhFWjFA"]
arr = [49, 47, 45, 43, 41, 39, 37, 35, 33, 31, 29, 27, 25, 23, 21, 19, 17, 15, 13, 11, 9, 7, 5, 3, 1, 0, -2, -4, -6, -8, -10, -12, -14, -16, -18, -20, -22, -24, -26, -28, -30, -32, -34, -36, -38, -40, -42, -44, -46, -48, -50]

ps = Popen("git init", shell=True)
ps.communicate()
time.sleep(1)

ps = Popen("git add .", shell=True)
ps.communicate()
ps = Popen("git commit --allow-empty -m 'Initial Commit'", shell=True)
ps.communicate()
time.sleep(0.05)

for branch in branches:
    ps = Popen("git checkout -b "+branch+" master", shell=True)
    ps.communicate()
    k = 1
    for i in arr:
        s = ""
        if(i==0):
            if(branch=="NotThisBranch"):
                ps = Popen("echo '"+PASSWORD+"' > FLAG", shell=True)
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
                ps = Popen("echo 'Maybe this is Not the Branch! Try another Branch' > ERROR", shell=True)
                ps.communicate()
                ps = Popen("git add -A", shell=True)
                ps.communicate()
                ps = Popen("git commit -m 'This is not the Commit you are Looking for!'", shell=True)
                ps.communicate()
                ps = Popen("rm ERROR", shell=True)
                ps.communicate()
                ps = Popen("git add .", shell=True)
                ps.communicate()
        else:
            if(i>0):
                s += "The FLAG seems to "+str(i)+" commits ahead."
            if(i<0):
                s += "The FLAG seems to "+str(-i)+" commits behind."
            ps = Popen("echo '"+s+"' > -hint", shell=True)
            ps.communicate()
            ps = Popen("git add -A", shell=True)
            ps.communicate()
            ps = Popen("git commit -m 'Commit "+str(k)+"'", shell=True)
            ps.communicate()
        k+=1
        time.sleep(0.05)

ps = Popen("git checkout master", shell=True)
ps.communicate()
k = 1
for i in arr:
    s = ""
    if(i==0):
        ps = Popen("echo 'Maybe this is Not the Branch! Try another Branch' > ERROR", shell=True)
        ps.communicate()
        ps = Popen("git add .", shell=True)
        ps.communicate()
        ps = Popen("git commit -m 'This is not the Commit you are Looking for!'", shell=True)
        ps.communicate()
        ps = Popen("rm ERROR", shell=True)
        ps.communicate()
    else:
        if(i>0):
            s += "The FLAG seems to "+str(i)+" commits ahead."
        if(i<0):
            s += "The FLAG seems to "+str(-i)+" commits behind."
        ps = Popen("echo '"+s+"' > -hint", shell=True)
        ps.communicate()
        ps = Popen("git add -A", shell=True)
        ps.communicate()
        ps = Popen("git commit -m 'Commit "+str(k)+"'", shell=True)
        ps.communicate()
    k+=1
    time.sleep(0.05)
print("Done Making the Question!")
