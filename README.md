# Project: Blog + CMS (ID: JS-3)
## Project given by Levin from 'Garbage Collector' Organization from discord
## Difficulty: Intermediate to advanced

## Task
#### Build a database-driven (persistent) blog themed application, including a (small) Content-Management System (CMS) for administrators to manage it.

* Blog
* [x] Securely register and log in users => Password hashing, session management, authorization and authentication
* [x] Allow authorized users to:
  * [x] Create new blog posts - a post should include
    * [x] a title
    * [x] an author
    * [x] some content
    * [x] is published
    * [ ] (Optional): a post picture
  * [x] Edit their own posts 
  * [x] Delete their own posts (Soft Delete)
  * [x] View their own profile information, which should include
    * [x] the username
    * [x] the E-Mail
    * [ ] (Optional): a biography
    * [ ] (Optional): a profile picture
    * [x] All of their posts
    
* Get access to the CMS
  * [x] for administrators only -> differentiate between normal users and admins

* Additionally, allow everyone to:
  * [x] View all published blog posts

* CMS:
  * [x] Allow administrators only!
  * [x] Get an overview of all registered users, ability to view their information which equals the information the user should be able to see about him/herself
  * [x] Edit and delete any post
  * [x] Delete user accounts
  * [x] Create user accounts
  * [x] Grant users administrator privileges
  * [ ] (Optional): Statistics of registrations and/or posts


## Stretch - Plan to implement task apart from given
* [ ] Use access token and refresh token for authentication and authorization
* [ ] Allow user to hard delete any data (eg. Blog post)
* [ ] While registering users create a confirmation link and send it to the user by email to verify the email address
  * [ ] Generate a token which expires after 24 hours
  * [ ] Redis????