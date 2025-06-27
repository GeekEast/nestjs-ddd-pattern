# Nestjs Domain Driven Design Patterns

## Layered Architecture

Presentation -> Application -> Domain -> Data Access


Presentation Layer:
- Controllers, Resolvers
- DTOs
- Error Handling

Application Layer:
- Services
- Command/Query Handlers
- Workflow Orchestrator
- Transaction Management
- Authentication/Authorization
- Cache

Domain Layer:
- Entity
- Value Object
- Domaine Service
- Aggregates
- Domain Events
- Business Rules

Infrastructure Layer:
- Data Persistency
- Third-Party API
- Config, Logs
- Utils