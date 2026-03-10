# Git Branching Strategy

This document describes the Git workflow and branching conventions used in this project.

The goal is to:

- maintain a **clean repository**
- ensure **stable releases**
- provide a **clear development process** for all team members

---

## Branch Structure

| Branch      | Purpose                                                           |
| ----------- | ----------------------------------------------------------------- |
| `main`      | Stable production-ready code                                      |
| `develop`   | Integration branch for combining multiple features before release |
| `feature/*` | Short-lived branches used to implement new features               |
| `bugfix/*`  | Branches used to fix bugs                                         |

## Development flow

feature → develop → main

All new work should start from **`main`** and go through a **Merge Request (MR)** before being merged.

---

## Branch Naming Convention

Branches should follow a clear naming pattern:

```bash
feature/<scope>
bugfix/<scope>
```

## Examples

```bash
feature/login-system
feature/frontend-dashboard
feature/backend-authentication
bugfix/login-error
bugfix/payment-validation
```

---

## Development Workflow

1. Create or assign a **Trello** task.
2. Create a feature branch from `main`.

Example commands:

```bash
git switch main
git pull
git switch -c feature/<feature-name>
```

3. Implement the feature and commit changes.
4. Push the branch to the remote repository.

Example:

```bash
git push -u origin feature/<feature-name>
```

5. Open a **Merge Request**.

Merge flow:

feature/<feature-name> → develop

6. The feature is reviewed and approved before merging.

---

## Merge Request Guidelines

All changes must go through a **Merge Request**.

Before a Merge Request can be approved:

- The project builds successfully
- All tests pass
- No merge conflicts are present
- The code follows the project coding standards
- At least one team member reviews the changes
- The Merge Request must be reviewed and approved

## Approval Policy

To ensure code quality and maintainability:

- Each Merge Request must be approved by at least two team members.
- One of the required approvals must be from **Dimitar Malamski**.
- The second approval must be from **Ayoub Lafhaïlat**.

Small and focused Merge Requests are preferred.

---

## Protected Branches

The following branches are protected:

| Branch    | Rule                |
| --------- | ------------------- |
| `main`    | Merge Requests only |
| `develop` | Merge Requests only |

Direct pushes to these branches are **not allowed**.

---

## Handling Merge Conflicts

Before opening a Merge Request, update your branch with the latest changes from `main`.

Example commands:

```bash
git fetch origin
git merge origin/main
```

Resolve conflicts locally, commit the changes, and push the updated branch.

---

## Team Agreements

- `main` must always remain stable and deployable.
- Every feature must be implemented in its own branch.
- All code changes require a **Merge Request review**.
- Feature branches should be **short-lived**.
- Prefer **small and focused Merge Requests**.

---

## Tools Used

The project uses the following tools:

- **GitHub** – version control and Merge Requests
- **Trello** – task tracking and backlog management
