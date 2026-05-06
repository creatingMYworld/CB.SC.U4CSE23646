# Stage 3

# Database Query Optimization and Performance Improvement

As the Campus Notification System grows, the notifications table can contain millions of records.  
Efficient query optimization is necessary to ensure fast response times and smooth user experience.

The following query retrieves unread notifications for a student.

---

# Existing Query

```sql
SELECT *
FROM notifications
WHERE student_id = 1042
AND read_status = FALSE
ORDER BY created_at ASC;
```

---

# Performance Issues in the Existing Query

The query may become inefficient when the database size increases because:

- the database may scan the complete notifications table
- filtering unread notifications becomes expensive
- sorting records by timestamp increases execution cost
- repeated queries increase database load
- response time increases during peak traffic

Without optimization, the query execution time increases linearly as records grow.

---

# Root Cause of Slow Performance

The primary issue is the absence of a proper indexing strategy.

The query performs three major operations:

1. filtering using `student_id`
2. filtering using `read_status`
3. sorting using `created_at`

If these fields are not indexed together, the database performs unnecessary scans and sorting operations.

---

# Optimization Approach

A composite index is introduced to optimize:
- filtering
- searching
- sorting

The index combines all frequently queried columns into a single optimized structure.

---

# Optimized Composite Index

```sql
CREATE INDEX idx_notifications_student_read_time
ON notifications(student_id, read_status, created_at);
```

---

# Why Composite Indexing Improves Performance

The index directly supports the query conditions.

The database engine can:
- locate matching student records faster
- filter unread notifications efficiently
- avoid expensive sorting operations

This significantly reduces query execution time.

---

# Query Execution Improvement

## Before Optimization

Without indexing:

- full table scan may occur
- sorting is expensive
- query latency increases under heavy traffic

Approximate complexity:

```text
O(n)
```

---

## After Optimization

With composite indexing:

- records are fetched directly
- sorting becomes optimized
- database scans are minimized

Approximate complexity:

```text
O(log n)
```

---

# Improved Query Design

Using `SELECT *` retrieves unnecessary columns and increases memory usage.

A more optimized query is:

```sql
SELECT id, category, content, created_at
FROM notifications
WHERE student_id = 1042
AND read_status = FALSE
ORDER BY created_at ASC;
```

---

# Benefits of the Improved Query

- reduced bandwidth usage
- lower memory consumption
- faster execution
- improved scalability

---

# Additional Performance Enhancements

## 1. Pagination

Instead of loading all notifications simultaneously, records should be loaded in smaller batches.

Example:

```http
GET /notifications?page=1&limit=20
```

### Advantages

- prevents large responses
- reduces backend load
- improves frontend rendering performance

---

## 2. Redis Caching

Frequently accessed unread notifications can be stored temporarily in Redis.

### Advantages

- reduces repeated database queries
- improves API response speed
- decreases database workload

---

## 3. Database Partitioning

The notifications table can be partitioned using:
- month
- year
- notification category

### Advantages

- smaller query search scope
- faster query execution
- easier maintenance

---

## 4. Read Replica Architecture

Read-heavy operations can be distributed across multiple database replicas.

### Advantages

- improved availability
- reduced load on primary database
- better concurrent performance

---

# Risks of Excessive Indexing

Although indexes improve read performance, excessive indexing introduces disadvantages.

Potential drawbacks include:
- increased storage consumption
- slower insert operations
- slower update operations
- additional maintenance overhead

Therefore, indexes should only be created for frequently used queries.

---

# Optimized Query for Placement Notifications

The following query retrieves students who received placement notifications within the last seven days.

```sql
SELECT DISTINCT student_id
FROM notifications
WHERE category = 'Placement'
AND created_at >= NOW() - INTERVAL '7 days';
```

This query helps identify recently notified students efficiently.

---

# Logging Integration

All database optimization activities are monitored using the custom logging middleware.

Example:

```js
Log(
  "backend",
  "info",
  "db",
  "Optimized unread notification query executed successfully",
  token
);
```

The logging system helps track:
- slow queries
- database bottlenecks
- query execution failures
- performance improvements
- optimization effectiveness


# Stage 3

# Database Query Optimization and Performance Improvement

As the Campus Notification System grows, the notifications table can contain millions of records.  
Efficient query optimization is necessary to ensure fast response times and smooth user experience.

