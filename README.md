# Calendar Appointments


## Backend
Node Js
Express
Inversify
Firestore

### Project Setup

* Node version => 16.X.X +

* Commands
    - In the root project folder => ```cd backend```

    - Install dependencies => ```npm ci```

    - Run app in development env => ```npm run dev```

    - Build ts file to js => ```nom run build```

    - Build and run code for production => ```npm run start```

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
    ├── AppServer.ts              # Application bootstrap
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
    │   │   ├── event.repository.ts # DB queries
    │   │   └── event.service.ts    # Business logic
    │   └── users
    │       ├── user.interface.ts
    │       ├── user.repository.ts # DB queries
    │       └── user.service.ts    # Business logic
    ├── controllers                # API endpoints
    │   ├── event
    │   │   └── event.controller.ts
    │   ├── testApi
    │   │   └── testApi.controller.ts
    │   └── user
    │       └── user.controller.ts
    ├── db
    │   └── dataBaseConnection.ts 
    ├── index.ts                   # Application start point
    ```

