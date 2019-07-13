[Feedback:] Blog + CMS (ID: JS-3) - Akash Rajpurohit#3587
[Author:]   Levin#5447 (GarbageCollectors)
[Date:]     12/07/2019
 
[Repo:] https://github.com/AkashRajpurohit/blog-cms-api/
[~] [Readme:] Provided
    [~] Very detailed
    [~] Informative, provides good overview of assignment
    [~] Well written and designed, nice to read
[~] [Commits]
    [~] Informative descriptions
    [~] Clean commit history
[~] Licensed: MIT
[~] Issues: Unused
 
[Documentation:] Provided - Great! (https://documenter.getpostman.com/view/4346639/S1TZzbts?version=latest)
[~] Grouped, follows logical structure
[~] Informative
[~] Includes examples
[~] Sometimes a little informal
[~] Writing could be improved upon, although it's enough for an exercise like this
[~] Documentation shouldn't contain complete URLs, just the api specific routes -> `/api/v1/user/register` instead of `http://localhost:4000/api/v1/user/register`
 
[Code:]
[~] [Architecture:]
    [~] Logically structured
    [~] Consistent
[~] [General:]
    [~] Consistent code style
    [~] Usage of modern features (ES6)
    [~] Follows SRP (Single responsibility principle) for the most part
    [~] Follows fundamental best practices
   
[~] [Improvements:]
    [~] Use `console.error` instead of `console.log` when logging errors
    [~] Naming convention in Schemas: Keep names concise, don't repeat schema name. Example: `user.usertype` -> `user.type`
    [~] Don't `return` undefined specifically: `return console.log(...)` (utils/sendForgotPassword.js - 242) - `console.log` returns `undefined`
    [~] Since `null` coerces to `undefined` and the other way around, both `x == null`, as well as `x == undefined` is the exact same as
        `x === null || x === undefined` - reduces condition complexity (helpers/validations/isEmpty.js)
    [~] Don't use the ternary expression like done in helpers/validations/loginValidator.js, lines 9-11
        Prefer:
            if (isEmpty(data.usernameOrEmail))
                data.usernameOrEmail = '';
    [~] app.js:
            res.json({
                message: 'Hello World!',
                'where to?': 'Read the docs at: /api/v1/docs',
            })
        Never name keys like that ('where to?'), either usual object keys or JSON-keys. Makes your code fragile and hard to expand
        as keys like that are extremely easy to get wrong and are way too informal, thus unpredictable.
    [~] It's good that you do custom/external database input validation (outside of the actual Schema), although you should do it
        inside of the Schema as well.
        External validation like that is really easy to get wrong, even the slightest bug in your code that slips into production might
        cause a bunch of users registering
        with invalid data. Setting up internal validation inside of the mongoose schemas additionally to your external validation will
        prevent that.
    [~] Commenting: Too few comments in general, comments sometimes used in a rather unnecessary way as they should explain why          
        something is happening and not what is happening if - and only if - that isn't clear straight away. Example:
        api/user/user.controller.js line 94
       
[API:]
[~] [Register]:
    [~] "password2" is a very undescriptive name, rather use "confirmPassword" or something similar
[~] [Login:]
    [~] "usernameOrEmail" is rather unintuitive, might be cleaner to allow the user to provide either a "username" or "email"
        -> handle it with 2 different keys instead of a single one for both.
[~] Rest looks alright, well done
       
[Summary:]
You've done really well overall. The code is really clean, without a doubt the cleanest JavaScript code that has been submitted on the GarbageCollectors server so far, besides the mentioned points of course. I could tell straight away how much effort you put into this exercise. The repo looks really good and you've even made the effort to provide a full documentation for your API, along with other additional features that weren't strictly required for the assignment. The project structure looks fine too and my functionality tests of your API have passed.
 
And that brings us to a topic that I certainly want to address - Unit testing. Unit testing is an incredibly important part of software development, especially for backend services like this. I think that it would be a great next step for you to take a deep dive into some Node.js testing frameworks like Mocha.