The following query retrieves unread notifications for a student.

---

# Existing Query

```sql
SELECT *
FROM notifications
WHERE student_id = 1042
AND read_status = FALSE
ORDER BY created_at ASC;
```

---

# Performance Issues in the Existing Query

The query may become inefficient when the database size increases because:

- the database may scan the complete notifications table
- filtering unread notifications becomes expensive
- sorting records by timestamp increases execution cost
- repeated queries increase database load
- response time increases during peak traffic

Without optimization, the query execution time increases linearly as records grow.

---

# Root Cause of Slow Performance

The primary issue is the absence of a proper indexing strategy.

The query performs three major operations:

1. filtering using `student_id`
2. filtering using `read_status`
3. sorting using `created_at`

If these fields are not indexed together, the database performs unnecessary scans and sorting operations.

---

# Optimization Approach

A composite index is introduced to optimize:
- filtering
- searching
- sorting

The index combines all frequently queried columns into a single optimized structure.

---

# Optimized Composite Index

```sql
CREATE INDEX idx_notifications_student_read_time
ON notifications(student_id, read_status, created_at);
```

---

# Why Composite Indexing Improves Performance

The index directly supports the query conditions.

The database engine can:
- locate matching student records faster
- filter unread notifications efficiently
- avoid expensive sorting operations

This significantly reduces query execution time.

---

# Query Execution Improvement

## Before Optimization

Without indexing:

- full table scan may occur
- sorting is expensive
- query latency increases under heavy traffic

Approximate complexity:

```text
O(n)
```

---

## After Optimization

With composite indexing:

- records are fetched directly
- sorting becomes optimized
- database scans are minimized

Approximate complexity:

```text
O(log n)
```

---

# Improved Query Design

Using `SELECT *` retrieves unnecessary columns and increases memory usage.

A more optimized query is:

```sql
SELECT id, category, content, created_at
FROM notifications
WHERE student_id = 1042
AND read_status = FALSE
ORDER BY created_at ASC;
```

---

# Benefits of the Improved Query

- reduced bandwidth usage
- lower memory consumption
- faster execution
- improved scalability

---

# Additional Performance Enhancements

## 1. Pagination

Instead of loading all notifications simultaneously, records should be loaded in smaller batches.

Example:

```http
GET /notifications?page=1&limit=20
```

### Advantages

- prevents large responses
- reduces backend load
- improves frontend rendering performance

---

## 2. Redis Caching

Frequently accessed unread notifications can be stored temporarily in Redis.

### Advantages

- reduces repeated database queries
- improves API response speed
- decreases database workload

---

## 3. Database Partitioning

The notifications table can be partitioned using:
- month
- year
- notification category

### Advantages

- smaller query search scope
- faster query execution
- easier maintenance

---

## 4. Read Replica Architecture

Read-heavy operations can be distributed across multiple database replicas.

### Advantages

- improved availability
- reduced load on primary database
- better concurrent performance

---

# Risks of Excessive Indexing

Although indexes improve read performance, excessive indexing introduces disadvantages.

Potential drawbacks include:
- increased storage consumption
- slower insert operations
- slower update operations
- additional maintenance overhead

Therefore, indexes should only be created for frequently used queries.

---

# Optimized Query for Placement Notifications

The following query retrieves students who received placement notifications within the last seven days.

```sql
SELECT DISTINCT student_id
FROM notifications
WHERE category = 'Placement'
AND created_at >= NOW() - INTERVAL '7 days';
```

This query helps identify recently notified students efficiently.

---

# Logging Integration

All database optimization activities are monitored using the custom logging middleware.

Example:

```js
Log(
  "backend",
  "info",
  "db",
  "Optimized unread notification query executed successfully",
  token
);
```

The logging system helps track:
- slow queries
- database bottlenecks
- query execution failures
- performance improvements
- optimization effectiveness

# Stage 4

# System Scalability and High Traffic Optimization

As the Campus Notification System grows, thousands of students may access notifications simultaneously.  
If every request directly queries the database, the backend can experience high latency, heavy load, and reduced performance.

To maintain fast response times and system reliability, the architecture must be optimized for scalability.

---

# Existing Request Flow

Current flow:

```text
Frontend → Backend API → Database
```

Problem:
- every request directly accesses the database
- repeated queries increase database load
- response time becomes slower during peak traffic
- database becomes a bottleneck under heavy usage

