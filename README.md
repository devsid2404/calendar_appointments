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

* Test API

    - Health Check
    url => http://localhost:6000/api/testApi/healthCheck

    - Get Time Zone offset based on country id
    url => http://localhost:6000/api/testApi/getTimeZones?country=DE
    
* User

    - Create new User
    url => POST http://localhost:6000/api/user/create

    - GET all Users
    url => GET http://localhost:6000/api/user/get/all

    - Get Free slots for the user
    url => GET http://localhost:6000/api/user/availableSlots?id=Z6lCvaxXYe4AGagW2Z9V&date=10/08/2023&timeZoneOffset=330

* Event 

    - Create new event for the user
    url => POST http://localhost:6000/api/event/create

    - Get all Events for given user for a given time frame
    url => GET http://localhost:6000/api/event/get/all?userId=uyPkTNuLLlgcXKdCRRTS&startDate=09/08/2023&endDate=10/08/2023
    
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

