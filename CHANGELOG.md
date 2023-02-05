### 1.0.0

- Init module.
- Account creation, authentication
    + 3 GraphQL APIs:
        + Mutation create a new account
        + Login an account
        + Query to get my account with account Bearer token
        + Query to get an account with admin Bearer token
- Token authentication & authorization
- Reminder management
    + 3 first routes:
        + Create a reminder: `reminder/create`.
        + Find a reminder by id: `reminder/findById`.
        + Search reminders: `reminder/search`
    + 3 GraphQL APIs
        + Query get a reminder.
        + Query search reminders.
        + Mutation create a new reminder.
