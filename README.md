# Assessment Task

### 1. A project titled, “Alex’s Kitchen” from team "Remote Kitchen" uses Git for version control. Several developers are contributing, with each working on their own branch. The team follows certain conventions. Suppose you need to submit a hotfix. How would you name your branch? After finalizing your work in your designated branch, detail the steps you would take to create a PR and merge it with the production branch.

## Answer:

- i will name my branch hotfix/bugs-description.

- Create a pull request (PR) on GitHub explaining the issue and fix.

- Assign team members for review.

- Merge the PR into the production branch after approval.

- Delete the hotfix/bugs-description branch when done.

### 2: In a Digital Kitchen, we have an array of Menu collections. Each collection is an object of the Menu. And contains two properties alongside various properties of Menu. Which are, menuItems (which is an array of objects. Each object has a unique identifier) and categories. Categories itself is an array of objects. In each object inside categories, there is one property (an array of int’s) called menu Items Ids. Find out the specific items that belong to each category. Take a reference from below code snippet,

- Iterate through each Menu collection: Start by looping through each Menu collection in the array.

- Access categories and menu items: For each Menu collection, access its categories and menu items properties.

- Match menu item IDs with category IDs: For each category within the Menu collection, match the IDs of menu items listed in the category's menuItems array with the IDs of menu items in the menuItems array.

- Create a mapping: Create a mapping or association between each category and its corresponding menu items based on the matched IDs.

- Repeat for all Menu collections: Repeat this process for all Menu collections in the array.

- Store or display the results: Store or display the results in a structured format, such as associating each category with its respective menu items.