---

# Scalability Goals

The system should:
- support large numbers of concurrent users
- reduce unnecessary database queries
- improve response speed
- maintain high availability
- support real-time notification delivery

---

# Optimized Architecture

Improved scalable architecture:

```text
Frontend
   ↓
Load Balancer
   ↓
Backend Servers
   ↓
Redis Cache
   ↓
PostgreSQL Database
```

---

# 1. Redis Caching Strategy

Redis is introduced between the backend and database.

Frequently accessed notifications are temporarily stored in cache.

---

## How Redis Improves Performance

When a user requests notifications:

### Cache Hit
- data is returned directly from Redis
- database query is avoided

### Cache Miss
- backend fetches data from PostgreSQL
- response is stored in Redis
- future requests become faster

---

## Benefits of Redis

- reduces database load
- improves API response speed
- minimizes repeated queries
- improves scalability during peak traffic

---

# 2. Pagination Strategy

Loading all notifications simultaneously increases:
- response size
- memory usage
- frontend rendering time

Instead, notifications should be loaded in smaller batches.

---

## Example API

```http
GET /notifications?page=1&limit=20
```

---

## Benefits of Pagination

- smaller API responses
- lower backend processing
- improved frontend performance
- reduced bandwidth usage

---

# 3. Lazy Loading

Notifications should load gradually while scrolling.

Instead of loading thousands of records immediately:
- initial notifications are displayed first
- additional notifications load dynamically

---

## Benefits of Lazy Loading

- faster initial page load
- improved user experience
- lower memory consumption

---

# 4. WebSocket-Based Real-Time Updates

Polling the backend repeatedly increases unnecessary traffic.

Instead, WebSockets provide real-time notification delivery.

---

## WebSocket Workflow

1. frontend establishes persistent connection
2. backend pushes new notifications instantly
3. frontend updates automatically without refresh

---

## Benefits of WebSockets

- real-time updates
- reduced repeated API requests
- lower server overhead
- better user experience

---

# 5. Read Replica Architecture

The primary database can become overloaded by read-heavy traffic.

Read replicas distribute notification fetch requests across multiple database instances.

---

## Benefits of Read Replicas

- reduced load on primary database
- improved query performance
- higher availability
- better concurrent request handling

---

# 6. Load Balancer Integration

Multiple backend servers can be deployed behind a load balancer.

The load balancer distributes incoming traffic evenly across servers.

---

## Benefits of Load Balancing

- prevents server overload
- improves fault tolerance
- supports horizontal scaling
- increases system reliability

---

# 7. CDN for Frontend Assets

Frontend static assets such as:
- JavaScript files
- CSS files
- images

can be served through a CDN.

---

## Benefits of CDN Usage

- faster asset delivery
- reduced backend bandwidth usage
- improved frontend loading speed

---

# Failure Handling Strategy

The system should gracefully handle:
- cache failures
- database downtime
- high traffic spikes
- network interruptions

Fallback strategy:

```text
Redis unavailable → Direct database query
```

This ensures uninterrupted notification access.

---

# Monitoring and Performance Tracking

Performance metrics should be continuously monitored.

Important metrics:
- API response time
- cache hit ratio
- database latency
- concurrent user count
- server CPU and memory usage

---

# Logging Integration

Scalability-related operations are monitored using the custom logging middleware.

Example:

```js
Log(
  "backend",
  "info",
  "service",
  "Notifications served from Redis cache",
  token
);
```

Logging helps identify:
- traffic bottlenecks
- slow API responses
- cache failures
- scaling issues
- backend performance problems

---

# Final Outcome

By integrating:
- Redis caching
- pagination
- lazy loading
- WebSockets
- load balancing
- read replicas

the Campus Notification System becomes:
- scalable
- responsive
- fault tolerant
- capable of handling high concurrent traffic efficiently


# Stage 5

# High-Volume Notification Processing Architecture

The Campus Notification System must support scenarios where notifications are delivered to thousands of students at the same time.  
A simple synchronous implementation is not suitable for large-scale notification delivery because it creates delays, increases failure risk, and reduces overall system reliability.

---

# Existing Notification Flow

```python
function notify_all(student_ids, message):

    for student_id in student_ids:

        send_email(student_id, message)

        save_notification(student_id, message)

        send_push_notification(student_id, message)
```

---

# Limitations of the Existing Design

