# Kela-Quiz Upgrade Estimate

## Upgrade Steps and Time Estimates

### 1. Minor and Patch Version Updates of Package Dependencies (Completed)

- Time spent: 2 days

#### Key package updates:

<details>
<summary>View package updated</summary>

| Package                         | Old Version | New Version |
| ------------------------------- | ----------- | ----------- |
| @commitlint/cli                 | 17.4.0      | 17.8.1      |
| @commitlint/config-conventional | 17.4.0      | 17.8.1      |
| @headlessui/react               | 1.6.6       | 1.7.19      |
| @prisma/client                  | 4.9.0       | 4.16.2      |
| @semantic-release/github        | 8.0.7       | 8.1.0       |
| @semantic-release/npm           | 12.0.0      | 12.0.1      |
| @testing-library/cypress        | 8.0.3       | 8.0.7       |
| @testing-library/dom            | 8.17.1      | 8.20.1      |
| @testing-library/jest-dom       | 5.16.5      | 5.17.0      |
| @testing-library/user-event     | 14.4.3      | 14.5.2      |
| @tinymce/tinymce-react          | 4.2.0       | 4.3.2       |
| autoprefixer                    | 10.4.8      | 10.4.20     |
| aws-sdk                         | 2.1630.0    | 2.1691.0    |
| cypress                         | 10.4.0      | 10.11.0     |
| dotenv                          | 16.0.1      | 16.4.5      |
| eslint                          | 8.22.0      | 8.57.1      |
| express                         | 4.19.2      | 4.21.0      |
| highcharts                      | 10.2.1      | 10.3.3      |
| i18next                         | 21.9.1      | 21.10.0     |
| postcss                         | 8.4.38      | 8.4.47      |
| prettier                        | 2.7.1       | 2.8.8       |
| prisma                          | 4.9.0       | 4.16.2      |
| tailwindcss                     | 3.1.8       | 3.4.13      |
| typescript                      | 4.7.4       | 4.9.5       |
| vite                            | 2.9.14      | 2.9.18      |

</details>

### 2. Remix Core Upgrade (3 days)

- Upgrade Remix and related packages to the latest stable version (4 hours)
- Update Remix configuration for new APIs (4 hours)
- Refactor code to use new v2 APIs:
  - Update `CatchBoundary` and `ErrorBoundary` (4 hours)
  - Implement `v2_normalizeFormMethod` changes (3 hours)
  - Update route `meta` API usage (3 hours)
  - Refactor route `headers` API (3 hours)
- Update server module format if necessary (2 hours)
- Implement new route file convention if desired (4 hours)

### 3. Dependency Upgrades (2.5 days)

- Upgrade React and React DOM to v18 (4 hours)
- Update Node.js from version 18 to 20 (4 hours)
- Update other major dependencies:
  - @prisma/client and prisma (3 hours)
  - @testing-library packages (2 hours)
  - eslint and related packages (2 hours)
  - typescript (2 hours)
  - vite and related packages (3 hours)
- Address breaking changes and refactor as needed (8 hours)

### 4. Testing and Debugging (2 days)

- Update and run unit tests (4 hours)
- Update and run integration tests (4 hours)
- Perform manual testing of critical paths (4 hours)
- Debug and fix issues uncovered during testing (8 hours)

## Total Time Estimate

- Completed work: 2 days
- Remaining work: 7.5 days
- Total estimated time: 9.5 days (76 hours)

## Breakdown of Remaining Work

- Remix Core Upgrade: 3 days (27 hours)
- Dependency Upgrades: 2.5 days (20 hours)
- Testing and Debugging: 2 days (20 hours)
