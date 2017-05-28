+++
title = "GitHub and Git Essentials"
description = "In this article, I want to give you the essentials about Git and GitHub. Afterward, I want to show you my essential commands for Git that enabled me to do web development in the recent years. It's no magic..."
date = "2017-05-16T13:50:46+02:00"
tags = ["React"]
categories = ["React"]
keyword = "git essential commands"
news_keywords = ["git essential commands"]
hashtag = "#programming"
banner = "img/posts/git-essential-commands/banner.png"
contribute = "git-essential-commands.md"
headline = "GitHub and Git Essentials"

summary = "In this article, I want to give you the essentials about Git and GitHub. Afterward, I want to show you my essential commands for Git that enabled me to do web development in the recent years. It's no magic and doesn't need to be overwhelming. Last but not least, I want to give you some more information to get started with Git and GitHub."
+++

{{% pin_it_image "git essential commands" "img/posts/git-essential-commands/banner.png" %}}

Over the past years, I have noticed that the GitHub commands I use break down to only a few essential ones that I use in recurring scenarios. These essential commands were quite sufficient for me to come along in web development.

When you get started with Git, it can be quite overwhelming. First, the idea of a distributed version control system and the benefits are not clear for everyone. Second, there are tons of commands with additional options in order to master Git on the command line. It can be intimidating.

However, you will never need all the combinations of commands and options in Git. As I mentioned, for me they break down to only a few essential commands that I use for web development. Everything else can be looked up whenever complex problems arise.

In this article, I want to give you a brief introduction to Git and GitHub. Afterward, I want to show you my essential commands for Git that enabled me to do web development in the recent years. It's no magic and doesn't need to be overwhelming. Last but not least, I want to give you some more information to get started with Git and GitHub.

{{% chapter_header "Why Git and GitHub?" "why-git-github" %}}

Git is a version control system for tracking file and folder changes across multiple machines. Most of the time, the files are related to software, for instance the source code of an application, but they don't need to be only of this kind. I already met writers and content marketers using Git to organize their files and to collaborate with others.

These files and folders are grouped into repositories. Multiple people can collaborate on these repositories. They can create a local copy of the repository, modify the folders, files and content, and sync all the changes back to the shared repository.

While Git happens on the command line by executing commands to pull, modify and push repositories, GitHub is the web-based Git. You can create repositories on the GitHub website and synchronize them to repositories (folders and files) on your local machine. Afterward, you can use Git on the command line to execute commands.

{{% chapter_header "Global vs. Local Repository?" "global-local-repository" %}}

In GitHub, a person or organization can have repositories. These repositories can have files or whole folder structures for source code, markdown or other files. Unless a repository is private, everyone has reading access to it. It is a global repository. It is decentralized from your local machine.

Yet everyone is able to make a copy of the global repository to his or her local machine. It becomes a local repository. You can make changes in your local repository that are not immediately reflected in the global repository. You decide when or whether you want to merge the changes back to the global repository.

The local repository can be used to experiment with source code, to add improvements or to fix issues. Eventually, these adjustments in the local repository get merged back to the global repository. However, the collaborator has to have writing permission to the global repository.

The distribution of repositories makes it possible to collaborate as a group on one global repository when everyone has reading and writing access. A local repository is used to perform changes while the global repository is the source of truth.

GitHub offers the possibility to make repositories private. But you would have to upgrade to a payed GitHub account. Once your GitHub profile is upgraded, you can make any repository private thus only visible for yourself.

{{% chapter_header "Initialize a repository with Git and GitHub" "initialize-git-repository" %}}

In the beginning, you somehow have to initialize a Git repository. You can initialize a local repository by using the `git init` command in one of your directories. Another way to initialize a repository: Copy a global repository by using `git clone <repository_url>` to your local machine.

A local repository has a *.git* file where all the information, for instance the commit history, about the repository is saved. Another file, a *.gitignore* file, can be added to ignore certain files to be merged to the global repository. Ignored files are only in your local repository.

Another option is to create a new repository on the GitHub website directly. You will get all the instructions about the commands that you have to use on the command line in order to connect a newly created global repository to a local repository on your machine.

{{% chapter_header "Push your Changes" "push-git-changes" %}}

Once you have a local repository, you want to "commit" changes to the code base. Each commit is saved as an atomic step that changes your repository. It is saved in the Git history that is accessible on the command line and GitHub.