The current implementation introduces several scalability and reliability problems.

---

## 1. Sequential Execution

Notifications are processed one after another.

Impact:
- delivery becomes slow
- overall execution time increases
- server resources remain occupied for long periods

For large batches, the system cannot scale efficiently.

---

## 2. Request Blocking

The API request waits until:
- email delivery completes
- database insertion completes
- push notification delivery completes

Problems:
- increased API response time
- higher timeout probability
- poor user experience

---

## 3. Failure Propagation

If one operation fails:
- remaining notifications may stop processing
- notification consistency becomes unreliable

Example:
- email service fails after processing 200 users
- remaining students never receive notifications

---

## 4. Tight Dependency Between Services

Database operations and external notification services are tightly connected.

This increases:
- system coupling
- failure impact
- recovery difficulty

---

## 5. Limited Throughput

Processing thousands of students synchronously creates:
- server overload
- slow performance
- reduced scalability

---

# Improved Scalable Architecture

To improve reliability and scalability, an asynchronous queue-based architecture is introduced.

---

# Optimized Processing Flow

```text
Administrator Request
          ↓
Notification API
          ↓
Queue System
          ↓
Background Workers
 ┌─────────────┬─────────────┬─────────────┐
 ↓             ↓             ↓
Database     Email Service   Push Service
```

---

# Queue-Based Asynchronous Processing

Instead of processing notifications immediately:
- tasks are added to a message queue
- worker services process them independently

Suitable technologies:
- RabbitMQ
- Apache Kafka
- AWS SQS

---

# Advantages of Queue Processing

## Faster API Response

The backend only accepts the request and pushes jobs into the queue.

Example response:

```json
{
  "message": "Notification request queued successfully"
}
```

Benefits:
- lower response latency
- reduced request blocking
- improved frontend responsiveness

---

## Improved Scalability

Multiple workers can process jobs simultaneously.

Benefits:
- higher throughput
- better concurrent processing
- faster bulk delivery

---

## Fault Isolation

Failure in one worker does not stop the entire system.

Benefits:
- reliable delivery
- improved fault tolerance
- isolated service failures

---

# Recommended Processing Order

## Step 1: Store Notifications in Database

Notifications should first be persisted in the database.

Reason:
- guarantees data durability
- prevents notification loss
- supports recovery and retries

---

## Step 2: Publish Delivery Jobs to Queue

After successful database insertion:
- email tasks are queued
- push notification tasks are queued

This separates persistence from delivery execution.

---

# Why Database Persistence Comes First

If external delivery succeeds before database storage:
- notification history becomes inconsistent

If the notification is already stored:
- failed deliveries can be retried safely

Therefore, persistence must happen before external processing.

---

# Retry Strategy

Worker services should automatically retry failed jobs.

Possible failure scenarios:
- temporary email API downtime
- network interruptions
- third-party service throttling

Recommended retry approach:
- exponential backoff
- retry count limit
- delayed retries

---

# Dead Letter Queue (DLQ)

Jobs that fail repeatedly are moved into a Dead Letter Queue.

Benefits:
- prevents endless retry loops
- allows manual debugging
- improves monitoring and recovery

---

# Parallel Worker Execution

Workers can process notification batches concurrently.

Example:

```text
Worker A → Batch 1
Worker B → Batch 2
Worker C → Batch 3
```

Benefits:
- improved delivery speed
- efficient resource utilization
- horizontal scalability

---

# Optimized Notification Pseudocode

```python
function notify_all(student_ids, message):

    saved_notifications = []

    for student_id in student_ids:

        notification = save_to_database(
            student_id,
            message
        )

        saved_notifications.append(notification)

    for notification in saved_notifications:

        queue.publish({
            "notification_id": notification.id
        })

    return {
        "message": "Bulk notifications queued successfully"
    }
```

---

# Worker Service Logic

```python
process_worker():

    while true:

        task = queue.consume()

        send_email(task.notification_id)

        send_push_notification(task.notification_id)
```

---

# Additional Performance Improvements

## 1. Batch-Based Processing

Large notification sets should be divided into smaller chunks.

Example:
- 500 or 1000 users per batch

Benefits:
- lower memory consumption
- better worker efficiency
- stable processing

---

## 2. Rate Limiting

External email providers may enforce API limits.

Rate limiting prevents:
- request rejection
- service throttling
- delivery failures

