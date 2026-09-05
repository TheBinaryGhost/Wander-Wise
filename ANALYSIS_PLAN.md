# WanderWise Fix Plan

## Phase 1: Critical Bugs (P0)

### 1.1 Fix Itinerary Update Crash + Date Validation
**File:** `Backend/services/itinerary.js`
- Line 28: Change `itineraryData.date` → `data.date`
- Lines 18-20: Fix inverted date validation to `data.date < startDate || data.date > endDate`

### 1.2 Fix ProtectedRoutes setState During Render
**File:** `Frontend/wander-wise/src/App.jsx`
- Extract `ProtectedRoutes` to separate component file
- Remove `logout()` from render logic
- Use `useEffect` to redirect when token is null

### 1.3 Protect /users Endpoints
**File:** `Backend/middlewares/auth.js`
- Add `/users` to protected routes list
- Ensure all user-related routes require authentication

---

## Phase 2: Security Issues (P1)

### 2.1 Fix JWT Token Type Confusion
**File:** `Backend/config/jwt.js`
- Add `type` field to JWT payloads
- Verify token type in `verifyAccessToken` (should only accept `access` tokens)
- Reject `invite` tokens in auth middleware

### 2.2 Remove .env from Git
**Files:** `Backend/.env`, `.gitignore`
- Remove `.env` from git tracking
- Add `.env` to `.gitignore`
- Provide `.env.example` template

### 2.3 Change accept-invite to POST
**File:** `Backend/handlers/trip.js`
- Change `GET /:id/invite/accept` → `POST /:id/invite/accept`

### 2.4 Fix Collaborator Email Check
**File:** `Backend/services/trip.js:51`
- Populate collaborators array before checking emails
- Or store email instead of ObjectId in collaborators

---

## Phase 3: Bug Fixes (P2)

### 3.1 Fix response undefined in catch blocks
**Files:** `Frontend/wander-wise/src/pages/trips/Trip.jsx`, `Baggage.jsx`
- Change `response.data.message` → `error.response?.data?.message || error.message`

### 3.2 Allow Collaborator Trip Editing
**File:** `Backend/services/trip.js:38`
- Update `findOneAndUpdate` query to include collaborator check
- Query: `{ _id: id, $or: [{ user: userId }, { collaborators: userId }] }`

### 3.3 Batch User Loading in Dashboard
**File:** `Frontend/wander-wise/src/pages/Dashboard.jsx`
- Create batch endpoint: `GET /users/batch?ids=id1,id2,id3`
- Or add user names to trip responses to avoid extra queries

---

## Phase 4: Code Quality (P3)

### 4.1 Fix Loose Equality
**Files:** Multiple pages
- Change `== 0` → `=== 0` in:
  - `pages/trips/Trip.jsx:40`
  - `pages/baggage/Baggage.jsx`
  - `pages/baggage/BaggageDetails.jsx`
  - `pages/itinerary/Itinerary.jsx`
  - `pages/itinerary/ItineraryDetails.jsx`

### 4.2 Remove Debug UI
**File:** `Frontend/wander-wise/src/components/landingComponents/Features.jsx`
- Remove `age` state and debug console.log
- Clean up the feature display

### 4.3 Fix Placeholder Footer Text
**Files:** Multiple pages
- Remove or replace "Card Footer" placeholder text

---

## Phase 5: Testing & Validation

### 5.1 Test All Fixes
- Test itinerary create/update with date validation
- Test login/logout flow
- Test user CRUD with auth
- Test trip invite flow with POST
- Test dashboard loading

### 5.2 Run Linting
- Run `npm run lint` or equivalent
- Fix any remaining warnings

---

## Questions for User

1. **Batch endpoint for users:** Should I create a new endpoint, or modify existing trip endpoints to populate user names?

2. **Collaborator email check:** The current code stores ObjectIds but checks emails. Should I:
   - Populate the collaborators and check emails (more DB calls)
   - Store emails in the collaborators array (requires migration)
   - Change the frontend to send ObjectIds

3. **.env removal:** Do you have sensitive data in the current `.env` file that needs to be rotated?

4. **Testing:** Should I write unit tests for the fixes, or just verify manually?
