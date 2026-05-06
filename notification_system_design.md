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
