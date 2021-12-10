# Team Aces (Group 32) - CSE 110 Fall 2021 Project

## About Us
[Team Page](admin/team.md)

Our app can be found [here.](https://www.home.cookez.click/userlogin)

## Repo Structure (Highlights)
- `/admin` - Meeting notes and team branding
- `/member` - Individual member media
- `/prototype` - Prototype space for new libraries, frameworks, tools
- `/source` - Web application source code
- `/specs` - Design work and specifications
- `/test` - Testing 

## Getting Started

To get started with our app, begin by (if needed) installing Git and VSCode. Then clone the repository. You'll need to have access to Node.js/Npm to interact with our JavaScript code. Similarly, access to Python is needed to experiment with our backend code. To actually get the code up and running, be sure to have Live Server installed in VSCode. Open a local terminal on VSCode and run `python3 app.py` to kick off the backend locally. After that, navigate to `userLogin.html` and use Live Server to power up the website.

## How to Build

Building our website is mostly comprised of taking care of dependencies for our code as well as having the proper tools in general for deployment. Check out our wiki for more details.

## Repo Rules

For more details on our repository rules, be sure to check out our Wiki page on it [here](https://github.com/cse110-fa21-group32/cse110-fa21-group32/wiki/Repo-Rules)

### Committing Source Code

For more details on committing source code, be sure to check out our Wiki page on it [here](https://github.com/cse110-fa21-group32/cse110-fa21-group32/wiki/Repo-Rules#commit)

### .gitignore

When pushing source code, we avoid pushing things like node_modules and the like. These things should be in your .gitignore. Similarly, runtime specific things like `pycache`, `package-lock.json`, etc are also in the .gitignore. Finally, local databases for our recipes and users that are made by `user_db.py` are also supposed to be in the .gitignore.

### Style Guide

For more details on our style guide, be sure to check out our Wiki page on it [here](https://github.com/cse110-fa21-group32/cse110-fa21-group32/wiki/Style-Guide)

### CI/CD Pipeline Overview

For more details on the CI/CD pipeline, be sure to check out our Wiki page on it [here](https://github.com/cse110-fa21-group32/cse110-fa21-group32/wiki/Pipeline)

## Issue Labels

We use a variety of issue labels to keep track of things that need to be addressed in our work. For example, the bug issue label signifies something that has gone wrong in the code 

## Things to be Considered for the Future
- Developing the calendar feature where users can develop a schedule for meal planning.
- Implementing a favorite recipe tracker for our users.
- Adding a review system custom-built for our website.
- Having a multithreaded server to avoid clashes between SQLite & JS.
- Considering a hybrid of client-side and server-side work.
- Faster image sending and uploading.
- Forget Password Functionality.
