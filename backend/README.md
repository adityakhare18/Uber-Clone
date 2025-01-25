# Uber Clone Backend

## API Endpoints

### POST /users/register

#### Description

This endpoint is used to register a new user.

#### Request Body

The request body must be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with at least 3 characters (required)
  - `lastname`: A string with at least 3 characters (optional)
- `email`: A valid email address (required)
- `password`: A string with at least 6 characters (required)

#### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- **200 OK**

  - **Description**: User registered successfully.
  - **Body**: A JSON object containing the authentication token and user details.
  - **Example**:
    ```json
    {
      "token": "your_jwt_token",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**

  - **Description**: Validation error or missing required fields.
  - **Body**: A JSON object containing the validation errors.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be atleast 3 character long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be 6 character long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - **Description**: An error occurred on the server.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```

#### Example Response
```json
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### POST /users/login

#### Description
This endpoint is used to log in an existing user.

#### Request Body
The request body must be a JSON object containing the following fields:
- `email`: A valid email address (required)
- `password`: A string with at least 6 characters (required)

#### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- **200 OK**
  - **Description**: User logged in successfully.
  - **Body**: A JSON object containing the authentication token and user details.
  - **Example**:
    ```json
    {
      "token": "your_jwt_token",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**
  - **Description**: Validation error or missing required fields.
  - **Body**: A JSON object containing the validation errors.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be 6 character long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **401 Unauthorized**
  - **Description**: Invalid email or password.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

- **500 Internal Server Error**
  - **Description**: An error occurred on the server.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```

#### Example Response
```json
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### GET /users/profile

#### Description
This endpoint is used to get the profile of the logged-in user.

#### Responses

- **200 OK**
  - **Description**: User profile retrieved successfully.
  - **Body**: A JSON object containing the user details.
  - **Example**:
    ```json
    {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
    ```

- **401 Unauthorized**
  - **Description**: User is not authenticated.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

- **500 Internal Server Error**
  - **Description**: An error occurred on the server.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```

### GET /users/logout

#### Description
This endpoint is used to log out the user.

#### Responses

- **200 OK**
  - **Description**: User logged out successfully.
  - **Body**: A JSON object containing the success message.
  - **Example**:
    ```json
    {
      "message": "User logged out successfully"
    }
    ```

- **400 Bad Request**
  - **Description**: No token provided for logout.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "No token provided for logout"
    }
    ```

- **500 Internal Server Error**
  - **Description**: An error occurred on the server.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```

### POST /captains/register

#### Description
This endpoint is used to register a new captain.

#### Request Body
The request body must be a JSON object containing the following fields:
- `fullname`: An object containing:
  - `firstname`: A string with at least 3 characters (required)
  - `lastname`: A string with at least 3 characters (optional)
- `email`: A valid email address (required)
- `password`: A string with at least 6 characters (required)
- `vehicle`: An object containing:
  - `color`: A string with at least 3 characters (required)
  - `plate`: A string with at least 3 characters (required)
  - `capacity`: An integer with at least 1 (required)
  - `vehicleType`: A string that must be one of 'car', 'motorcycle', 'auto' (required)

#### Example Request
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Responses

- **200 OK**
  - **Description**: Captain registered successfully.
  - **Body**: A JSON object containing the captain details.
  - **Example**:
    ```json
    {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
    ```

- **400 Bad Request**
  - **Description**: Validation error or missing required fields.
  - **Body**: A JSON object containing the validation errors.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        },
        {
          "msg": "Color must be at least 3 characters long",
          "param": "vehicle.color",
          "location": "body"
        },
        {
          "msg": "Plate must be at least 3 characters long",
          "param": "vehicle.plate",
          "location": "body"
        },
        {
          "msg": "Capacity must be at least 1",
          "param": "vehicle.capacity",
          "location": "body"
        },
        {
          "msg": "Invalid vehicle type",
          "param": "vehicle.vehicleType",
          "location": "body"
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - **Description**: An error occurred on the server.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```
