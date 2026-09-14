# Priority EMS Multi-Site View

**Priority:** P1
**Requested by:** Jonathan Walker (Priority EMS)
**Touches:** MedEdPrep platform — accounts, roles, dashboards

## Requirements

Jonathan Walker needs:
1. **State-level dashboard** — See all Priority EMS locations across the nation from one view
2. **Single login** — One account to access all courses under their overall company
3. **Student transfers** — Ability to move students from one cohort to another when enrolled in the wrong course
4. **Satellite visibility** — Each location viewable by the parent organization

## Architecture Considerations

Two approaches discussed:

### Option A: Priority EMS as its own "State"
- Create "Priority EMS" as a state entity
- Jonathan gets a State Director account
- Satellite locations are schools within that state
- **Con:** Overloads the concept of "state"

### Option B: School with Satellite Locations (Preferred)
- Priority EMS is a "School" (organization)
- Individual locations are satellite campuses
- Process by satellite locations
- Jonathan has an org-level admin role
- **Pro:** Cleaner data model, doesn't abuse state concept

## Status

Not started — need to confirm architecture approach before building.
