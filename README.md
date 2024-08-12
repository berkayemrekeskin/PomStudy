
# PomStudy

PomStudy is a productivity web application that helps high school students manage their time and compete with their friends using the Pomodoro technique. It also provides a social platform where users can share their completed Pomodoro sessions, chat with each other, and see themselves in the leaderboard.

## Features

- **Authentication:** Secure user authentication with Firebase.
- **Social Page:** View and interact with Pomodoro sessions completed by other users.
- **Session Page:** Access a Pomodoro timer and add descriptions for your sessions.
- **Messages Page:** Send and receive messages, engage in chats with other users.
- **Profile Page:** View your user profile, including personal data.

## Tech Stack

- **Frontend:** React.js
- **Backend/Database:** Firebase
- **Authentication:** Firebase Authentication

## Pages Overview

1. **Social Page:**
   - Displays a feed of Pomodoro sessions completed by other users.
   - Users can view and interact with posts made by others.
   - Posts are specialized for the user's school and class (Not all posts created are shown)

https://github.com/user-attachments/assets/97e70ffe-3822-439c-8226-0aa0995380d3

2. **Session Page:**
   - Includes a Pomodoro timer.
   - Users can add descriptions to their Pomodoro sessions and track their progress.
   - After the pomodoro session, user gets a PomPoint according to it's duration. Each user has it's PomPoints and leaderboard system according to that.
     
![Ekran görüntüsü 2024-08-12 202616](https://github.com/user-attachments/assets/926cd894-1427-4704-ba59-db593809b9ce)

3. **Messages Page:**
   - A messaging platform for users to chat with each other.
   - Supports real-time messaging among users.
   - Users can create rooms for the school and their classes.

https://github.com/user-attachments/assets/1fc14a52-4712-4110-842c-d0f72cfbfdb5

4. **Profile Page:**
   - Displays user data.
   - According to their PomPoints, users are sorted among the all users and each user has it's own place inside the competition.
   
![Ekran görüntüsü 2024-08-12 202651](https://github.com/user-attachments/assets/ad6d5ed7-4916-4447-bb48-556bb56d9049)

5. **Register & Login:**
   - Authorization was made using Firebase Authorization.
   - Supports Google Auth also

<img src="https://github.com/user-attachments/assets/4c6324c7-371a-43af-aa25-0c7440c5ec95" width="500" height="300" />
<img src="https://github.com/user-attachments/assets/5a905862-dd78-446a-866b-590a75b29157" width="500" height="300" />
