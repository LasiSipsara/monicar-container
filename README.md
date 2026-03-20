# Monicar Container

A NestJS-based health monitoring and orchestration service that provides comprehensive health checks for multiple external services including HTTP APIs, Kafka, MongoDB, MySQL, and Redis.

## Description

Monicar Container is a production-ready, containerized health monitoring and orchestration service built with [NestJS](https://nestjs.com). It provides comprehensive health checks and status monitoring for multiple external services in your infrastructure. The library is designed with extensibility in mind, using a pluggable architecture that allows you to easily add new health check strategies for any service type without modifying core code.

### Key Concepts

**What is Monicar?**

Monicar is a health monitoring orchestration framework that acts as a centralized health check aggregator. It monitors the availability, connectivity, and operational status of critical infrastructure services including message brokers (Kafka), databases (MongoDB, MySQL), caching layers (Redis), and HTTP APIs. This enables you to build resilient distributed systems by implementing proactive monitoring and alerting.

**Why Use Monicar?**

- **Centralized Monitoring**: Manage health checks for all critical services from a single endpoint
- **Service Resilience**: Early detection of service failures enables faster failover and recovery
- **Dependency Management**: Understand and track dependencies between services
- **Infrastructure Observability**: Gain insights into your infrastructure health at a glance
- **Automated Health Assessment**: Continuously monitor services without manual intervention

### Core Architecture

Monicar Container uses several design patterns to achieve flexibility and maintainability:

- **Strategy Pattern**: Each service type (HTTP, Kafka, MongoDB, etc.) has a dedicated health check strategy
- **Factory Pattern**: Dynamic instantiation of strategies based on configuration
- **Registry Pattern**: Central registry to manage and access all registered health check strategies
- **Observer Pattern**: Health status updates can trigger notifications and alerts

### Features

- **Multi-Service Health Checks**: Monitor HTTP APIs, Kafka, MongoDB, MySQL, and Redis with type-specific checks
- **Pluggable Architecture**: Add custom health check strategies by implementing the strategy interface
- **Configuration-Driven**: Define health checks through configuration without code changes
- **Factory Pattern**: Automatic strategy instantiation and initialization
- **Service Registry**: Central registry to manage and query all health check strategies
- **Health Runner**: Execute health checks with configurable intervals and timeouts
- **REST API**: Expose comprehensive health status and metrics through HTTP endpoints
- **Error Handling**: Graceful error handling with detailed failure diagnostics
- **Containerized**: Docker-optimized with proper environment variable support
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **E2E Testing**: Complete end-to-end test suite for validation

### Typical Use Cases

1. **Microservices Monitoring**: Monitor health of all microservices and dependencies in a microservices architecture
2. **Infrastructure Health Dashboard**: Create dashboards showing real-time health status of all critical services
3. **Dependency Checker**: Validate that all required services are available before accepting requests
4. **Automated Recovery**: Trigger automated recovery procedures when services become unhealthy
5. **SLA Monitoring**: Track service availability and generate SLA compliance reports
6. **Health Gate**: Implement health gates in CI/CD pipelines to prevent deployments when dependencies are down

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
$ npm install
```

## Running the Application

```bash
# development mode
$ npm run start

# watch mode (with auto-reload)
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker Deployment

Build and run the application in a Docker container:

```bash
# Build the image
$ docker build -t monicar-container .

# Run the container
$ docker run -p 3000:3000 monicar-container
```

## Project Structure

```
src/
├── app.module.ts              # Main application module
├── main.ts                    # Application entry point
└── monicar/
    ├── monicar.controller.ts  # REST API endpoints
    ├── monicar.service.ts     # Business logic
    ├── monicar.factory.ts     # Strategy factory
    ├── monicar.runner.ts      # Health check executor
    ├── monicar.registry.ts    # Strategy registry
    ├── monicar.module.ts      # Monicar module configuration
    ├── interfaces/            # TypeScript interfaces and types
    └── strategies/            # Health check implementations
        ├── http/
        ├── kafka/
        ├── mongodb/
        ├── mysql/
        └── redis/
```

## Supported Health Check Strategies

### HTTP API
- **Purpose**: Monitor HTTP API availability and responsiveness
- **Checks**: Endpoint reachability, response time, HTTP status codes
- **Configuration**: URL, method, timeout, expected status codes
- **Use Cases**: Monitor REST endpoints, microservice availability, external API dependencies

### Kafka
- **Purpose**: Verify Kafka broker connectivity and cluster health
- **Checks**: Broker connectivity, topic availability, producer/consumer functionality
- **Configuration**: Broker addresses, authentication credentials, connection timeout
- **Use Cases**: Message queue health in event-driven architectures, stream processing pipelines

### MongoDB
- **Purpose**: Monitor MongoDB database connectivity and operational status
- **Checks**: Connection pooling, database accessibility, read/write operations
- **Configuration**: Connection string, authentication, timeout settings
- **Use Cases**: Database availability in NoSQL applications, replica set monitoring

### MySQL
- **Purpose**: Assess MySQL database health and availability
- **Checks**: TCP connection, authentication, query execution capabilities
- **Configuration**: Host, port, credentials, database selection
- **Use Cases**: Traditional relational database monitoring, SQL server health checks

### Redis
- **Purpose**: Check Redis cache and in-memory data store health
- **Checks**: Connection establishment, PING response, memory availability
- **Configuration**: Host, port, password, timeout settings
- **Use Cases**: Cache layer monitoring, session storage health, real-time data store availability

## How It Works

1. **Configuration**: Define health check configurations for your services
2. **Factory**: Monicar factory creates appropriate health check strategy instances based on service type
3. **Registration**: Strategies are registered in the central registry for management
4. **Execution**: Health runner executes checks on configured intervals
5. **Aggregation**: Results are aggregated and exposed through REST API endpoints
6. **Monitoring**: External systems can query the health status and take appropriate actions

## Extension Guide

To add a new health check strategy:

1. Implement the `HealthStrategy` interface
2. Create a strategy class that matches the interface requirements
3. Register the strategy in the factory
4. Configure and deploy

The pluggable architecture ensures minimal impact on existing code when adding new service types.

## Advanced Configuration

### Health Observer Options
Configure custom behavior for health checks including:
- Check execution intervals
- Timeout thresholds
- Retry policies
- Notification triggers

### Results Management
Access detailed health check results including:
- Service status (healthy/unhealthy)
- Response times
- Error messages and diagnostics
- Timestamp and execution history

## API Endpoints

The application exposes REST endpoints for querying health status. Key endpoints include:
- `GET /health` - Overall system health
- `GET /health/:service` - Specific service health
- `GET /health/all` - All services health status
- See [monicar.controller.ts](src/monicar/monicar.controller.ts) for complete endpoint documentation

## Configuration Examples

### Environment Variables
```bash
# Service Configuration
MONICAR_HTTP_URL=http://api.example.com/health
MONICAR_KAFKA_BROKERS=localhost:9092
MONICAR_MONGODB_URI=mongodb://localhost:27017/health
MONICAR_MYSQL_HOST=localhost
MONICAR_MYSQL_PORT=3306
MONICAR_REDIS_HOST=localhost
MONICAR_REDIS_PORT=6379

# Health Check Configuration
HEALTH_CHECK_INTERVAL=30000  # milliseconds
HEALTH_CHECK_TIMEOUT=5000    # milliseconds
```

### Service Configuration File
Create a config file to define your health check strategies:
```json
{
  "services": [
    {
      "name": "api-service",
      "type": "http",
      "config": {
        "url": "http://api.example.com/health",
        "method": "GET",
        "timeout": 5000
      }
    },
    {
      "name": "message-broker",
      "type": "kafka",
      "config": {
        "brokers": ["localhost:9092"],
        "timeout": 5000
      }
    },
    {
      "name": "primary-db",
      "type": "mongodb",
      "config": {
        "uri": "mongodb://localhost:27017/myapp",
        "timeout": 5000
      }
    }
  ]
}
```

## Best Practices

1. **Health Check Intervals**: Balance between monitoring responsiveness and system load. Typical values: 15-60 seconds
2. **Timeout Configuration**: Set timeouts appropriate to expected response times. Use 2-3x the normal response time
3. **Failure Handling**: Implement retry logic with exponential backoff for transient failures
4. **Alerting**: Integrate with alerting systems to be notified of service failures
5. **Logging**: Enable comprehensive logging for debugging and audit trails
6. **Security**: Use secure connections (TLS/SSL) for sensitive services
7. **Resource Management**: Monitor Monicar container resource usage to prevent monitoring overhead
8. **Failover Strategy**: Define actions to take when dependencies become unavailable

## Troubleshooting

### Health Check Not Running
- Verify service configuration is correct
- Check network connectivity to target services
- Ensure services are accessible from the monitoring container
- Review logs for specific error messages

### High CPU Usage
- Increase health check intervals to reduce frequency
- Review strategy implementations for inefficiencies
- Check for connection pool exhaustion

### Timeout Errors
- Increase timeout values if services are slow to respond
- Verify network latency to service endpoints
- Check service load and available resources

### Authentication Failures
- Verify credentials in configuration
- Ensure credentials have appropriate permissions
- Check for credential expiration or rotation issues

## Contributing

Contributions are welcome! If you'd like to add support for additional service types or improve existing strategies:

1. Fork the repository
2. Create a feature branch
3. Implement your changes with tests
4. Submit a pull request

## License

This project is licensed under the MIT License.
