# NinjaCoder

## Description

NinjaCoder provides some coding courses to children. Courses are added by tutors - teachers or web developers.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform, as a parent or a tutor (teacher / web developers) so that I can access to my profile
- **Login:** As a user I can login to the platform so that I can acess to my profile (profiles are different for parents and tutors)
- **Logout:** As a user I can logout from the platform so no one else can use my account
- **Buy Courses** As a user/parent I can buy a course for my child
- **Review Courses** As a user/parent I can give a review to the courses that I've bought (backlog)
- **Add Courses** As a user/tutor I can create and add courses in the platform so that parents can choose to buy it or get it for free
- **Edit Courses** As a user/tutor I can edit the courses that I added
- **List Courses** As an anon/user I can see all the courses library
- **Search Courses** As a anon/user I can browse the library to find courses
- **See my profile** As a user/parent I can see my profile and the list of courses that I've bought for my child. As a user/teacher I can see my profile and the list of courses that I've added.
- **Check profile** As a user/parent I can view the profile of the tutors whose course interests me.
- **Edit my profile** As a user/parent/tutor I can edit my general informations
- **Send messages** As a user/parent/tutor I can send message

## Backlog

Messenger (add two models):

- Users can send messages in 1:1

Message model:

```javascript
{
  sender: [{type: Schema.Types.ObjectId, ref: 'User'}],
  content: {type: String, required: true}
  conversationId:  [{type: Schema.Types.ObjectId, ref: 'Conversation'}]
}

```

Conversation model:

```javascript
{
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }];
}
```

Calendar:

- parent can book for some meetings or courses in 1:1 with the teacher for his child

GoogleSignup:

- parent can book for some meetings or courses in 1:1 with the teacher for his child

Personalised search bar:

- according to the age and experience of the child, the content can change

Parent model (add this key):

```javascript
{
experience: {type: String, enum: [beginner, advanced, expert]}
}
```

# Client / Frontend

## React Router Routes (React App)

| Path                         | Component                                          | Permissions                | Behavior                                                          |
| ---------------------------- | -------------------------------------------------- | -------------------------- | ----------------------------------------------------------------- |
| `/`                          | LandingPage                                        | public `<Route>`           | Home page navigation - navbar                                     |
| `/signup`                    | SignupForm                                         | public `<Route>`           | Signup form, link to login, navigate to profile page after signup |
| `/login`                     | LoginForm                                          | public `<Route>`           | Login form, link to signup, navigate to profile page after login  |
| `/logout`                    | n/a                                                | user only `<PrivateRoute>` | Navigate to homepage after logout, expire session                 |
| `/parent`                    | Navbar, Profile, SearchBar, Course, CoursesList    | user only `<PrivateRoute>` | Check profile with courses bought                                 |
| `/parent/edit`               | Navbar, ProfileDetail                              | user only `<PrivateRoute>` | Update or delete general informations                             |
| `/parent/:courseId`          | Navbar, CourseDetail, GiveReviews                  | user only `<PrivateRoute>` | Details of the video bought, review it                            |
| `/tutor`                     | Navbar, Profile, CoursesList, Course Reviews       | user only `<PrivateRoute>` | Check profile with courses added                                  |
| `/tutor/edit`                | Navbar, ProfileDetail                              | user only `<PrivateRoute>` | Update or delete general informations with a form                 |
| `/add-course`                | NavBar, AddCourse                                  | user only `<PrivateRoute>` | Create a course with a form                                       |
| `/edit-course/:courseId`     | NavBar, EditCourse                                 | user only `<PrivateRoute>` | Edit the course with a form                                       |
| `/courses`                   | NavBar, CoursesList, SearchBar, FooterBar, Reviews | public `<Route>`           | Shows all courses from tutors                                     |
| `/courses/:courseId`         | CourseDetail, Reviews, Price                       | user only `<PrivateRoute>` | Show the details of the course selected                           |
| `/confirmation`              | LoginForm                                          | user only `<PrivateRoute>` | Enter password to be sure it is an action from parent             |
| `/courses/:courseId/payment` | BuyCourseForm                                      | user only `<PrivateRoute>` | Buy the course selected                                           |
| `/teacherprofile/:teacherId` | Profile, CoursesList, Course, Reviews, Price       | user only `<PrivateRoute>` | Check the profile of the teacher and his work                     |
| `/aboutus`                   | Navbar, AboutUs, Footer                            | public `<Route>`           | What about the website                                            |

