# Get to know your terminal

Every operating system comes with a text-based _command line interface_ (CLI) for issuing commands. This provides a powerful way to accomplish things that the _graphical_ user interface (GUI) may not expose.

Already know your way around a terminal? Skip ahead to [setup](stack.md)!

### Find your OS terminal

![Examples of terminal applications for macOS, Windows, and Linux](../images/os-terminal.png)

- On macOS, the default console is [Terminal](https://support.apple.com/guide/terminal/welcome/mac).
- On Windows, the default console is called [Command Prompt](https://www.lifewire.com/command-prompt-2625840).
- On Ubuntu Linux, the default console is called [Terminal](https://ubuntu.com/tutorials/command-line-for-beginners).

There are other apps like [Hyper](https://hyper.is/) (cross-platform) and [iTerm2](https://www.iterm2.com/) (Mac), but your system’s terminal will work fine! Most mobile operating systems (Android, iOS) do not expose a console application, for security reasons.

::: tip
For a more in-depth introduction to your computer’s command line, the [Ubuntu guide](https://ubuntu.com/tutorials/command-line-for-beginners) (also linked above) is a great resource.
:::

### Run a command

Once you’ve launched your terminal, you’ll be greeted by an empty “prompt.”

A “command” is simply a piece of text that is interpreted and executed by the system. Commands often include the names of programs, references to files and folders, flags, and other “arguments.” Throughout the tutorial, we’ll ask you to “run” commands—that just means you’ll type the text into your terminal and press <kbd>Return</kbd> or <kbd>Enter</kbd>. If a number of commands should be run in series, they may appear in a single snippet.

::: danger
The terminal is extremely powerful. Only run commands from sources you trust!

If you are inclined to copy-and-paste commands into your terminal, keep an eye on your selection. It’s easy to inadvertently copy extra characters that can confuse the terminal. While getting started, it's a good idea to 
:::

Let’s run your first command. Type `whoami` into your terminal, and press <kbd>Enter</kbd>:

```bash
whoami
# -> oli
```

You should see your username printed to the terminal!

::: tip
The line beginning with a `#` is just an example of the expected output. Unless your name is Oli, you’ll probably see something else!
:::

### Navigate directories

We’ll eventually want to run commands alongside your site’s code, so you’ll need to know how to move around your computer’s filesystem.

Commands are run in the “working directory.” To find out what your working directory is, run…

::: code
```bash macOS / Linux
pwd
```
```batch Windows
cd
```
:::

::: tip
Some commands will differ between platforms. Whenever they do, the code snippet will include tabs, like the one above.
:::

Do you recognize the name of the folder? Let’s check its contents, just to be sure:

::: code
```bash macOS / Linux
ls
```
```batch Windows
dir
```
:::

You should see a list of files and folders. Most terminal applications launch with your “home” folder as the working directory.

::: tip
Some terminals display the current folder in the text of the prompt. On macOS and Linux, your home folder is usually displayed as a tilde (`~`), so it may not be obvious.
:::

You can change the working directory with the `cd` command, followed by a _relative_ or _absolute_ path. Try out a few of these:

::: code
```bash macOS / Linux
cd ..
pwd

cd /Applications
pwd

cd ~/Desktop
pwd

cd ~
pwd
```
```batch Windows
cd ..
cd

cd C:\Windows
cd

cd %HOMEPATH%/Desktop
cd

cd %HOMEPATH%
cd
```
:::

::: tip
On most systems, pressing the <kbd>Up</kbd> arrow will show you previously-run commands. Pressing <kbd>Up</kbd> multiple times goes farther into your history. At any point, you can press <kbd>Enter</kbd> to execute the command, or the <kbd>Left</kbd> and <kbd>Right</kbd> arrows to modify the command.
:::

This series of commands is a common pattern when navigating your filesystem is to:

1. Figure out where you are with `pwd`;
1. List files with `ls` (`dir` on Windows);
1. Navigate to a new folder with `cd folder-name`;

When changing folders with `cd`, you often only need to type the first couple of characters in a directory name, then press <kbd>Tab</kbd> to _auto-complete_ it. The terminal will only auto-complete up to a point that there is ambiguity. For example, in a directory with folders named `project-a`, `project-b`, and `practice`, you could type `cd pro` and press <kbd>Tab</kbd> to auto-complete up to `cd project-`—then just type the last character for the directory you want.

Now that we’ve poked around a bit, it’s time to pick a place to stash your project.
