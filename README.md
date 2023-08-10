# Calendar Appointments


## Backend
Node Js
Express
Inversify
Firestore

### Project Setup

* Node version => 16.X.X +

* Commands
    **```cd backend```

    **```npm ci```

    **```npm run dev```

### API Endpoints

Can use postman collection in backend folder => calendar_appointments.postman_collection.json

* POST ((host))/api/user/create
    - Creates a new user to manage appointment timings

* GET ((host))/api/user/get/all

* GET ((host))/api/user/availableSlots
    - Get all available slots to book based on the given offset timezone

* POST ((host))/api/event/create
    - Create a new event of a given user

* GET ((host))/api/event/get/all
    - get all events for a give user


### Folder structure

    ```bash
    src
    ├── AppServer.ts
    ├── Symbols.ts
    ├── bind.ts
    ├── commons
    │   ├── errors
    │   │   ├── Duplicate.error.ts
    │   │   ├── Validation.error.ts
    │   │   └── errorMapping.ts
    │   ├── logger
    │   │   └── logger.ts
    │   └── time.ts
    ├── components
    │   ├── events
    │   │   ├── event.interface.ts
    │   │   ├── event.repository.ts
    │   │   └── event.service.ts
    │   └── users
    │       ├── user.interface.ts
    │       ├── user.repository.ts
    │       └── user.service.ts
    ├── controllers
    │   ├── event
    │   │   └── event.controller.ts
    │   ├── testApi
    │   │   └── testApi.controller.ts
    │   └── user
    │       └── user.controller.ts
    ├── db
    │   └── dataBaseConnection.ts
    ├── index.ts
    └── models
    ```

