# Calendar Appointments


## Backend
Node Js
Express
Inversify
Firestore

### Project Setup

* Node version => 16.X.X +

* Commands
    - cd backend
    - npm ci
    - npm run dev

### API Endpoints

* POST ((host))/api/user/create
    - Creates a new user to manage appointment timings

* GET ((host))/api/user/get/all

* GET ((host))/api/user/availableSlots
    - Get all available slots to book based on the given offset timezone

* POST ((host))/api/event/create
    - Create a new event of a given user

* GET ((host))/api/event/get/all
    - get all events for a give user


