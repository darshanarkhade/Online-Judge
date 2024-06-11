# Online Judge Platform

This is a full-stack online judge platform built with the MERN stack (MongoDB, Express, React, Node.js). Here's an overview of its key features and technologies used:

## Key Features

### User Management
- **User Registration and Authentication**: Secure user registration and authentication using JWT tokens.
- **User Roles**: Two distinct roles - User and Admin, each with specific privileges.

### Problem Management
- **Curated Problem List**: A curated list of coding problems covering various difficulty levels and topics.
- **Detailed Problem Descriptions**: Detailed problem statements, input/output specifications, and example test cases.

### Code Submission
- **Code Execution Environment**: Dockerized backend and compiler for secure and isolated code execution.
- **Submission Evaluation**: Automatic evaluation of submitted code with verdicts provided based on correctness, time limits, and compilation errors.
  - **Verdicts**:
    - **Accepted**: Code produces the expected output for all test cases.
    - **Wrong Answer**: Code produces incorrect output for one or more test cases.
    - **Time Limit Exceeded (TLE)**: Code exceeds the time constraints set for execution.
    - **Compilation Error**: Error occurs during code compilation.

### Profile Management
- **Personalized User Profiles**: Personal profiles for users to track solved problems, submission history, and overall performance.

### Admin Tools
- **Problem Administration**: Admins can add, edit, and delete problems.
- **Testcase Management**: Admins can manage test cases for each problem.

### Leaderboard
- **Performance Tracking**: Leaderboard displaying top problem solvers based on their performance.

## Technologies Used

### Frontend
- **React**: JavaScript library for building responsive user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for designing clean and customizable UI components.

### Backend
- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing user data, problem information, and submissions.

### Containerization
- **Docker**: Platform for containerizing backend services and code compilers to ensure security and scalability.

### Security
- **JWT Authentication**: Secure authentication mechanism to protect user data and ensure privacy.
- **Docker Isolation**: Utilize Docker's isolation features to prevent malicious code from affecting the host system.

### Deployment
- **AWS EC2**: Deploy backend services on Amazon EC2 instances for reliable performance.
- **AWS ECR**: Container registry service for securely storing Docker images.
- **Vercel**: Deploy frontend applications with ease using Vercel's platform.

This platform provides a comprehensive environment for users to practice coding, participate in competitions, and track their progress effectively.

## Screenshots

1. **Home Page**: The landing page showcasing the platform's branding and navigation options.
   ![Home Page](https://github.com/king0203/Online-Judge/assets/114811437/f03cdeec-5323-406b-aa3f-a6de9514d3a7)

2. **Register Page**: The registration page for new users to sign up for an account.
   ![Register Page](https://github.com/king0203/Online-Judge/assets/114811437/3d031852-acc3-40d2-9c8f-64158e0583e0)

3. **Login Page**: The login page for registered users to log in to their accounts.
   ![Login Page](https://github.com/king0203/Online-Judge/assets/114811437/eec1d2e5-29c5-437d-920c-95d3683834cf)

4. **Problems Page**: The page displaying a list of coding problems available on the platform.
   ![Problems Page](https://github.com/king0203/Online-Judge/assets/114811437/af838f61-545e-4a35-b219-970f83d06d63)

5. **Problem Page**: The detailed page for a specific coding problem, including the problem statement and test cases.
   ![Problem Page](https://github.com/king0203/Online-Judge/assets/114811437/bb9f860c-4dae-4670-8c44-fd7c0bfed46b)

6. **Submission History**: The page where users can view their submission history and verdicts.
   ![Submission History](https://github.com/king0203/Online-Judge/assets/114811437/3449cde7-0de3-49f5-8a76-b063dc1e2a76)

7. **Leaderboard**: The leaderboard displaying the top performers on the platform.
   ![Leaderboard](https://github.com/king0203/Online-Judge/assets/114811437/2b7599a7-9a81-4a5e-b8c4-07d0604ee4b2)

8. **All Solutions**: The page showing all solutions submitted by users for a specific problem.
   ![All Solutions](https://github.com/king0203/Online-Judge/assets/114811437/b3fa9a35-d802-45d4-bff8-0aa95951c3a4)

9. **Profile of Current User**: The profile page displaying information about the current user.
   ![Profile of Current User](https://github.com/king0203/Online-Judge/assets/114811437/0364516b-26c4-4cf9-8c20-33d23209a8d6)

10. **Add Problem**: The page for admins to add a new coding problem to the platform.
    ![Add Problem](https://github.com/king0203/Online-Judge/assets/114811437/30001bcb-23f6-4a2f-beae-3d959abee3f8)

11. **Add Testcase**: The page for admins to add a new testcase to an existing coding problem.
    ![Add Testcase](https://github.com/king0203/Online-Judge/assets/114811437/3d2c71de-8c5e-47a0-bfbd-3c7655fe941b)

12. **Update Testcase**: The page for admins to update an existing testcase for a coding problem.
    ![Update Testcase](https://github.com/king0203/Online-Judge/assets/114811437/e1c56edc-f9e8-4e5b-9924-7e8283d0cad0)
