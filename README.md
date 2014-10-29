Random Teamwork
=============

## Purpose

I sometimes teach JavaScript to beginners. The classes usually involve pair programming. I want the pairs to change periodically. This tool will help that happen while also acting as an open-source app that students can reference. The Node code that randomizes the pairs should be especially easy for newbs to read.

### Plan for v1.0

1. Teacher creates new classroom that gets a unique URL (much like Co-Compare URLs).
2. Students visit URL (do not need to log in; just provide a name).
  - Unless classroom is set as *unlisted*, students can also join the classroom by simply finding it in a list on the home page.
  - Optional: Client UI shows real-time list of students as they join/leave (WebSockets?)
3. Teacher clicks button to generate random pairs of students for pair programming.
  - Optional: Client UI shows groups generated in real-time (without refreshing browser).
4. The generated pairs are saved into database until teacher clicks button again.
5. Teacher can delete the classroom, which renders its unique URL useless.

#### Data Model

```JavaScript
// Classroom object...
{
  name: 'JS Fundamentals part 2',
  createdAt: ISODate(/* blah blah blah */),
  updatedAt: ISODate(/* blah blah blah */),
  teacher: '@RebootJeff', // aka classroom creator
  groups: [
    {
      name: 'A',
      people: [ 'person 1', 'person 2' ]
    },
    {
      name: 'B',
      people: [ 'person 3', 'person 4' ]
    }
    // and so on...
  ]
}
```

### TODO
- Teacher can change target group size from 2 to N. The grouping algorithm must avoid creating groups of 1 whenever the target group size is greater than 2.
- If teacher is logged in, then classroom can be set to "unlisted" so it only shows up on home page if the visitor is the classroom's teacher/creator.
- Randomizer will track history of generated groups to check if any newly generated groups are identical to past groups.
  - Client will highlight repeated groups. Or randomizer's selection process will simply avoid repeated groups as much as possible.
- If students is logged in, then they can edit their respective group names into *Team West Coast is the Best Coast* or *Earth, Wind, and Code* or whathaveyou.

## Tech Stack

- **MEAN** stack for web app structure
- **Angular-Material** library for UI components and mini-CSS framework
