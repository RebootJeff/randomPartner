Random Teamwork
=============

## Purpose

I sometimes teach JavaScript to beginners. The classes usually involve pair programming. I want the pairs to change periodically. This tool will help that happen while also acting as an open-source app that students can reference. The Node code that randomizes the pairs should be especially easy for newbs to read.

### Plan for v1.0

1. Teacher (must be logged in) creates new classroom that gets a unique URL (much like Co-Compare URLs).
2. Students visit URL (do not need to log in; just provide a name).
  - Optional: Client UI shows real-time list of students as they join/leave (WebSockets?)
3. Teacher clicks button to generate random pairs of students for pair programming.
4. The generated pairs are saved into database until teacher clicks button again.
5. Teacher can delete the "classroom", which renders that unique URL useless.

### Plan for v1.1

Teacher can change target group size from 2 to N. The grouping algorithm must avoid creating groups of 1 whenever the target group size is greater than 2.

## Tech Stack

- **MEAN** stack for web app structure
- **Angular-Material** library for UI components and mini-CSS framework
