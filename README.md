## From Notion to Blog

My setup for personal blog using Notion as a CMS. It can be used as a boilerplate for your blogs.

<img width="1037" alt="Screenshot 2024-04-21 at 12 34 05 PM" src="https://github.com/Utkarshn10/notion-blog/assets/58587256/5ce68b10-c086-4db5-9c22-12be26a9af7b">

## How to use the boilerplate

### Step 1 - Create an integration via Notion 
- Go to https://developers.notion.com/docs/create-a-notion-integration and create your integration
- Go to your notion database (where you will be storing all the blogs) and click on the 3 dots and the top right corner
- In the menu go to "Connections" and click on "Connect to"
- Select your integration 

### Step 2 - Setting up the environment
- Use your integration key as the NOTION_KEY
- To get your Blog DB ID you can take a look at [this](https://developers.notion.com/reference/retrieve-a-database).
  
```
NEXT_PUBLIC_NOTION_KEY = YOUR_NOTION_KEY
NEXT_PUBLIC_NOTION_BLOG_ID = YOUR_BLOG_DB_ID
```

### Step 3 - Setting the config file 

```javascript
export const SITE_TITLE = ""
export const SITE_DESCRIPTION = ''
export const SITE_KEYWORDS = ''
export const SITE_AUTHOR = ''
export const SITE_URL = ''
```





