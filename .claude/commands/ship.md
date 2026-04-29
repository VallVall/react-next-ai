Stage, commit, and push all changes.

1. Ask the user for the commit message input (a short description of the changes)
2. Get the current branch name via `git branch --show-current`
3. Run the following commands in order:
   - `git add .`
   - `git commit -m "[branch-name]: [user-input]"`
   - `git push`
4. Report success or any errors
