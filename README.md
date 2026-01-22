## Authentication Notes

This project uses the public **FakeStoreAPI** for authentication-related flows.

### Signup Behavior
The **signup (register)** functionality does **not** persist users to a real database.  
FakeStoreAPI does not provide an actual backend or database, so the signup request only simulates a successful response and does not create a real user.

As a result, newly registered credentials **cannot** be used to log in afterward.

### Login Credentials
To test the **login** functionality, please use one of the following existing FakeStoreAPI credentials:

```json
{
  "username": "johnd",
  "password": "m38rmF$"
}
or
{
  "username": "kevinryan",
  "password": "kev02937@",
}
