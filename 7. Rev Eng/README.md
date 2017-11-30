# Reverse Engineering

### Question:

Well to view or solve the Question you would need and Git and Python installed in your system.

Open a terminal in this folder and then type:

```
python rev_eng.py  # or 'rev_eng2.py' for a simpler version.
```

This should generate the Question folder which you must solve.

Note: You must have git configured with your user email.

### Working:

Basically the the question was to find a particular FLAG file with 50 different branches with 50 different commits each, which actually is quite easy once you get to know the various git commands.

Also the actual question in the event was hosted on a VM which the team had to `ssh` onto. This had some security risks such as being able to see other users commands and folders, deleting the entire VM, fork bombing, etc. I had tried my best to prevent all of this from happening, but to my surprise no one tried anything destructive! :D

#### Disclosure:
*Well the original theme of this question was to based something similar to [pwnable.kr](pwnable.kr). That would have actually resembled something similar to actual Reverse Engineering, but the questions would have taken more than 15 minutes that we had planned for each question. So finally we agreed on a git based question.*
