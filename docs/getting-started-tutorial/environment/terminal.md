# Get to know your terminal

Every operating system comes with a text-based command line interface (CLI) for issuing commands. This provides a powerful way to accomplish things that the graphical user interface may not expose.

### Find your OS terminal

![](../images/os-terminal.png)

- On macOS, the default console is [Terminal.app](https://support.apple.com/guide/terminal/welcome/mac).
- On Windows, the default console is called [Command Prompt](https://www.lifewire.com/command-prompt-2625840).
- On Ubuntu Linux, the default console is called [Terminal](https://ubuntu.com/tutorials/command-line-for-beginners).

There are other apps like [Hyper](https://hyper.is/) (cross-platform) and [iTerm2](https://www.iterm2.com/) (Mac), but your system’s terminal will work fine!

### Run a command

Once you’ve launched your terminal, you’ll be greeted by an empty “prompt.”

A “command” is simply a piece of text that is interpreted and executed by the system. Throughout the tutorial, we’ll as you to “run” commands—that just means you’ll type the text into your terminal and press <kbd>Return</kbd> or <kbd>Enter</kbd>.

If you are inclined to copy-and-paste commands into your terminal keep an eye on your selection! It’s easy to inadvertently copy extra characters that can confuse the terminal.

::: danger
The terminal is extremely powerful. Only run commands from trusted sources.
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

Do you recognize the name of the folder? Let’s see what’s in it, just to be sure:

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
Some terminals display the current folder in the text of the prompt. On macOS and Linux, your home folder is sometimes displayed as a `~`.
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

Now that we’ve poked around the filesystem, it’s time to pick a place to stash your project.
