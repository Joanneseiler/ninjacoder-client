# NinjaCoder

![Logo NinjaCoder](https://res.cloudinary.com/dba8qe3lm/image/upload/v1629189819/Logo_NinjaCoder.png)

## Description

NinjaCoder provides some free or paid online coding courses videos to children. Courses are added by tutors - teachers or web developers.
Have a look on our website, [here](https://ninja-coder.herokuapp.com/) !

## User Stories

- **404 :** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup :** As an anon I can sign up in the platform, as a parent or a tutor (teacher / web developers) so that I can access to my profile
- **Login :** As a user I can login to the platform so that I can acess to my profile (profiles are different for parents and tutors)
- **Logout :** As a user I can logout from the platform so no one else can use my account
- **Buy Courses :** As a user/parent I can buy a course (for free or paid) for my child. I cannot buy a course twice.
- **Review Courses :** As a user/parent I can give a review to the courses that I've bought (backlog)
- **Add Courses :** As a user/tutor I can create and add courses in the platform so that parents can choose to buy it or get it for free
- **Edit/Delete Courses :** As a user/tutor I can edit/delete the courses that I added
- **List Courses :** As an anon/user I can see all the courses library
- **Detail Course :** As a user I can see the details of a selected course in the library
- **View Courses :** As a anon/user I can browse the library to view courses
- **Search Courses :** As a anon/user I can find courses with the search bar
- **Search Bought Courses :** As a user/parent I can use the search bar in my profile to find easily a course that I bought
- **View Bought Courses :** As a user/parent I can use the search bar in my profile to find easily a course that I bought
- **Get Tutor Contact :** As a user/parent I can get the tutor's email to contact him from my external mailbox
- **See my profile :** As a user/parent I can see my profile and the list of courses that I've bought for my child. As a user/teacher I can see my profile and the list of courses that I've added.
- **Edit/Delete my profile :** As a user/parent/tutor I can edit my general information or delete my account

## Backlog

Search bar :

- in the library and in the user profile to search courses

Stripe :

- for payment

Review courses :

- Rates given by parents for a course calculates the average of the course

# Client / Frontend

| Path                          | Component                                                                            | Permissions                | Behavior                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------ | -------------------------- | ----------------------------------------------------------------- |
| `/`                           | LandingPage, ReviewCarousel                                                          | public `<Route>`           | Home page navigation - navbar                                     |
| `/signup`                     | SignupForm                                                                           | public `<Route>`           | Signup form, link to login, navigate to profile page after signup |
| `/signin`                     | SigninForm                                                                           | public `<Route>`           | Login form, link to signup, navigate to profile page after login  |
| `/logout`                     | n/a                                                                                  | user only `<PrivateRoute>` | Navigate to homepage after logout, expire session                 |
| `/profile`                    | Navbar, Profile, ParentProfile or TutorProfile, SearchBar, Courses, LoadingIndicator | user only `<PrivateRoute>` | Check profile with courses bought                                 |
| `/account`                    | Navbar, Account, LoadingIndicator                                                    | user only `<PrivateRoute>` | Update or delete general informations                             |
| `/parent/:courseId`           | Navbar, ParentCourseDetail, Review                                                   | user only `<PrivateRoute>` | Details of the video bought, review it                            |
| `/create-course`              | NavBar, AddCourse                                                                    | user only `<PrivateRoute>` | Create a course with a form                                       |
| `/courses/:courseId/edit`     | NavBar, EditCourse, LoadingIndicator                                                 | user only `<PrivateRoute>` | Edit the course with a form                                       |
| `/courses`                    | NavBar, Courses, SearchBar, Review, LoadingIndicator                                 | public `<Route>`           | Shows all courses                                                 |
| `/courses/:courseId`          | CourseDetail, LoadingIndicator                                                       | user only `<PrivateRoute>` | Show the details of the course selected                           |
| `/courses/checkout/:courseId` | CheckoutForm, Payment, LoadingIndicator                                              | user only `<PrivateRoute>` | Buy the course selected                                           |
| `/aboutus`                    | AboutUs, ImageCarousel                                                               | public `<Route>`           | What about the website                                            |

## Components

- LandingPage

- ReviewCarousel

- SignupForm

- LoginForm

- NavBar

- SearchBar

- Account

- Profile

- ParentProfile

- TutorProfile

- CourseDetail

- ParentCourseDetail

- Courses

- Reviews

- AddCourse

- EditCourse

- LoadingIndicator

- CheckoutForm

- Payment

- AboutUs

- ImageCarousel

- NotFound

## Services

- Auth Service

  - auth.login(user)
  - auth.signup(user)
  - auth.logout()

- Course Service

  - courses.detail()
  - courses.create()
  - courses.delete(id)
  - courses.edit(id)

- External librairies

  - Stripe package
  - Material UI
  - Cloudinary

# Server

## Models

Parent model

```javascript
{
  username: {type: String, required: true, unique: true},
  kidAge: {type: Number, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  secretWord:{type:String, required:true},
  profilePic: {type: String},
  coursesBooked: [{type: Schema.Types.ObjectId, ref: 'Course'}]
}
```

Tutor model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  profilePic: {type: String},
  coursesAdded: [{type: Schema.Types.ObjectId, ref: 'Course'}]
}
```

Course model

```javascript
{
  name: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  tutorId: { type: Schema.Types.ObjectId, ref: 'Tutor' },
  price: {type: Number, required: true},
  minAge: { type: Number },
  image: { type: String, required: true },
  video: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}
```

Review model

```javascript
{
  rate: {type: Number, required: true},
  date: {type: Date, required: true},
  feedback: {type: String, required: true},
  courseId: [{type: Schema.Types.ObjectId, ref: 'Course'}]
  userId: [{type: Schema.Types.ObjectId, ref: 'Parent'}]
}

```

## API Endpoints / Backend Routes

| HTTP Method | URL                          |
| ----------- | ---------------------------- |
| POST        | `/signup`                    |
| POST        | `/signin`                    |
| POST        | `/logout`                    |
| GET         | `/courses`                   |
| GET         | `/courses/:courseId`         |
| GET         | `/courses/:courseId/payment` |
| POST        | `/courses/rating`            |
| GET         | `/courses/:courseId/rating`  |
| GET         | `/tutor/courses`             |
| GET         | `/tutor/courses/add`         |
| DELETE      | `/tutor/courses/:courseId`   |
| DELETE      | `/tutor/courses/:courseId`   |
| POST        | `upload`                     |
| GET         | `/parent`                    |
| PATCH       | `/parent/edit`               |
| DELETE      | `/parent/delete`             |
| GET         | `/parent/courses`            |
| POST        | `/create-payment-intent`     |
| GET         | `/tutor`                     |
| PATCH       | `/tutor/edit`                |
| DELETE      | `/tutor/delete`              |

# Links

## Wireframes

[Link to the wireframe](https://whimsical.com/ninjacoder-mid-fi-MGRHtqYcRMwPLwvSHcSEkf)

## Kanban in Notion

[ Big steps ](https://deciduous-ocean-ebc.notion.site/703795bbc4804f45a23a7aab67ac5076?v=1b8cb5c8b82a4a1799d6346c4eebf46f)

[Small steps](https://deciduous-ocean-ebc.notion.site/ce36f7e972164ebabeacbdc7fdabb09c?v=313677cb7ca14d12bd744a1de5db3c78)

## Git

[Client repository Link](https://github.com/Joanneseiler/NinjaCoder-client)

[Server repository Link](https://github.com/Joanneseiler/ninjacoder-server)

[Deploy Link](https://ninja-coder.herokuapp.com/)

## Slides

[Slides Link](https://docs.google.com/presentation/d/1e-3RPotYmH_jy54ItRfUnQIy81RXW2O77OSbwewLDHs/edit?usp=sharing)
