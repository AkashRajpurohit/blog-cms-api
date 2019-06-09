# Project: Blog + CMS (ID: JS-3)
## Project given by Levin from 'Garbage Collector' Organization from discord
## Difficulty: Intermediate to advanced

## Task
#### Build a database-driven (persistent) blog themed application, including a (small) Content-Management System (CMS) for administrators to manage it.

* Blog
* [x] Securely register and log in users => Password hashing, session management, authorization and authentication
* [ ] Allow authorized users to:
  * [x] Create new blog posts - a post should include
    * [x] a title
    * [x] an author
    * [x] some content
    * [x] is published
    * [ ] (Optional): a post picture
  * [x] Edit their own posts 
  * [x] Delete their own posts (Soft Delete)
  * [ ] View their own profile information, which should include
    * [ ] the username
    * [ ] the E-Mail
    * [ ] (Optional): a biography
    * [ ] (Optional): a profile picture
    * [ ] All of their posts
    
* Get access to the CMS
  * [ ] for administrators only -> differentiate between normal users and admins

* Additionally, allow everyone to:
  * [ ] View all published blog posts

* CMS:
  * [ ] Allow administrators only!
  * [ ] Get an overview of all registered users, ability to view their information which equals the information the user should be able to see about him/herself
  * [ ] Edit and delete any post
  * [ ] Delete user accounts
  * [ ] Create user accounts
  * [ ] Grant users administrator privileges
  * [ ] (Optional): Statistics of registrations and/or posts


## Stretch - Plan to implement task apart from given
* [ ] Use access token and refresh token for authentication and authorization
* [ ] Allow user to hard delete any data (eg. Blog post)