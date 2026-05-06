# Stage 1

## System Overview

The Campus Notification System enables students to receive real-time notifications related to:

- Placements
- Results
- Events

The platform supports:
- Real-time notifications
- Priority notifications
- Pagination
- Notification filtering
- Read/unread tracking

---

# REST API Design

## 1. Get All Notifications

### Endpoint

GET /notifications

### Query Parameters

| Parameter | Description |
|---|---|
| page | Pagination page |
| limit | Number of notifications |
| notification_type | Filter notifications |

### Response

```json
{
  "notifications": [
    {
      "id": "1",
      "type": "Placement",
      "message": "Amazon Hiring",
      "isRead": false,
      "createdAt": "2026-04-22T10:00:00Z"
    }
  ]
}
```

---

## 2. Get Notification By ID

### Endpoint

GET /notifications/:id

---

## 3. Mark Notification As Read

### Endpoint

PATCH /notifications/:id/read

### Response

```json
{
  "message": "Notification marked as read"
}
```

---

## 4. Send Notification

### Endpoint

POST /notifications/send

### Request

```json
{
  "studentIds": ["1", "2"],
  "type": "Placement",
  "message": "Microsoft Hiring"
}
```

### Response

```json
{
  "message": "Notification sent successfully"
}
```

---

# Authentication

All APIs use Bearer Token Authentication.

```http
Authorization: Bearer token
```

---

# Real-Time Notification Mechanism

The system uses WebSockets for real-time notification delivery.

Workflow:
1. Frontend establishes WebSocket connection
2. Backend pushes notifications instantly
3. Frontend updates UI dynamically

---

# Logging Strategy

The custom logging middleware is integrated throughout the application.

Example:

```js
Log("backend", "info", "route", "Fetched notifications", token);
```

Logs are maintained for:
- API requests
- Errors
- Authentication
- Database operations
- Notification delivery