---

## 3. Real-Time Monitoring

The system should monitor:
- queue size
- worker health
- retry count
- failed jobs
- delivery success rate

This improves operational visibility and debugging.

---

# Logging Integration

Queue and delivery operations are tracked using the custom logging middleware.

Example:

```js
Log(
  "backend",
  "info",
  "service",
  "Notification batch added to processing queue",
  token
);
```

Additional logs help monitor:
- worker crashes
- retry attempts
- email delivery failures
- queue processing performance

---

# Final Architecture Outcome

By introducing:
- asynchronous queues
- worker-based execution
- retry handling
- dead letter queues
- parallel processing

the notification platform becomes:
- scalable
- resilient
- fault tolerant
- capable of handling very high notification traffic 


# Stage 6

# Priority Notification System

To improve user experience, a Priority Inbox mechanism was implemented to display the most important unread notifications first. The system ranks notifications using a weighted scoring algorithm based on notification category and recency.

---

# Objective

The goal of this stage is to:
- identify the most important notifications
- improve notification visibility
- reduce information overload
- ensure students see critical updates immediately

---

# Notification Types

The Notification API provides three categories:

| Notification Type | Priority Level |
|-------------------|----------------|
| Placement         | Highest        |
| Result            | Medium         |
| Event             | Lowest         |

Placement notifications are treated as the highest priority because they directly affect student career opportunities.

---

# Priority Scoring Algorithm

Each notification is assigned a weighted score.

## Type-Based Weight

| Type       | Weight |
|------------|--------|
| Placement  | 30     |
| Result     | 20     |
| Event      | 10     |

---

# Recency-Based Scoring

Recent notifications receive additional score boosts.

Formula used:

```text
Priority Score =
Type Weight + Recency Score
```

Recency score decreases gradually as notifications become older.

This ensures:
- important notifications remain visible
- recent notifications appear before outdated ones

---

# Processing Flow

```text
Fetch Notifications
        ↓
Calculate Priority Score
        ↓
Sort Notifications
        ↓
Select Top 10
        ↓
Display Priority Inbox
```

---

# Notification Fetching

Notifications are fetched securely from the protected Notification API using Bearer Token authentication.

API Used:

```http
GET /evaluation-service/notifications
```

Authorization Header:

```text
Authorization: Bearer <access_token>
```

---

# Sorting Strategy

Notifications are sorted in descending order based on:
1. notification type weight
2. recency score

The highest scored notifications are displayed first.

---

# Top 10 Selection

After sorting:
- only the top 10 notifications are selected
- reduces UI clutter
- improves frontend rendering performance
- improves user readability

---

# Scalability Considerations

The solution was designed to scale efficiently for large notification volumes.

## Optimizations

### 1. Lightweight In-Memory Processing

Priority calculations are performed in memory without modifying database records.

Benefits:
- reduced database load
- faster execution
- lower query complexity

---

### 2. Efficient Sorting

Sorting complexity:

```text
O(n log n)
```

This provides efficient ranking even for large datasets.

---

### 3. API-Based Architecture

Notifications are fetched dynamically using APIs instead of hardcoded records.

Benefits:
- real-time updates
- easier maintenance
- improved extensibility

---

# Logging Middleware Integration

The custom logging middleware is integrated to track:
- notification fetch operations
- ranking execution
- API failures
- processing status

Example:

```javascript
Log(
  "backend",
  "info",
  "service",
  "Priority notifications calculated successfully",
  token
);
```

---

# Output

The implementation successfully:
- fetched notifications from the API
- calculated priority scores
- ranked notifications dynamically
- displayed the top 10 highest priority notifications

The generated output demonstrates proper prioritization and ranking based on both notification importance and recency

# Stage 7 — Frontend Notification Dashboard

## Objective

Implemented a React frontend dashboard to display campus notifications dynamically.

## Features Implemented

- React frontend using Vite
- Notification cards UI
- Dynamic rendering using React state
- Axios API integration
- Responsive layout
- Notification timestamp display

## Folder Structure

src/
├── components/
├── pages/
├── services/
├── utils/

## Frontend Workflow

1. React application loads
2. API request is sent
3. Notifications are fetched
4. State updates dynamically
5. Notification cards render on screen

## Benefits

- clean user interface
- reusable component structure
- scalable frontend architecture
- improved user experience
- easy API integration