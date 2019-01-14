+++
title = "How to setup PostgreSQL on Windows"
description = "A installation guide for a PostgreSQL on Windows setup for having a SQL database available on your OS. It comes with everything that's needed to connect a Node.js application to your database in JavaScript ..."
date = "2019-01-08T13:50:46+02:00"
tags = ["Node", "JavaScript"]
categories = ["Node", "JavaScript"]
keywords = ["postgres windows", "postgresql windows", "postgres setup", "postgresql setup", "postgres os setup"]
news_keywords = ["postgres windows", "postgresql windows", "postgres setup", "postgresql setup", "postgres os setup"]
hashtag = "#NodeJs"
card = "img/posts/postgres-sql-windows-setup/banner_640.jpg"
banner = "img/posts/postgres-sql-windows-setup/banner.jpg"
contribute = "postgres-sql-windows-setup.md"
headline = "How to setup PostgreSQL on Windows"

summary = "The article is a checklist for myself, but for anyone else setting up PostgreSQL on Windows."
+++

{{% sponsorship %}}

{{% pin_it_image "postgres windows" "img/posts/postgres-sql-windows-setup/banner.jpg" "is-src-set" %}}

This is a tutorial for setting up PostgreSQL 11 on Windows. You might be wondering why there's a need for another setup guide for Postgres in the first place, since there are a few across the web. I found many tutorials and guides on how to set it up, but found most of them to be unclear and outdated, based on old PostgreSQL versions. The checklist is not comprehensive, though, as it is used for several tutorials on my website, I keep it updated with the recent versions of PostgreSQL. If you spot any flaws in this guide, a comment below the article would be very helpful to keep it up to date for other developers.

If you want to run PostgreSQL on MacOS instead, you will find guidance over here: [How to setup PostgreSQL on MacOS](https://www.robinwieruch.de/postgres-sql-macos-setup). Make sure to read it as well, even though you are on Windows, because this guide only shows you the Windows installation for PostgreSQL but not how to create databases or how to interact with them. That's covered in the MacOS guide instead.

{{% chapter_header "PostgreSQL Installation on Windows" "postgres-windows-installation" %}}

For Microsoft Windows, it is possible to run an unattended install using the command prompt or PowerShell. However, since it will still require a manual download of the installation files, it's easier to {{% a_blank "download the .exe from the PostgreSQL Development Group" "https://www.postgresql.org/download/windows/" %}}. It comes with an installation wizard that covers the base setup, and you can still perform command-line operations on the directory after its installed.

To use PosgresQL on Windows, two of its directories must be included under the *Path* in the environmental variables: the *bin* folder and the *lib* folder. To do this navigate to System Properities and find the Advanced tab, where the Environmental Variables button can be seen at the bottom of the Window below Startup and Recovery. Add the directories `C:\Program Files\PostgreSQL\11\bin` and `C:\Program Files\PostgreSQL\11\lib` under the system variable *Path*, next to to the default paths, and separate them by a semicolon (;). You can verify the installation in the command prompt by navigating to the PostgreSQL installation folder and entering a version check:

{{< highlight javascript >}}
postgres --version
postgres (PostgreSQL) 11.1
{{< /highlight >}}

The command line results will show the version you have installed on your local machine. I recommed using the latest version of libraries and software whenever possible to avoid compatibility issues with client-side applications. If you find that any of these steps are giving errors, try logging out and back in to confirm the environmental variables and registry changes.

{{% read_more "PostgreSQL with Sequelize in Express Tutorial" "https://www.robinwieruch.de/postgres-express-setup-tutorial/" %}}