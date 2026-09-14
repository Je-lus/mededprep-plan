# Portal Bug Fixes

**Priority:** P0
**Touches:** mededprep-portal / team.mededprep.com

## Problem

Heather has been experiencing issues:
- Follow-ups not saving
- Data not persisting after her actions
- General sense that pieces aren't connecting/talking to each other

## Investigation Plan

1. SSH into the portal server
2. Look at Heather's account activity and recent actions
3. Check server logs for errors during her sessions
4. Identify where saves are failing (API errors, validation issues, DB writes)
5. Map out her workflow pain points from the data

## Note

Waiting for Heather's exact list of problems. In the meantime, server-side investigation can surface issues proactively.

## Status

Not started — needs server investigation.
