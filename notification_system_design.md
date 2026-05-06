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