Commits come with a commit message. You will see later on how to write a commit message. In addition, a hash is automatically generated to identify your commit. You don't have to care about the hash in the beginning, but later it can be used to jump to specific points in history or to compare commits with each other.

The commits happen in your local repository before you eventually "push" them to the global repository where they are accessible and visible for everyone. You can accumulate multiple commits locally before you sync them to the global repository.

How would you get your changes from a local repository to the global repository? There are three essential commands: add, commit, push.

First, you can either add all or only selected changed files.

{{< highlight javascript >}}
git add .
git add <path/to/file>
{{< /highlight >}}

These files will change their status from unstaged to staged files. When files are staged, they can be committed. There is a way back from a staged to an unstaged file.

{{< highlight javascript >}}
git reset HEAD <path/to/file>
{{< /highlight >}}

Second, you can commit the staged files by an atomic commit that comes with a commit message. The message describes your change. There are two ways to commit.

You can use the shortcut commit command to add the commit message inline:

{{< highlight javascript >}}
git commit -m <message>
{{< /highlight >}}

Also you can use the default commit command to make a more elaborated commit message with multi-lines afterward.

{{< highlight javascript >}}
git commit
{{< /highlight >}}

The latter command will open up your default command line editor. Usually, the default command line editor is vim. In vim you would type your commit message. Afterward, you can save and exit vim by using `:wq` which stands for *write* and *quit*.

Most of the time, you will use the shortcut commit though. It is fast and often an inlined commit message is sufficient.

Now, before you get to the third step, multiple commits can accumulate in your local repository. Eventually, in the third step, you would push all the commits in one command to the global repository.

{{< highlight javascript >}}
git push origin master
{{< /highlight >}}

These are the three necessary steps to get your changes from your local repository to the global repository.

But when you collaborate with others, there can be an intermediate step before you push your changes. It can happen that someone else already pushed changes in the global repository while you made your changes in your local repository. Thus, you would have to *pull* all the changes from the global repository before you are allowed to push your own changes. It can be simple as that:

{{< highlight javascript >}}
git pull origin master
{{< /highlight >}}

However, I never pull directly. Instead, I pull rebase.

{{< highlight javascript >}}
git pull --rebase origin master
{{< /highlight >}}

What's the difference between pull and pull rebase?

A basic `git pull` would simply put all the changes from the global repository on top of your changes. With a pull rebase, it is the other way around. The changes from the global repository come first, then your changes will be added on top.

A pull rebase has two benefits:

* it keeps an ordered git history, because your changes are always added last
* it helps you to resolve conflicts, if you run into them, because you can adjust your own changes more easily

If you have changed but uncommited files when you pull from the global repository, you are asked to "stash" your changed files first. After you have pulled all the changes, you can apply the stash again. Stashing will be explained later in the article.

{{% chapter_header "Status" "git-status" %}}

There a three essential git commands that give you a status of your project about current and recent changes. They don't alter anything in your local repository but showing you information.

Whenever you want to check the local staged and unstaged changes.

{{< highlight javascript >}}
git status
{{< /highlight >}}

Whenever you want to see your local unstaged changes compared to the recent commit.

{{< highlight javascript >}}
git diff
{{< /highlight >}}

Whenever you want to see the git history of commits.

{{< highlight javascript >}}
git log
{{< /highlight >}}

The default `git log` is not helpful for most people. Each commit takes too much space and it is hard to scan the history. You can use the following configuration ({{% a_blank "Kudos to Coderwall" "https://coderwall.com/p/euwpig/a-better-git-log" %}}) to setup a more helpful alias:

{{< highlight javascript >}}
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
{{< /highlight >}}

Now you can use it with `git lg` instead of `git log`.

{{% chapter_header "Branching" "git-branching" %}}

Git Branches are used for multiple use cases.

Imagine you are working on a new feature for your project. You want to open a new branch for it to track the changes independently from the whole project, to be more specific: independently from the master branch. Before you merge the branch into your master branch, you (or others) can review the changes.

Another use case is when you work in a team of developers. You want to give everyone the freedom to work independently on improvements, bug fixes and features. Thus, it makes sense to branch out from the master branch for these use cases.

**What are the essential commands for branching?**

You can either create a new branch on your own:

{{< highlight javascript >}}
git checkout -b <branch>
{{< /highlight >}}

