# Serverless Forum

A serverless forum experiment. Powered by [Netlify](https://www.netlify.com/docs/form-handling/) &amp; [DiscussBot](https://comments.app/).

Demo: [https://serverless-forum.netlify.com/](https://serverless-forum.netlify.com/)

## How it works

- Use [Netlify Forms](https://www.netlify.com/docs/form-handling/) to collect discussion meta data.
- Use [DiscussBot](https://comments.app/) to collect and display discussion replies.
- This repository will fetch form submissions via [Netlify API](https://www.netlify.com/docs/api/#form-submissions), then render them to HTML pages, with DiscussBot code inside. This repository should be deployed to Netlify.
- Optional. You can set a webhook on Netlify, so the pages will be rebuilt automatically when the form receives a new submission every time. 



## Features

- Serverless
- Zero cost to start ([Netlify Pricing](https://www.netlify.com/pricing/#forms))
- Automatically rebuild (Netlify Feature)
- Spam filtering ([Netlify Feature](https://www.netlify.com/docs/form-handling/#spam-filtering))
- Support images in reply (DiscussBot Feature)
- Upvotes / downvotes (DiscussBot Feature)
- Reply roles: ADMINISTRATORS / MODERATORS / BLOCKED USERS (DiscussBot Feature)



## Get started

1. Fork this repository.

2. Create a new site on [Netlify](https://app.netlify.com/start), and select the repository you just forked. 

3. Fill `npm run build` to build command, and `dist` to publish directory.  Then click the 'Show advanced' button, add a new environment variable name FORUM_NAME, enter any words to the value field (other variables will fill later). Then click 'Deploy site'.

4. Once the site deployed successfully, visit YOURSITE.netlify.com/submit.html to submit a new discussion.

5. Go back to Netlify dashboard, visit the forms page and click the 'discussion' form. The last part of its URL is the NETLIFY_FORM_ID. Write it down, will use later.

6. Go to [https://app.netlify.com/user/applications](https://app.netlify.com/user/applications), generate a new personal access token. It's NETLIFY_TOKEN. Write it down, will use later.

7. Go to [https://comments.app/manage](https://comments.app/manage), connect the site you just created. Then you will get DISCUSSBOT_SITE_ID. Write it down.

8. Go to the deploy settings page of your site on Netlify, add all these variables to the environment one by one.

   ```
   FORUM_NAME
   NETLIFY_TOKEN
   NETLIFY_FORM_ID
   DISCUSSBOT_SITE_ID
   DISCUSSBOT_COMMENTS_LIMIT
   ```

9. Trigger a new deploy manually on Netlify Deploys page. It will update the forum site based on the latest submissions.



### Optional: Automatically rebuild

1. Go to Netlify Deploy Settings page, add a new build hook, then copy the unique URL.
2. Go to Netlify Forms Settings page, create a new form outgoing webhook, the 'URL to notify' is the URL you just copied.








