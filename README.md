Environment Variables:

JWT_Secret
PORT
MONGODB_URI

Dependencies:
bcrypt
dotenv
express
jsonwebtoken
helmet
mongoose
morgan
nodemon(optional)

Run Locally:
Clone the project You must set you your Env variables and install the list of dependencies
Install depenedencies and npm in project directory.

Route explaination:
Auth Routes:
/auth - allows you to search for user
/auth/register - allows you to create a user
/auth/login - allows you to authenticate with created user

BlogRoutes:
/Blog - finds non Private blogs.
/Blog/username(get) - finds public blogs created by user matching the username entered.
/Blog/username(post) - creates a blog assigning created_by to current username and logs the current date created.
/Blog/Id(get) - find a specific blog using ID to search for it.
/Blog/Id(Put) - finds a specific blog using ID and allows you to update the blog
/Blog/Id(delete) - finds a specific blog using ID and allows you to delete it. 

Roadmap:
Implement Swagger for better documentation.
Allow users to only view public blogs or allows them to see private if they are the owner of the blog. 