Or *checkout* a branch that is there already.

{{< highlight javascript >}}
git checkout <branch>
{{< /highlight >}}

When the branch is newly created by another collaborator and not yet known to your local repository, you can *fetch* all the branch information. Afterward, you can checkout the branch in your local repository.

{{< highlight javascript >}}
git fetch
git checkout <branch>
{{< /highlight >}}

Once you are on the branch, you can pull all the recent changes.

{{< highlight javascript >}}
git pull --rebase origin <branch>
{{< /highlight >}}

Now you can start to adjust the code and *Push your Changes*, but rather than pushing them to the master branch, you would push them to the branch.

{{< highlight javascript >}}
git push origin <branch>
{{< /highlight >}}

{{% chapter_header "Merge a Pull Request" "merge-git-pull-request" %}}

At some point, you want to merge a branch to the master branch. You would use the GitHub interface to open a Pull Request (PR) before merging it. Pull Requests help to inspire discussions and peer reviews for an improved code quality and to share knowledge across collaborators.

Before opening a PR, I usually follow these steps to checkout the branch, get all the updates to merge them with my own, get all the recent changes from the master branch too, and force push all the changes to the branch itself.

Update the master branch to the recent changes:

{{< highlight javascript >}}
git pull --rebase origin master
{{< /highlight >}}

Checkout the branch:

{{< highlight javascript >}}
git checkout <branch>
{{< /highlight >}}

Pull rebase all recent changes from the branch:

{{< highlight javascript >}}
git pull --rebase origin <branch>
{{< /highlight >}}

Rebase all the changes from the recent master branch on top:

{{< highlight javascript >}}
git rebase master
{{< /highlight >}}

Force push all the changes to the remote branch:

{{< highlight javascript >}}
git push -f origin <branch>
{{< /highlight >}}

The branch is synced with changes from collaborators, my changes and changes from the master branch. Finally, when the branch is updated in the global repository, you can hit the Merge Pull Request button on GitHub.

{{% chapter_header "Resolving Conflicts" "git-resolve-conflicts" %}}

Sometimes, when you pull the recent changes from a global repository or when you rebase the master on a branch, you run into conflicts. Conflicts happen when Git cannot resolve multiple changes on the same file. That can happen more often than expected when collaborating with multiple people.

For instance, imagine it happens for a `git rebase master` on your branch. The command line would indicate that it stopped the rebase and shows you the conflicting files. That's no reason to panic. You can open the indicated files and resolve the conflicts. In the file you should see the changes well separated: the changes from master (HEAD) and from your branch (usually the commit message). You have to decide which of both versions you want to take in order to resolve the problem. After you have resolved all conflicts, you can continue the rebase:

{{< highlight javascript >}}
git add .
git rebase --continue
{{< /highlight >}}

If you run again into conflicts, you can resolve them and run the commands again.

{{% chapter_header "Stashing" "git-stash" %}}

Stashing happens usually when you want to throw away changes permanently or temporary.

{{< highlight javascript >}}
git stash
{{< /highlight >}}

The latter, when you want to stash only temporary, can be used when you want to do something else in between. For instance, fixing a bug or creating a PR one someone's behalf.

The stash is a heap. You can pick up the latest stash to apply it again to your local repository.

{{< highlight javascript >}}
git stash apply
{{< /highlight >}}

If you don't want to "throw away" all changes by stashing, but only selected files, you can use the checkout command:

{{< highlight javascript >}}
git checkout -- <path/to/file>
{{< /highlight >}}

The file goes from unstaged to not changed at all. But remember, whereas stashing allows you to get the stash back from the heap, the checkout reverts all changes in the files.

{{% chapter_header "Delete Branches" "delete-git-branch" %}}

Once you merged a Pull Request, you usually want to delete the remote and local branch.

{{< highlight javascript >}}
git branch -d <branch>
git push origin :<branch>
{{< /highlight >}}

While the first command deletes the branch on your local machine, the second command deletes the remote branch on GitHub.

{{% chapter_header "Interactive Rebase" "git-interactive-rebase" %}}

I must admit, it is not an essential command for Git, but I use it often to organize my commits on a branch. I like to have a tidy branch before I open it as a PR for others. Tidying a branch means to bring commits in an order that makes sense, rewriting commit messages or "squashing" commit. To squash commits means to merge multiple commits into one.

