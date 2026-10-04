// The Room — entries. Newest first. Empty on purpose until there is real
// material: no placeholder posts are shown to visitors.
//
// Entry shape (maps 1:1 to a future `room_posts` table):
// {
//   id: "demo-03",            // slug / primary key
//   number: "03",             // journal-style number shown on the page
//   category: "music",        // one of roomCategories ids (data/Site.js)
//   title: "don't know if this one should exist",
//   note: "short human note",
//   date: "2026-10-03",       // ISO date
//   href: "",                 // optional: link to a file, page or player
// }
export const roomEntries = [];
