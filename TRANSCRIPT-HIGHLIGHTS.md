## Transcript Highlights

### 1. Planning the data model (Session 1, early)
Before writing any code, I asked Claude to help me design the
localStorage schema for my watchlist. We discussed three options
and I chose the simplest one that still supported filtering.

### 2. Debugging the loading state (Session 1, midway)
My movie search showed a flash of "no results" before the data
loaded. The first fix broke the error state. I described both
problems and we found a solution that handled all three states.

### 3. Pushing back on over-engineering (Session 2, near the start)
Claude suggested adding a state management library. I said no —
the app only has one shared state between two components. We
used simpler state instead and it was much cleaner.