## Components

- LandingPage

- SignupForm

- LoginForm

- NavBar

- SearchBar

- Profile

- CoursesList

- Footer

- Course

- CourseDetail

- Reviews

- GiveReviews

- Price

- BuyCourseForm

- AboutUs

- TeacherProfile (view from a parent)

## IO

## Services

- Auth Service

  - auth.login(user)
  - auth.signup(user)
  - auth.logout()

- Course Service

  - courses.list()
  - courses.create()
  - courses.delete(id)
  - courses.edit(id)

- External services

  - Stripe package
  - Material UI
  - Socket(backlog)

# Server

## Models

Parent model

```javascript
{
  username: {type: String, required: true, unique: true},
  kidAge: {type: Number, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  secretWord:{type:String, required:true}
  profilePic: {type: String},
  coursesBooked: [{type: Schema.Types.ObjectId, ref: 'Course'}]
}
```

Tutor model

```javascript
{
  username: {type: String, required: true, unique: true}
  email: {type: String, required: true, unique: true}
  password: {type: String, required: true}
  profilePic: {type: String}
  coursesAdded: [{type: Schema.Types.ObjectId, ref: 'Course'}]
}
```

Course model

```javascript
{
  name: {type: String, required: true, unique: true}
  description: {type: String, required: true}
  tutor: [{type: Schema.Types.ObjectId, ref: 'User'}]
  price: {type: Number, required: true}
  minAge: {type: Number, required: true}
  imageUrl: {type: String, required: true}
  videoUrl: {type: String, required: true}
  lessons: [{type: Schema.Types.ObjectId, ref: 'Lesson'}]
}
```

Lesson model

```javascript
{
  name: {type: String, required: true}
  description: {type: String, required: true}
  media: {type: String, required: true}
  order: {type: Number, required: true}
}
```

Review model

```javascript
{
  rate: {type: Number, required: true},
  date: {type: Date, required: true},
  feedback: {type: String, required: true},
  courseId: [{type: Schema.Types.ObjectId, ref: 'Course'}]
  userId: [{type: Schema.Types.ObjectId, ref: 'User'}]
}

```

## API Endpoints/Backend Routes

| HTTP Method | URL                          | Request Body                        | Success status | Error Status | Description                                                                                                                     |
| ----------- | ---------------------------- | ----------------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/profile `             | Saved session                       | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`               | {name, email, password, secretWord} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                | {username, password}                | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`               | (empty)                             | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/`                          |
| PATCH       | `/profile/edit`              |
| GET         | `/teacherprofile/:teacherId` |
| GET         | `/profile`                   |
| POST        | `/add-course`                |
| PATCH       | `/courses/:id/edit`          |
| GET         | `/courses`                   |
| GET         | `/courses/course:id`         |
| DELETE      | `/profile/delete`            |
| DELETE      | `/courses/:id/delete`        |

## Links

### Wireframes

[Wireframes](https://whimsical.com/ninjacoder-mid-fi-MGRHtqYcRMwPLwvSHcSEkf)

### Notion/Kanban

[Kanban](https://www.notion.so/ce36f7e972164ebabeacbdc7fdabb09c?v=313677cb7ca14d12bd744a1de5db3c78)

### Git

[Client repository Link](https://github.com/Joanneseiler/NinjaCoder-client)

[Server repository Link](https://github.com/Joanneseiler/ninjacoder-server)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