When using an interactive rebase, you can decide how many commits you want to interactively adjust.

{{< highlight javascript >}}
git rebase -i HEAD˜<number>
{{< /highlight >}}

Afterward, since you adjusted the Git history, you need to force push your changes. A force push will overwrite the Git commits in your global repository.

{{< highlight javascript >}}
git push -f origin master
{{< /highlight >}}

In general, you should be careful with force pushes. A good rule of thumb is that you can do them on a branch, but never on the master branch.

{{% chapter_header "Commit Message Conventions" "git-commit-message-conventions" %}}

When you collaborate with others or want to have tidy commit messages on your own, you can follow Git commit message conventions. There are a handful of conventions. I am used to follow these that were {{% a_blank "brought up in the Angular community" "https://gist.github.com/brianclements/841ea7bffdb01346392c" %}}:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**:  A documentation change
* **style**: A code style change, doesn't change implementation details
* **refactor**: A code change that neither fixes a bug or adds a feature
* **perf**: A code change that improves performance
* **test**: When testing your code
* **chore**: Changes to the build process or auxiliary tools and libraries

They follow this syntax: `<type>(<scope>): <subject>`

An example taken from the command line could be:

{{< highlight javascript >}}
git commit -m "feat(todo-list) add filter functionality"
{{< /highlight >}}

{{% chapter_header "Aliases" "git-aliases" %}}

Git aliases are used to make up own Git commands by using the built-in Git commands. Aliases allow you to make Git commands more concise or to group them.

For instance, you can group two Git commands in order to execute them in one command. That would for example make sense if you wanted to delete a branch. The local and remote deletion would happen in one command. Something like this: `git nuke`. In another scenario you would abbreviate `git pull --rebase` with `gpr`.

{{% chapter_header "Pull Requests vs. Issues" "git-pull-requests-issues" %}}

Pull Requests (PR) and Issues are used in collaboration with multiple people.

When someone in your team created a new branch to work independently on a feature, the branch will lead to a PR eventually. A PR can be reviewed by other collaborators on GitHub. You can have discussions, reviews and have the option to merge or close the PR.

An issue is mostly opened before a branch and PR is created. The issue states a problem in the project and stimulates a discussion. The conversation can lead to a specification that can be used as blueprint to implement a solution. Therefore, you would create a PR based on the Issue. Issues can be labeled to keep track of different categories of issues.

Finally, it is also possible to use PRs and Issues in a private, single person repository. Even when you work on your own, you can use these feature of GitHub to keep better track of problems and changes.

{{% chapter_header "Getting started with Git and GitHub Setup" "getting-started-git-github" %}}

Now that you know about Git and GitHub, the benefits and how to use the essential commands, you might wonder how to get started. That's fairly straight forward, covered by multiple guides, but also by the GitHub website itself.

First, visit the {{% a_blank "official GitHub website" "https://github.com/" %}} to create an account. Second, you have to {{% a_blank "install Git" "https://help.github.com/articles/set-up-git/" %}} on your command line. Every OS should come with a default command line, but you can check [this developer setup guide](https://www.robinwieruch.de/developer-setup/) for your own developer environment setup. Third, I highly recommend to setup SSH for your GitHub account. It is more secure and you spare to type your credentials every time you push changes to GitHub.

Last but not least, explore and socialize on GitHub. You can explore different repositories by visiting profiles of people and organizations. You can *star* the repositories to get updates and to show your admiration. You can even start to contribute on a repository, but don't forget to read their contribution guidelines.

In order to socialize, you can follow people who start interesting projects or discussions. Try it out {{% a_blank "by following my account to have your first social connection" "https://github.com/rwieruch" %}}.

<hr class="section-divider">

The GitHub and Git essentials should be everything you need to get started. You shouldn't feel intimidated by the setup nor by the commands. After all, the commands break down to several atomic ones that can be used in only a few essential scenarios.

The essential Git commands break down to:

* git init
* git clone
* git add
* git commit
* git push
* git pull --rebase
* git fetch
* git status
* git log (git lg)
* git diff

Obviously, there are more Git commands (git bisect, git reflog, ...) that you could master. However, I don't find myself using them very often. You can look these up, once you need them, before you have to memorize them. After all, in most cases you will more likely lookup the issue you want to solve in Git rather than a specific command. Most of these issues in Git are well explained when you search for them.