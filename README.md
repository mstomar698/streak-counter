# streak-counter

- Simple npm library which provides api for counter and can be accessed from anywhere.
- This is demo created while learning TDD way of working.

### To Install From NPM

```powershell
yarn add ucounter
# OR
npm install ucounter
```

### Usage

```JS
import { streakCounter } from 'ucounter'

const today = new Date()
const streak = streakCounter(localStorage, today)

// This will return an object with count
```
