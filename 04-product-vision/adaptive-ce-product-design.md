# Adaptive CE Platform -- Product Design Document

**Platform:** Pulse CE by MedEdPrep
**Stack:** Node.js/Express backend, React frontend, PostgreSQL via Prisma ORM
**Accreditation:** CAPCE organizational accreditation (self-accrediting authority)
**Date:** 2026-05-21

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Prisma Schema](#2-prisma-schema)
3. [Flow 1: Assessment-Only CE (Pathway 1)](#3-flow-1-assessment-only-ce-pathway-1)
4. [Flow 2: Content CE with Post-Test (Pathway 2)](#4-flow-2-content-ce-with-post-test-pathway-2)
5. [Flow 3: Combined Pathway (Pathway 3)](#5-flow-3-combined-pathway-pathway-3)
6. [Flow 4: Agency Bulk Enrollment](#6-flow-4-agency-bulk-enrollment)
7. [Flow 5: Individual B2C Purchase](#7-flow-5-individual-b2c-purchase)
8. [Cross-Cutting Concerns](#8-cross-cutting-concerns)

---

## 1. Architecture Overview

### Three-Pathway Model

Richard's three-pathway model defines the entire CE delivery structure:

| Pathway | Format | Questions | Duration | CEH |
|---------|--------|-----------|----------|-----|
| 1 -- Adaptive Competency Exam | Assessment-only | 15-45 adaptive | 15-60 min | 0.5 or 1.0 |
| 2 -- CE Content Resources | Video/reading + post-test | 15 fixed post-test | 30-90 min | 0.5 or 1.0 |
| 3 -- Combined | Both pathways in any order | Both question sets | 60-150 min | 1.0-2.0 |

### Dual Format

- **Quick (0.5 CEH):** 15-20 questions + 15-20 min content. Narrow objectives (e.g., "Pediatric Chest Trauma"). On-shift friendly.
- **Full (1.0 CEH):** 45 questions + 45 min content. Comprehensive domain (e.g., "Pediatric Trauma"). Dedicated study time.

### CAPCE Compliance Constants

```
PASSING_SCORE = 70           // Percentage, industry standard
MIN_CEH = 0.25               // 15 minutes, CAPCE minimum
CHARS_PER_HALF_CEH = 7500    // ~7,500 characters = 0.5 CEH (assessment-only)
CHARS_PER_CEH = 15000        // ~15,000 characters = 1.0 CEH
CAPCE_FEE_PER_CERT = 0.31   // $0.31 per certification issued (2025 CAPCE rate)
CEH_INCREMENT = 0.5          // CEH awarded in 0.5-hour increments
```

### Four-Standard Mapping

Every CE activity maps to all four national standards (no competitor does this):
- **NES** -- National Education Standards
- **NSOP** -- National Scope of Practice
- **NMG** -- National Model Guidelines
- **NCCP** -- National Continued Competency Program

---

## 2. Prisma Schema

The schema below extends the existing mededprep-ce schema. New models are prefixed with context comments. The existing `Student`, `Organization`, `Certificate`, and `AuditLog` models are reused and extended where noted.

### Enums

```prisma
enum PathwayType {
  ASSESSMENT_ONLY    // Pathway 1
  CONTENT_POSTTEST   // Pathway 2
  COMBINED           // Pathway 3
}

enum CehFormat {
  QUICK              // 0.5 CEH
  FULL               // 1.0 CEH
}

enum ContentType {
  VIDEO
  READING
}

enum EnrollmentStatus {
  PURCHASED
  ACTIVE
  COMPLETED
  FAILED
  EXPIRED
}

enum AttemptStatus {
  IN_PROGRESS
  PASSED
  FAILED
  ABANDONED
  TIMED_OUT
}

enum RemediationStatus {
  RATIONALE_SHOWN
  FOLLOWUP_CORRECT
  FOLLOWUP_INCORRECT
}

enum ContentProgressStatus {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
}

enum CAPCEReportStatus {
  PENDING
  SUBMITTED
  CONFIRMED
  FAILED
  RETRYING
}

enum AgencyInviteStatus {
  PENDING
  ACCEPTED
  EXPIRED
  REVOKED
}

enum SeatStatus {
  AVAILABLE
  ASSIGNED
  IN_PROGRESS
  COMPLETED
  EXPIRED
}

enum PaymentStatus {
  PENDING
  COMPLETED
  REFUNDED
  FAILED
}
```

### Course & Topic Structure

```prisma
// A CE topic is the atomic unit of content (e.g., "Pediatric Trauma")
// Each topic can be delivered through any of the three pathways
model CeTopic {
  id              String       @id @default(cuid())
  slug            String       @unique
  title           String                          // "Pediatric Trauma"
  description     String?
  category        String                          // NCCP domain: "Medical", "Trauma", etc.
  certLevel       String       @default("ALL")    // EMT, AEMT, PARAMEDIC, ALL
  imageUrl        String?

  // Four-standard mapping (Richard's innovation)
  nesStandards    String[]     @default([])       // NES references
  nsopStandards   String[]     @default([])       // NSOP references
  nmgStandards    String[]     @default([])       // NMG references
  nccpDomains     String[]     @default([])       // NCCP domain/competency codes

  // Learning objectives (CAPCE requirement: every item must map to a stated LO)
  learningObjectives Json                         // Array of { id, text, bloomsLevel }

  isActive        Boolean      @default(true)
  publishedAt     DateTime?
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  activities      CeActivity[]
  items           CeItem[]

  @@index([category])
  @@index([certLevel])
  @@index([isActive, publishedAt])
}

// A CE activity is a specific deliverable: one topic + one pathway + one format
// Example: "Pediatric Trauma" + Pathway 1 + Full = 1.0 CEH adaptive exam
model CeActivity {
  id              String       @id @default(cuid())
  topicId         String
  pathway         PathwayType
  cehFormat       CehFormat
  ceHours         Decimal      @db.Decimal(3, 2)  // 0.50 or 1.00
  
  // CAPCE activity metadata
  activityNumber  String       @unique            // CAPCE activity number (assigned post-accreditation)
  title           String                          // Display title for catalog
  description     String?
  
  // Assessment configuration (Pathway 1 and 3)
  questionCount   Int?                            // 15-20 (quick) or 45 (full)
  timeLimitMinutes Int?                           // Enforced timer
  passingScore    Int          @default(70)       // Percentage
  
  // Content configuration (Pathway 2 and 3)
  contentType     ContentType?
  contentUrl      String?                         // Video URL or reading content URL
  contentDurationMinutes Int?                     // 15-20 (quick) or 45 (full)
  contentCharCount Int?                           // For reading: character count (CAPCE formula)
  contentMinTimeSeconds Int?                      // Minimum time enforcement
  
  // Post-test configuration (Pathway 2 and 3)
  postTestQuestionCount Int?   @default(15)
  postTestTimeLimitMinutes Int?
  postTestPassingScore Int?    @default(70)

  // Pricing
  priceIndividual Decimal?     @db.Decimal(8, 2)  // B2C price
  priceAgencyPerSeat Decimal?  @db.Decimal(8, 2)  // B2B per-seat price

  // SME / compliance
  smeReviewerId   String?                         // FK to internal user who reviewed
  smeReviewDate   DateTime?
  coiDisclosure   String?                         // Conflict of interest statement (CAPCE req)
  medicalDirector String?                         // Name of medical director reviewer

  isActive        Boolean      @default(true)
  publishedAt     DateTime?
  retiredAt       DateTime?
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  topic           CeTopic      @relation(fields: [topicId], references: [id])
  enrollments     CeEnrollment[]
  agencyCourseAssignments AgencyCourseAssignment[]

  @@unique([topicId, pathway, cehFormat])
  @@index([pathway])
  @@index([isActive, publishedAt])
  @@index([topicId])
}
```

### Item Bank

```prisma
// CE-specific item bank, separate from mededprep-c test prep items
// Items are calibrated against CE provider population (not students)
model CeItem {
  id              String       @id @default(cuid())
  topicId         String
  
  // Question content
  stem            String                          // Question text
  questionType    String       @default("MCQ")    // MCQ, MSQ, etc.
  options         Json                            // Array of { id, text, isCorrect }
  rationale       String                          // Shown on wrong answer (remediation loop)
  rationaleCharCount Int                          // Counts toward CEH character total
  
  // Learning objective mapping (CAPCE requirement)
  learningObjectiveIds String[] @default([])      // Maps to CeTopic.learningObjectives[].id
  
  // Four-standard mapping
  nesReference    String?
  nsopReference   String?
  nmgReference    String?
  nccpDomain      String?
  
  // Bloom's taxonomy level
  bloomsLevel     String?                         // Remember, Understand, Apply, Analyze, Evaluate, Create
  
  // IRT parameters (calibrated from CE population responses)
  irtDifficulty   Float?                          // b parameter
  irtDiscrimination Float?                        // a parameter
  irtGuessing     Float?                          // c parameter (3PL)
  calibrationN    Int          @default(0)        // Number of responses used for calibration
  lastCalibratedAt DateTime?
  
  // Classical test theory (pre-IRT or supplementary)
  difficultyIndex Float?                          // p-value (proportion correct)
  discriminationIndex Float?                      // Point-biserial correlation
  
  isActive        Boolean      @default(true)
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  
  topic           CeTopic      @relation(fields: [topicId], references: [id])
  responses       CeItemResponse[]
  remediations    CeRemediation[]

  @@index([topicId, isActive])
  @@index([topicId, irtDifficulty])
  @@index([bloomsLevel])
}
```

### Enrollment & Attempt Tracking

```prisma
// An enrollment represents a learner's access to a specific CE activity
model CeEnrollment {
  id              String           @id @default(cuid())
  studentId       String
  activityId      String
  agencySeatId    String?                         // If enrolled via agency seat allocation
  
  status          EnrollmentStatus @default(PURCHASED)
  purchasedAt     DateTime         @default(now())
  activatedAt     DateTime?
  completedAt     DateTime?
  expiresAt       DateTime?                       // Optional: agency-set deadline
  
  // Pathway 3 tracking: which sub-pathways are done
  assessmentCompleted Boolean      @default(false)
  contentCompleted    Boolean      @default(false)
  
  // Payment reference
  paymentId       String?
  
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  student         Student          @relation(fields: [studentId], references: [id])
  activity        CeActivity       @relation(fields: [activityId], references: [id])
  agencySeat      AgencySeat?      @relation(fields: [agencySeatId], references: [id])
  attempts        CeAttempt[]
  contentProgress CeContentProgress?
  certificate     CeCertificate?
  payment         CePayment?       @relation(fields: [paymentId], references: [id])

  @@unique([studentId, activityId])
  @@index([studentId, status])
  @@index([activityId])
  @@index([agencySeatId])
}

// Each exam attempt (Pathway 1 assessment, Pathway 2 post-test, or Pathway 3 either)
model CeAttempt {
  id              String        @id @default(cuid())
  enrollmentId    String
  attemptNumber   Int                              // Sequential per enrollment
  attemptType     String                           // "ASSESSMENT" or "POST_TEST"
  
  // Adaptive engine state
  currentTheta    Float         @default(0.0)      // IRT ability estimate
  thetaStdError   Float?                           // Standard error of theta
  
  // Scoring
  totalQuestions  Int            @default(0)
  totalCorrect   Int            @default(0)
  totalIncorrect Int            @default(0)
  scorePercentage Decimal?      @db.Decimal(5, 2)
  
  // Character count tracking (for CAPCE CEH calculation)
  totalCharactersPresented Int  @default(0)        // Stems + options + rationales viewed
  
  // Timer enforcement (CAPCE requirement)
  timeLimitSeconds Int                             // From activity config
  startedAt       DateTime      @default(now())
  finishedAt      DateTime?
  totalTimeSeconds Int?                            // Actual time spent
  
  status          AttemptStatus  @default(IN_PROGRESS)
  
  // Remediation loop stats
  remediationCount Int          @default(0)        // How many remediation loops triggered
  remediationCorrect Int        @default(0)        // Follow-ups answered correctly
  
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  enrollment      CeEnrollment  @relation(fields: [enrollmentId], references: [id])
  responses       CeItemResponse[]
  remediations    CeRemediation[]

  @@index([enrollmentId, attemptType])
  @@index([status])
}

// Individual item response within an attempt
model CeItemResponse {
  id              String       @id @default(cuid())
  attemptId       String
  itemId          String
  sequenceNumber  Int                              // Position in exam
  
  // Response data
  selectedOption  String                           // Option ID selected
  isCorrect       Boolean
  
  // Timing
  presentedAt     DateTime     @default(now())
  answeredAt      DateTime?
  timeSpentMs     Int?                             // Milliseconds on this question
  
  // IRT state at time of response
  thetaBeforeResponse Float?
  thetaAfterResponse  Float?
  itemInformation     Float?                       // Fisher information at current theta
  
  createdAt       DateTime     @default(now())

  attempt         CeAttempt    @relation(fields: [attemptId], references: [id], onDelete: Cascade)
  item            CeItem       @relation(fields: [itemId], references: [id])

  @@unique([attemptId, sequenceNumber])
  @@index([attemptId])
  @@index([itemId])
}

// Remediation loop: triggered on wrong answer
model CeRemediation {
  id              String             @id @default(cuid())
  attemptId       String
  triggerItemId   String                           // The item answered incorrectly
  triggerResponseId String?                        // FK to the wrong response
  
  // Rationale engagement
  rationaleShownAt DateTime         @default(now())
  rationaleReadMs  Int?                            // Time spent reading rationale
  rationaleCharCount Int                           // Characters in the rationale (counts toward CEH)
  
  // Follow-up verification question
  followUpItemId   String?                         // Similar (not identical) item
  followUpCorrect  Boolean?
  followUpAnsweredAt DateTime?
  followUpTimeMs   Int?
  
  status           RemediationStatus @default(RATIONALE_SHOWN)
  
  createdAt        DateTime          @default(now())

  attempt          CeAttempt    @relation(fields: [attemptId], references: [id], onDelete: Cascade)
  triggerItem      CeItem       @relation(fields: [triggerItemId], references: [id])

  @@index([attemptId])
  @@index([triggerItemId])
}
```

### Content Progress (Pathway 2 and 3)

```prisma
// Tracks content consumption with CAPCE-compliant timer enforcement
model CeContentProgress {
  id              String                @id @default(cuid())
  enrollmentId    String                @unique
  
  contentType     ContentType
  
  // Timer enforcement
  startedAt       DateTime?
  completedAt     DateTime?
  totalTimeSeconds Int                  @default(0) // Accumulated active time
  requiredTimeSeconds Int                           // Minimum time per CAPCE (content duration)
  
  // Video-specific tracking
  videoProgressPercent Decimal?         @db.Decimal(5, 2) // 0.00-100.00
  videoLastPosition    Int?                         // Seconds into video
  videoSegmentsWatched Json?                        // Array of { start, end } ranges
  
  // Reading-specific tracking
  readingCharCount     Int?                         // Total characters in reading
  readingScrollDepth   Decimal?         @db.Decimal(5, 2) // 0.00-100.00
  readingActiveTimeMs  Int?                         // Active reading time (not idle)
  
  // Idle detection
  lastActivityAt       DateTime?
  idleWarningCount     Int              @default(0) // Times idle warning shown
  
  status               ContentProgressStatus @default(NOT_STARTED)
  
  createdAt            DateTime         @default(now())
  updatedAt            DateTime         @updatedAt

  enrollment           CeEnrollment    @relation(fields: [enrollmentId], references: [id])

  @@index([status])
}
```

### Certificate & CAPCE Reporting

```prisma
// CE-specific certificate (extends pattern from existing Certificate model)
model CeCertificate {
  id              String       @id @default(cuid())
  enrollmentId    String       @unique
  hash            String       @unique @default(cuid()) // QR code verification
  
  // Immutable snapshot at time of generation
  studentName     String
  studentNremtId  String?
  studentLicenseNumber String?
  studentLicenseState  String?
  
  activityTitle   String
  activityNumber  String                           // CAPCE activity number
  pathway         PathwayType
  ceHours         Decimal      @db.Decimal(3, 2)
  cehFormat       CehFormat
  
  // Performance snapshot
  assessmentScore Decimal?     @db.Decimal(5, 2)   // Pathway 1/3 exam score
  postTestScore   Decimal?     @db.Decimal(5, 2)   // Pathway 2/3 post-test score
  
  // Four-standard mapping snapshot
  nccpDomains     String[]     @default([])
  nesStandards    String[]     @default([])
  nsopStandards   String[]     @default([])
  nmgStandards    String[]     @default([])
  
  // Compliance data
  completedAt     DateTime
  issuedAt        DateTime     @default(now())
  totalTimeMinutes Int                              // Actual time spent
  
  // PDF
  pdfUrl          String?
  pdfGeneratedAt  DateTime?
  
  // CAPCE reporting
  capceReportId   String?
  
  // Revocation
  revokedAt       DateTime?
  revokedReason   String?
  revokedById     String?
  
  createdAt       DateTime     @default(now())

  enrollment      CeEnrollment @relation(fields: [enrollmentId], references: [id])
  capceReport     CAPCEReport? @relation(fields: [capceReportId], references: [id])

  @@index([studentNremtId])
  @@index([issuedAt])
  @@index([activityNumber])
}

// CAPCE auto-reporting queue
model CAPCEReport {
  id              String           @id @default(cuid())
  
  // Payload fields per CAPCE integration spec
  activityNumber  String
  nremtId         String                           // Provider's NREMT number
  completionDate  DateTime
  ceHours         Decimal          @db.Decimal(3, 2)
  nccpDomains     String[]         @default([])
  
  // Transmission tracking
  status          CAPCEReportStatus @default(PENDING)
  submittedAt     DateTime?
  confirmedAt     DateTime?
  failedAt        DateTime?
  errorMessage    String?
  retryCount      Int              @default(0)
  nextRetryAt     DateTime?
  
  // Reference
  externalRefId   String?                          // CAPCE's confirmation ID
  
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  certificates    CeCertificate[]

  @@index([status])
  @@index([status, nextRetryAt])
  @@index([nremtId])
}
```

### Agency / B2B Models

```prisma
// An agency is an EMS organization that purchases seats in bulk
model Agency {
  id              String       @id @default(cuid())
  name            String
  slug            String       @unique
  
  // Contact
  contactName     String
  contactEmail    String
  contactPhone    String?
  
  // Address
  streetAddress   String?
  city            String?
  state           String?
  zipCode         String?
  
  // Billing
  stripeCustomerId String?
  billingEmail    String?
  
  // Branding (optional white-label)
  logoUrl         String?
  primaryColor    String?
  
  isActive        Boolean      @default(true)
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  admins          AgencyAdmin[]
  providers       AgencyProvider[]
  seatPurchases   AgencySeatPurchase[]
  courseAssignments AgencyCourseAssignment[]

  @@index([state])
}

// Agency admin users
model AgencyAdmin {
  id              String       @id @default(cuid())
  agencyId        String
  email           String
  passwordHash    String
  name            String
  role            String       @default("admin")  // admin, manager, viewer
  
  isActive        Boolean      @default(true)
  lastLoginAt     DateTime?
  tokenVersion    Int          @default(0)
  failedLoginAttempts Int      @default(0)
  lockoutUntil    DateTime?
  resetToken      String?
  resetTokenExpiry DateTime?
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  agency          Agency       @relation(fields: [agencyId], references: [id], onDelete: Cascade)

  @@unique([agencyId, email])
  @@index([email])
}

// A provider employed by an agency (linked to Student record for learning data)
model AgencyProvider {
  id              String           @id @default(cuid())
  agencyId        String
  studentId       String?                          // Linked after provider creates account
  
  // Provider info (pre-registration)
  email           String
  firstName       String
  lastName        String
  certLevel       String?                          // EMT, AEMT, PARAMEDIC
  nremtId         String?
  
  // Status
  inviteStatus    AgencyInviteStatus @default(PENDING)
  invitedAt       DateTime     @default(now())
  acceptedAt      DateTime?
  
  isActive        Boolean      @default(true)
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  agency          Agency       @relation(fields: [agencyId], references: [id], onDelete: Cascade)
  student         Student?     @relation(fields: [studentId], references: [id])
  seats           AgencySeat[]

  @@unique([agencyId, email])
  @@index([agencyId, inviteStatus])
  @@index([studentId])
}

// Bulk seat purchase by agency
model AgencySeatPurchase {
  id              String       @id @default(cuid())
  agencyId        String
  
  totalSeats      Int
  pricePerSeat    Decimal      @db.Decimal(8, 2)
  totalAmount     Decimal      @db.Decimal(10, 2)
  
  // Payment
  stripePaymentIntentId String?
  paymentStatus   PaymentStatus @default(PENDING)
  paidAt          DateTime?
  
  // Expiration
  expiresAt       DateTime?                        // Optional deadline for seat usage
  
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  agency          Agency       @relation(fields: [agencyId], references: [id])
  seats           AgencySeat[]

  @@index([agencyId])
  @@index([paymentStatus])
}

// Individual seat allocation within a purchase
model AgencySeat {
  id              String       @id @default(cuid())
  purchaseId      String
  providerId      String?                          // Assigned to specific provider
  activityId      String?                          // Assigned to specific activity
  
  status          SeatStatus   @default(AVAILABLE)
  assignedAt      DateTime?
  completedAt     DateTime?
  
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  purchase        AgencySeatPurchase @relation(fields: [purchaseId], references: [id])
  provider        AgencyProvider?    @relation(fields: [providerId], references: [id])
  enrollments     CeEnrollment[]

  @@index([purchaseId, status])
  @@index([providerId])
}

// Agency-level course assignment (assign an activity to the whole agency or groups)
model AgencyCourseAssignment {
  id              String       @id @default(cuid())
  agencyId        String
  activityId      String
  
  // Assignment rules
  isRequired      Boolean      @default(false)     // Mandatory for all providers
  dueDate         DateTime?
  
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  agency          Agency       @relation(fields: [agencyId], references: [id])
  activity        CeActivity   @relation(fields: [activityId], references: [id])

  @@unique([agencyId, activityId])
  @@index([agencyId])
  @@index([activityId])
}
```

### B2C Payments

```prisma
model CePayment {
  id              String        @id @default(cuid())
  studentId       String
  
  // Stripe
  stripePaymentIntentId String? @unique
  stripeSessionId String?
  
  amount          Decimal       @db.Decimal(10, 2)
  currency        String        @default("usd")
  status          PaymentStatus @default(PENDING)
  
  // What was purchased
  activityIds     String[]      @default([])       // Can buy multiple activities
  
  // Refund tracking
  refundedAt      DateTime?
  refundAmount    Decimal?      @db.Decimal(10, 2)
  refundReason    String?
  
  paidAt          DateTime?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  student         Student       @relation(fields: [studentId], references: [id])
  enrollments     CeEnrollment[]

  @@index([studentId])
  @@index([status])
  @@index([stripePaymentIntentId])
}
```

### Diagnostic Reports & Spaced Retrieval

```prisma
// Aggregated diagnostic report per student per topic
model CeDiagnosticReport {
  id              String       @id @default(cuid())
  studentId       String
  topicId         String
  
  // Performance by standard
  nesProficiency  Json?                            // { standardId: score } map
  nsopProficiency Json?
  nmgProficiency  Json?
  nccpProficiency Json?
  
  // Bloom's level breakdown
  bloomsBreakdown Json?                            // { level: { correct, total } }
  
  // Weakness identification
  weakObjectives  String[]     @default([])        // Learning objective IDs below threshold
  strongObjectives String[]    @default([])
  
  // Trend data
  attemptHistory  Json?                            // Array of { attemptId, date, score, theta }
  
  lastUpdatedAt   DateTime     @default(now())
  createdAt       DateTime     @default(now())

  student         Student      @relation(fields: [studentId], references: [id])
  topic           CeTopic      @relation(fields: [topicId], references: [id])

  @@unique([studentId, topicId])
  @@index([studentId])
}

// Spaced retrieval queue (Daily Check feature)
model CeSpacedRetrievalItem {
  id              String       @id @default(cuid())
  studentId       String
  itemId          String
  topicId         String
  
  // Spaced repetition scheduling
  nextReviewAt    DateTime
  intervalDays    Float        @default(1.0)       // Current interval
  easeFactor      Float        @default(2.5)       // SM-2 ease factor
  consecutiveCorrect Int       @default(0)
  
  // History
  lastReviewedAt  DateTime?
  lastCorrect     Boolean?
  reviewCount     Int          @default(0)
  
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  student         Student      @relation(fields: [studentId], references: [id])

  @@index([studentId, nextReviewAt])
  @@index([topicId])
}
```

---

## 3. Flow 1: Assessment-Only CE (Pathway 1)

### User Journey

```
1. BROWSE     Learner opens catalog, filters by topic/cert level/CEH format
2. SELECT     Taps "Pediatric Trauma -- Adaptive Exam (1.0 CEH)"
3. PURCHASE   Checkout (Stripe) or agency seat consumed -> enrollment created
4. ACTIVATE   "Start Exam" button -> enrollment status = ACTIVE
5. EXAM       Adaptive engine serves questions:
               a. Item selected via IRT (maximize information at current theta)
               b. Learner answers
               c. IF CORRECT -> next question
               d. IF INCORRECT -> remediation loop:
                  i.   Forced rationale display (must scroll/read, timed)
                  ii.  Character count of rationale added to running total
                  iii. Follow-up verification question (similar, not identical)
                  iv.  Record follow-up result
                  v.   Continue exam regardless of follow-up outcome
               e. Timer ticks throughout (visible countdown)
               f. Theta updated after each response
6. SCORE      After all questions answered:
               - Calculate score percentage
               - Verify character count >= threshold (7,500 for 0.5 CEH, 15,000 for 1.0 CEH)
               - Verify time spent >= minimum
7. RESULT     IF score >= 70%:
               a. Status = PASSED
               b. Generate CeCertificate
               c. Generate PDF (pdf-lib)
               d. Queue CAPCEReport
               e. Show diagnostic report
               f. Seed CeSpacedRetrievalItem entries for missed items
              IF score < 70%:
               a. Status = FAILED
               b. Show diagnostic report with identified weaknesses
               c. Lock retake: "Complete the learning resources for this topic before retrying"
               d. Enrollment.assessmentCompleted = false
               e. Guide to Pathway 2 content for same topic
8. RETAKE     After completing Pathway 2 content:
               a. Unlock new attempt
               b. Different questions drawn from item bank
               c. Attempt number incremented
               d. Full adaptive exam cycle repeats
```

### CAPCE Compliance Checkpoints

| Checkpoint | Requirement | Implementation |
|------------|------------|----------------|
| Timer enforcement | Learner cannot complete faster than allotted time | `CeAttempt.timeLimitSeconds`; frontend countdown; backend validation on submit |
| Character count | Assessment-only must meet character threshold | Running count in `CeAttempt.totalCharactersPresented`; includes stems + options + rationales |
| Passing score | 70% minimum | `CeAttempt.scorePercentage >= CeActivity.passingScore` |
| Learning objectives | Every item maps to stated LOs | `CeItem.learningObjectiveIds[]` validated against `CeTopic.learningObjectives` |
| Item banking | Adaptive selection must cover stated LOs with comparable difficulty | IRT engine selects from calibrated pool; LO coverage check at exam completion |
| Unlimited retakes | Must allow retakes with different questions | New `CeAttempt` with `attemptNumber++`; item selection excludes previously-seen items |
| Fail gate | Failed learners must complete remedial content | `CeEnrollment.contentCompleted` checked before allowing new attempt after failure |

### Timer / Tracking Requirements

- **Frontend:** Visible countdown timer synced with server start time. Pause on tab blur (with warning). Idle detection after 120 seconds of no interaction.
- **Backend:** `CeAttempt.startedAt` set on first question load. `finishedAt` set on final submission. `totalTimeSeconds` calculated server-side (not trusted from client).
- **Minimum time:** Even if all questions answered quickly, character count requirement naturally enforces minimum engagement time through rationale reading.
- **Maximum time:** `timeLimitSeconds` hard cutoff. Auto-submit on expiry with `status = TIMED_OUT`.
- **Per-question timing:** `CeItemResponse.presentedAt` and `answeredAt` capture per-item duration for analytics and IRT calibration.

### Certificate Generation Triggers

Certificate generation fires when ALL conditions are met:
1. `CeAttempt.status = PASSED`
2. `CeAttempt.scorePercentage >= CeActivity.passingScore`
3. `CeAttempt.totalCharactersPresented >= (CeActivity.ceHours * 15000)` (character count check)
4. `CeAttempt.totalTimeSeconds >= CeActivity.timeLimitSeconds * 0.9` (allowing 10% tolerance for rounding)
5. No existing non-revoked `CeCertificate` for this enrollment

### API Endpoints

```
POST   /api/ce/catalog                        List/filter activities (public)
GET    /api/ce/catalog/:activityId             Activity detail (public)

POST   /api/ce/enroll                          Create enrollment (requires auth + payment)
GET    /api/ce/enrollments                     List learner's enrollments
GET    /api/ce/enrollments/:enrollmentId       Enrollment detail + status

POST   /api/ce/attempts/start                  Begin exam attempt
GET    /api/ce/attempts/:attemptId/next        Get next adaptive question
POST   /api/ce/attempts/:attemptId/respond     Submit answer
GET    /api/ce/attempts/:attemptId/remediation Get remediation (rationale + follow-up)
POST   /api/ce/attempts/:attemptId/remediation Submit follow-up answer
POST   /api/ce/attempts/:attemptId/finish      Complete exam (triggers scoring)
GET    /api/ce/attempts/:attemptId/result      Get scored result + diagnostic

GET    /api/ce/certificates/:hash              Verify certificate (public, QR code target)
GET    /api/ce/certificates/:hash/pdf          Download certificate PDF
```

---

## 4. Flow 2: Content CE with Post-Test (Pathway 2)

### User Journey

```
1. BROWSE     Learner opens catalog, filters by Pathway 2 activities
2. SELECT     Taps "Pediatric Trauma -- Video Course (1.0 CEH)"
3. PURCHASE   Checkout or agency seat consumed -> enrollment created
4. ACTIVATE   "Start Course" -> enrollment status = ACTIVE
5. CONTENT    Content delivery with enforced engagement:
               a. VIDEO path:
                  - Video player loads with tracking overlay
                  - Seek-forward disabled until first watch-through
                  - Segment tracking: videoSegmentsWatched records watched ranges
                  - Minimum % required: 95% of video duration
                  - Idle detection pauses timer after 120s inactivity
               b. READING path:
                  - Reading content presented with scroll tracking
                  - Minimum time enforced per CAPCE words-per-minute standard
                  - readingCharCount / WPM = required minutes
                  - readingActiveTimeMs tracks actual engagement
                  - Scroll depth tracked (must reach 100%)
6. COMPLETE   Content marked complete when:
               - totalTimeSeconds >= requiredTimeSeconds
               - Video: videoProgressPercent >= 95.00
               - Reading: readingScrollDepth >= 100.00
7. POST-TEST  15-question post-test begins:
               a. Questions drawn from same topic's item bank
               b. Fixed (not adaptive) -- all 15 questions presented
               c. Timer enforced
               d. Standard scoring (no remediation loop on post-test)
8. RESULT     IF score >= 70%:
               a. Certificate generated
               b. CAPCE auto-reported
               c. Diagnostic report shown
               d. Spaced retrieval items seeded
              IF score < 70%:
               a. "Review the material and try again"
               b. Content remains accessible
               c. New post-test with DIFFERENT questions
               d. Unlimited retakes (new CeAttempt with fresh questions)
9. RETAKE     No content re-consumption required for post-test retakes
              New questions drawn from pool (excluding previously-seen items when possible)
```

### CAPCE Compliance Checkpoints

| Checkpoint | Requirement | Implementation |
|------------|------------|----------------|
| Content duration | Minimum time per CEH format | `CeContentProgress.requiredTimeSeconds` enforced; cannot skip |
| WPM standard | Reading content timed per CAPCE formula | Characters / WPM = required reading time |
| Video consumption | Must watch substantially all content | Segment tracking; 95% threshold |
| Post-test | Summative assessment required | 15-question fixed test; `CeAttempt.attemptType = POST_TEST` |
| Passing score | 70% on post-test | Same as Pathway 1 |
| Different questions | Retakes use different items | Item selection excludes `CeItemResponse` history for this enrollment |
| SME review | Content reviewed by subject matter expert | `CeActivity.smeReviewerId`, `smeReviewDate` recorded |
| COI disclosure | Conflict of interest documented | `CeActivity.coiDisclosure` field; displayed to learner before content |

### Timer / Tracking Requirements

- **Content timer:** `CeContentProgress.totalTimeSeconds` accumulates active time. Frontend sends heartbeats every 30 seconds. Backend validates heartbeat continuity.
- **Idle detection:** If no heartbeat for 120+ seconds, timer pauses. `idleWarningCount` incremented. Learner must interact to resume.
- **Video anti-cheat:** Seek-forward blocked on first playthrough. Playback rate locked to 1x. Video player events (play, pause, seek, ended) logged.
- **Reading anti-cheat:** Scroll depth tracked. Active time requires mouse/keyboard/touch events. Pure idle time excluded.
- **Post-test timer:** Same enforcement as Pathway 1 exam timer.

### Certificate Generation Triggers

Certificate generation fires when ALL conditions are met:
1. `CeContentProgress.status = COMPLETED`
2. `CeContentProgress.totalTimeSeconds >= requiredTimeSeconds`
3. `CeAttempt.status = PASSED` (post-test)
4. `CeAttempt.scorePercentage >= CeActivity.postTestPassingScore`
5. No existing non-revoked `CeCertificate` for this enrollment

### API Endpoints

```
POST   /api/ce/content/start                   Start content consumption
POST   /api/ce/content/heartbeat               Report active engagement (every 30s)
POST   /api/ce/content/video-event             Log video player event
POST   /api/ce/content/reading-progress        Report scroll depth + active time
POST   /api/ce/content/complete                Mark content as completed (server validates)
GET    /api/ce/content/:enrollmentId/status     Get content progress

POST   /api/ce/posttest/start                  Begin post-test
GET    /api/ce/posttest/:attemptId/questions    Get all 15 post-test questions
POST   /api/ce/posttest/:attemptId/submit      Submit all answers (or one at a time)
GET    /api/ce/posttest/:attemptId/result       Get scored result
```

---

## 5. Flow 3: Combined Pathway (Pathway 3)

### User Journey

```
1. BROWSE     Learner opens catalog, sees Combined activities
2. SELECT     Taps "Pediatric Trauma -- Full Package (2.0 CEH)"
3. PURCHASE   Single purchase covers both sub-pathways
4. CHOOSE     Learner selects order:
               a. "Exam First" (recommended for experienced providers):
                  - Assess gaps -> see diagnostic -> targeted content consumption
               b. "Content First" (recommended for newer providers):
                  - Build knowledge -> prove competency via exam
5. PATH A: EXAM FIRST
               a. Complete Pathway 1 adaptive exam (full flow from Flow 1)
               b. IF PASSED: assessmentCompleted = true, 0.5-1.0 CEH awarded
                  - Diagnostic report highlights weak areas
                  - Content consumption focuses on identified gaps
               c. IF FAILED: must complete content before retake (same as Flow 1 fail)
                  - Seamlessly moves learner into content pathway
               d. Complete Pathway 2 content + post-test (full flow from Flow 2)
               e. IF PASSED: contentCompleted = true, additional 0.5-1.0 CEH awarded
6. PATH B: CONTENT FIRST
               a. Complete Pathway 2 content + post-test (full flow from Flow 2)
               b. IF PASSED: contentCompleted = true, 0.5-1.0 CEH awarded
               c. Complete Pathway 1 adaptive exam (full flow from Flow 1)
               d. IF PASSED: assessmentCompleted = true, additional 0.5-1.0 CEH awarded
               e. IF FAILED: content already completed, so retake is immediately available
                  - Different questions on retake
7. COMPLETE   When BOTH assessmentCompleted AND contentCompleted:
               - Total CEH = exam CEH + content CEH (1.0-2.0 total)
               - Each sub-pathway generates its own CeCertificate
               - Each reported to CAPCE separately
               - Combined diagnostic report available
```

### Enrollment Structure for Combined Pathway

A Pathway 3 `CeEnrollment` links to a single `CeActivity` with `pathway = COMBINED`. Under the hood, the system tracks two sub-completions:

- `CeEnrollment.assessmentCompleted` -- becomes `true` when a `CeAttempt` with `attemptType = ASSESSMENT` reaches `PASSED`
- `CeEnrollment.contentCompleted` -- becomes `true` when `CeContentProgress.status = COMPLETED` AND a `CeAttempt` with `attemptType = POST_TEST` reaches `PASSED`

Two separate `CeCertificate` records are created (one per sub-pathway), each with its own `ceHours` value, each reported to CAPCE independently.

### CAPCE Compliance Checkpoints

All checkpoints from Flow 1 and Flow 2 apply to their respective sub-pathways. Additional Combined-specific checkpoints:

| Checkpoint | Requirement | Implementation |
|------------|------------|----------------|
| Separate CE credit | Each pathway awards its own CEH | Two `CeCertificate` records, two `CAPCEReport` records |
| Independent completion | Pathways stand alone | Either can be completed without the other meeting a threshold |
| Fail gate cross-pathway | Failed exam requires content before retake | `contentCompleted` check before allowing new assessment attempt post-failure |

### API Endpoints

Combined pathway reuses all endpoints from Flow 1 and Flow 2, plus:

```
POST   /api/ce/combined/choose-order           Set preferred path (exam-first or content-first)
GET    /api/ce/combined/:enrollmentId/status    Combined progress (both sub-pathways)
GET    /api/ce/combined/:enrollmentId/diagnostic Combined diagnostic report
```

---

## 6. Flow 4: Agency Bulk Enrollment

### User Journey

```
AGENCY ADMIN FLOW:
1. ONBOARD    Agency admin creates account or receives invite
               - Agency record created with billing info
               - Stripe customer ID linked
2. ROSTER     Admin uploads or manually enters provider roster
               - CSV import: email, firstName, lastName, certLevel, nremtId
               - Creates AgencyProvider records with inviteStatus = PENDING
               - System sends invitation emails to providers
3. PURCHASE   Admin selects courses and purchases seats
               a. Browse CE catalog (same as B2C catalog)
               b. Select activities to assign
               c. Choose seat count
               d. Checkout (Stripe, invoice, or PO)
               e. AgencySeatPurchase created with AgencySeat records
4. ASSIGN     Admin assigns courses to providers
               a. Bulk assign: select activity + select providers -> seats allocated
               b. Or: create AgencyCourseAssignment (required for all providers)
               c. AgencySeat.status = ASSIGNED, provider + activity linked
               d. Notification sent to provider
5. TRACK      Compliance dashboard (real-time):
               a. Provider roster with completion status per course
               b. Progress bars: not started / in progress / completed / overdue
               c. Deadline tracking (dueDate on AgencyCourseAssignment)
               d. Aggregate pass rates, average scores, time-to-completion
               e. Diagnostic data: agency-wide weakness identification
               f. Export: CSV, PDF compliance report
6. REPORT     CAPCE reporting happens automatically per individual completion
               - Agency dashboard shows CAPCE report status per provider
               - Admin can verify reporting status
7. RENEW      Expiring seats / new recertification cycle:
               a. Dashboard flags approaching deadlines
               b. Admin purchases additional seats
               c. Reassign or auto-assign based on compliance gaps

PROVIDER FLOW (agency-enrolled):
1. INVITE     Provider receives email invitation
2. REGISTER   Creates account (or logs in if existing)
               - AgencyProvider.studentId linked
               - AgencyProvider.inviteStatus = ACCEPTED
3. DASHBOARD  Sees assigned courses with deadlines
4. COMPLETE   Standard Flow 1/2/3 experience
               - Seat status updated on completion
               - Agency admin dashboard updates in real time
5. CERT       Certificate generated; CAPCE auto-reported
```

### CAPCE Compliance Checkpoints

| Checkpoint | Requirement | Implementation |
|------------|------------|----------------|
| Individual reporting | CAPCE reports per individual, not per agency | Each provider's completion generates individual CAPCEReport |
| NREMT ID | Required for CAPCE reporting | `AgencyProvider.nremtId` collected at roster upload; validated before enrollment |
| Provider identity | Learner must be the one completing | Session-based auth; no shared credentials |
| Compliance documentation | Auditable completion records | Full audit trail: enrollment -> attempts -> responses -> certificate -> CAPCE report |

### Timer / Tracking Requirements

- Same as individual flows (1, 2, 3). Agency enrollment does not alter timer behavior.
- Additional: `AgencySeat.assignedAt` and `completedAt` for deadline tracking.
- Agency dashboard polls completion status via API.

### API Endpoints

```
-- Agency Admin Authentication
POST   /api/agency/auth/register               Agency admin signup
POST   /api/agency/auth/login                  Agency admin login
POST   /api/agency/auth/forgot-password        Password reset

-- Agency Management
GET    /api/agency/profile                     Agency details
PUT    /api/agency/profile                     Update agency info

-- Provider Roster
GET    /api/agency/providers                   List providers
POST   /api/agency/providers                   Add single provider
POST   /api/agency/providers/import            CSV bulk import
PUT    /api/agency/providers/:id               Update provider
DELETE /api/agency/providers/:id               Remove provider
POST   /api/agency/providers/:id/reinvite      Resend invitation

-- Seat Purchases
POST   /api/agency/purchases                   Purchase seats (Stripe checkout)
GET    /api/agency/purchases                   List purchases
GET    /api/agency/purchases/:id               Purchase detail with seat breakdown

-- Course Assignments
POST   /api/agency/assignments                 Assign activity to providers
GET    /api/agency/assignments                 List assignments
PUT    /api/agency/assignments/:id             Update assignment (deadline, required flag)
DELETE /api/agency/assignments/:id             Remove assignment
POST   /api/agency/assignments/bulk            Bulk assign to multiple providers

-- Compliance Dashboard
GET    /api/agency/dashboard                   Aggregate stats
GET    /api/agency/dashboard/providers         Provider completion matrix
GET    /api/agency/dashboard/activities        Activity completion rates
GET    /api/agency/dashboard/compliance        Compliance report (overdue, at-risk)
GET    /api/agency/dashboard/diagnostics       Agency-wide diagnostic data
GET    /api/agency/dashboard/export            CSV/PDF export

-- CAPCE Reporting Status
GET    /api/agency/capce-status                CAPCE report status per provider per activity
```

---

## 7. Flow 5: Individual B2C Purchase

### User Journey

```
1. DISCOVER   Learner arrives via:
               - Pulse game -> "Get CE Credit" CTA
               - Direct search / SEO
               - Social media / marketing
               - Referral link
2. BROWSE     Public catalog page:
               a. Filter by: topic, cert level (EMT/AEMT/Paramedic), pathway, CEH format
               b. Sort by: popular, newest, topic area
               c. Each card shows: title, pathway type, CEH, price, estimated time
3. DETAIL     Activity detail page:
               a. Full description, learning objectives, instructor/SME info
               b. COI disclosure (CAPCE requirement)
               c. Four-standard mapping preview
               d. Reviews / completion stats (social proof)
               e. "Exam Only -- $5" / "Video Course -- $12" / "Full Package -- $15"
4. AUTH       If not logged in:
               a. "Create Account" or "Log In"
               b. Collect: email, password, name, cert level
               c. Optional: NREMT ID, license number/state (needed for CAPCE reporting)
               d. Account verification email
5. CHECKOUT   Stripe Checkout session:
               a. Activity summary + price
               b. Promo code / coupon support
               c. Payment processing
               d. CePayment record created
6. CONFIRM    Confirmation page:
               a. "Payment successful" 
               b. CeEnrollment created with status = PURCHASED
               c. "Start Now" or "Start Later"
               d. Confirmation email with receipt
7. ACCESS     Learner dashboard shows enrolled activities
               - Status badges: Not Started, In Progress, Completed
               - Direct "Resume" or "Start" buttons
8. COMPLETE   Standard Flow 1/2/3 depending on pathway purchased
9. CERT       Certificate generated, CAPCE reported, PDF downloadable
10. NEXT      Post-completion:
               a. Recommended next activities (based on diagnostic gaps)
               b. "Share your achievement" (social proof generation)
               c. CE transcript updated
               d. Daily Check (spaced retrieval) items seeded
```

### CAPCE Compliance Checkpoints

| Checkpoint | Requirement | Implementation |
|------------|------------|----------------|
| NREMT ID for reporting | Required before CAPCE auto-report | Prompted at registration or before first certificate; stored in Student.nremtId |
| COI disclosure | Visible before content consumption | Displayed on activity detail page; logged in audit trail |
| Refund handling | Cert revocation if refunded | Refund triggers `CeCertificate.revokedAt`; CAPCE notified if already reported |

### Timer / Tracking Requirements

- Same as individual flows. B2C purchase flow does not alter timer behavior.
- Additional: `CePayment.paidAt` timestamp for refund window calculations.

### Certificate Generation Triggers

Same as Flow 1, 2, or 3 depending on the pathway purchased. Additional B2C-specific requirement: `Student.nremtId` must be non-null before CAPCE reporting (but certificate can be generated without it; CAPCE report queued as PENDING until NREMT ID provided).

### API Endpoints

```
-- Public Catalog
GET    /api/ce/catalog                         List activities (filterable, public)
GET    /api/ce/catalog/:activityId             Activity detail (public)

-- Authentication
POST   /api/auth/register                      Create student account
POST   /api/auth/login                         Student login
POST   /api/auth/forgot-password               Password reset
POST   /api/auth/verify-email                  Email verification
PUT    /api/auth/profile                       Update profile (add NREMT ID, etc.)

-- Checkout
POST   /api/checkout/session                   Create Stripe checkout session
POST   /api/checkout/webhook                   Stripe webhook handler
GET    /api/checkout/confirm/:sessionId        Confirm payment + create enrollment

-- Learner Dashboard
GET    /api/learner/dashboard                  Dashboard with enrollment statuses
GET    /api/learner/enrollments                All enrollments
GET    /api/learner/transcript                 CE transcript (all completed activities)
GET    /api/learner/certificates               All certificates
GET    /api/learner/diagnostics                Aggregate diagnostic data
GET    /api/learner/daily-check                Spaced retrieval questions for today
POST   /api/learner/daily-check/respond        Submit daily check answer

-- Social / Referral
POST   /api/learner/share/:certificateHash     Generate shareable link
GET    /api/verify/:hash                       Public certificate verification
```

---

## 8. Cross-Cutting Concerns

### Adaptive Engine (IRT Implementation)

The existing mededprep-c adaptive engine uses domain-percentage allocation with random selection (not IRT). The CE platform builds a proper IRT-based CAT:

```
Item Selection Algorithm:
1. Start: theta = 0.0 (average ability)
2. Select item that maximizes Fisher information at current theta
3. Constraints:
   - Item not previously seen by this learner (across all attempts)
   - Learning objective coverage (must touch all stated LOs by exam end)
   - Content balancing (avoid clustering on one LO)
   - Exposure control (no item served to >20% of examinees in rolling window)
4. After response:
   - Update theta via EAP (Expected A Posteriori) or MLE
   - Update standard error
   - Check stopping rules:
     a. All questions served (fixed-length exam)
     b. SE(theta) < threshold (variable-length, future enhancement)
5. Score: percentage correct for pass/fail; theta for diagnostic precision

IRT Calibration:
- Fresh calibration needed for CE provider population (student data != provider data)
- Trigger: first 500 CE-specific responses collected per item
- Pre-calibration: use classical difficulty index for item selection
- Recalibration cycle: monthly batch job after sufficient new response data
```

### CAPCE Auto-Reporting Integration

```
Reporting Pipeline:
1. Certificate generated -> CAPCEReport record created (PENDING)
2. Background job picks up PENDING reports every 5 minutes
3. POST to CAPCE integration endpoint:
   {
     activityNumber: string,
     nremtId: string,
     completionDate: ISO8601,
     ceHours: decimal,
     nccpDomains: string[]
   }
4. On success: status = CONFIRMED, externalRefId stored
5. On failure: status = FAILED, errorMessage stored, retryCount++
6. Retry schedule: 5min, 15min, 1hr, 4hr, 24hr (exponential backoff)
7. After 5 failures: status = FAILED (permanent), alert to admin
8. Manual retry available via platform admin dashboard

Note: CAPCE integration endpoint not available until accreditation
is complete. Build the wrapper now; wire reporting after approval.
```

### Certificate PDF Generation

Using `pdf-lib` (consistent with existing mededprep-ce):

```
Certificate contains:
- MedEdPrep / Pulse CE branding
- Student name, license number, NREMT ID
- Activity title and CAPCE activity number
- Pathway type and CEH awarded
- NCCP domain mapping
- Completion date
- Score (exam or post-test)
- QR code linking to /api/verify/:hash
- SME / medical director information
- COI disclosure reference
- Unique certificate hash for verification

PDF specs: Portrait, A4, 300 DPI (matching existing CAPCE template in mededprep-c)
```

### Audit Trail

Every significant action is logged to `AuditLog` (existing model):

```
Logged events:
- enrollment.created, enrollment.activated
- attempt.started, attempt.completed, attempt.failed, attempt.timed_out
- response.submitted (per question)
- remediation.rationale_shown, remediation.followup_answered
- content.started, content.heartbeat, content.completed
- content.idle_warning, content.idle_pause
- certificate.generated, certificate.downloaded, certificate.revoked
- capce.report_submitted, capce.report_confirmed, capce.report_failed
- payment.completed, payment.refunded
- agency.provider_invited, agency.provider_accepted
- agency.seats_purchased, agency.seat_assigned
```

### Session Security

- JWT authentication with refresh tokens
- Token version tracking (existing pattern from mededprep-ce)
- Session binding: exam attempt tied to authenticated session
- IP logging on all assessment interactions
- Rate limiting on answer submissions (prevent automated completion)
- Browser fingerprint tracking for academic integrity (logged, not blocking)

### Error Handling

- **Payment failure:** Enrollment not created. Learner shown clear error with retry.
- **Exam interruption:** Attempt preserved in `IN_PROGRESS`. Learner can resume from last unanswered question. Timer continues from server-side `startedAt`.
- **Content interruption:** `CeContentProgress.totalTimeSeconds` preserves accumulated time. Resume from `videoLastPosition` or `readingScrollDepth`.
- **CAPCE reporting failure:** Certificate still valid locally. Retry pipeline handles eventual consistency. Admin notified after permanent failure.
- **Network timeout during response:** Client retries with idempotency key. Server deduplicates on `(attemptId, sequenceNumber)`.

### Database Indexes Summary

Critical query paths and their supporting indexes:

| Query | Index |
|-------|-------|
| Catalog browsing | `CeActivity(isActive, publishedAt)`, `CeTopic(category)`, `CeTopic(certLevel)` |
| Learner enrollments | `CeEnrollment(studentId, status)` |
| Active attempt lookup | `CeAttempt(enrollmentId, attemptType)` |
| Item selection (IRT) | `CeItem(topicId, isActive)`, `CeItem(topicId, irtDifficulty)` |
| Certificate verification | `CeCertificate(hash)` unique |
| CAPCE report queue | `CAPCEReport(status, nextRetryAt)` |
| Agency compliance | `AgencySeat(purchaseId, status)`, `AgencyProvider(agencyId, inviteStatus)` |
| Spaced retrieval | `CeSpacedRetrievalItem(studentId, nextReviewAt)` |
| Diagnostic reports | `CeDiagnosticReport(studentId, topicId)` unique |

### Migration Path from Existing mededprep-ce

The existing mededprep-ce schema (Organization, Student, Certificate, AuditLog, etc.) remains intact. New CE-specific models are additive:

1. Add new enums and models via Prisma migration
2. Extend `Student` model with relation to `CeEnrollment[]`, `CeDiagnosticReport[]`, `CeSpacedRetrievalItem[]`, `CePayment[]`, `AgencyProvider[]`
3. Existing certificate system continues for GTC (Georgia Trauma Commission) classes
4. New `CeCertificate` model handles CE-pathway certificates separately
5. Shared auth layer (Student login works for both GTC classes and CE activities)

### Environment Variables

```
# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_HALF_CEH=
STRIPE_PRICE_ID_FULL_CEH=

# CAPCE Integration (available post-accreditation)
CAPCE_API_URL=
CAPCE_API_KEY=
CAPCE_ORG_ID=

# IRT Engine
IRT_MIN_CALIBRATION_N=500
IRT_EXPOSURE_CONTROL_MAX=0.20
IRT_SE_THRESHOLD=0.30

# Content Delivery
CDN_BASE_URL=
VIDEO_PLAYER_API_KEY=

# Timers
IDLE_TIMEOUT_SECONDS=120
HEARTBEAT_INTERVAL_SECONDS=30
CONTENT_MIN_TIME_TOLERANCE=0.90
```
