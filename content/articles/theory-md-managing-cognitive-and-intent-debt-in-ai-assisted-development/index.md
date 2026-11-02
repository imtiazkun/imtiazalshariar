---
title: "Theory.md: managing cognitive and intent debt in AI-assisted development"
date: 2026-11-02
draft: false
categories: ["Articles"]
tags: ["AI", "Software Engineering", "Developer Experience"]
readTime: ""
featuredImage: "/assets/articles/theory-md-managing-cognitive-and-intent-debt-in-ai-assisted-development/theorymd-managing-cognitive-and-intent-debt-in-ai-assisted-development.jpg"
description: "In our newfound AI powered workplaces, one problem is slowly building up, a cognitive burden that is getting harder to manage as AI keeps building."
---


Before we attempt any solution, it's important to define the problem else the solution will be reduced to a mere gimmick to most readers. AI has pushed software development to a new age where humans are no longer required to read and write code. "Be" and lo and behold; something is built in exchange of water and electricity offered to some complex rocks. This new power has not only increased the speed of development, it outran an engineer's understanding of what they are building. This is the first problem that needs most of our attention because  when building something for a single user or a few it might not matter much but as complexity and scale increases it becomes necessary that engineers have understanding of the system they are building. Margaret-Anne Storey's ["Triple Debt Model" article](https://margaretstorey.com/blog/2026/02/09/cognitive-debt/) defines this accumulated loss of understanding of what a system does, why and who on the team has the understanding as "Cognitive Debt". This makes it harder to maintain and onboard new engineers. 

The solution might not be just another harness or more complicated software. The solution is in small cultural shifts  between team members or even simplifying this it could be a small checklist of dos and don't which can later be enforced by software. 

Here's what we (me and my team) are doing. We use obsidian for developing a "theoretical model" of our software. This is something I called it at first. But when digging for related works I found Peter Naur’s 1985 essay "Programming as Theory Building" to have explained it more in-depth. Calling the text a theory is simpler than theoretical model, this is against Naur's explanation of theory being something that cannot be fully written down, the text is just a trace. For simplicity sake we'll just call this theory.  Naur's essay questions what programming produces, it's evident it produces code and documentation but Naur argues it's "theory". Theory as he defines in our line of work, is the understanding that a programmer builds in their heads of how the program relates to the problem it solves. Naur's work helps us define the 2nd problem that needs addressing, accountability. How do you verify if someone on the team is being responsible for certain parts they build; that they know what they have built and simply did not let AI take control? Naur defines understanding of theory based on the following:

- Explain how program maps to the real world 
- Justify why each part is the way it is 
- Respond well to change requests 

Meaning, a sober engineer will be able to explain what the program represents in the real world and what it ignores. Individual should know the why behind each rule and can respond to any request for change in the system. We can use the same theories to test ownership. This helps us make sure no one loses track while building. 

| Naur's rule | Library example | Without the theory |
| --- | --- | --- |
| Map the program to the real world | A `Copy` is a physical book; a `Title` is all copies of *Dune*. Families and shelf locations are deliberately left out. | Adds a `shelf` field nobody keeps accurate |
| Justify each part | `Copy` and `Title` are separate because members borrow a copy but reserve a title. | Merges them to "simplify" and breaks reservations |
| Handle change: it fits | "Renew a loan online" fits. A renewal is a loan whose due date moves. | Gets it right, but by luck |
| Handle change: it breaks an assumption | "Add e-books" breaks the assumption that a copy is physical and held by one person at a time. | Fake copies with special cases everywhere |
| Handle change: it hits an ignored area | "Let parents see their kids' loans" needs families, which were never modeled, and raises privacy questions. | A `parent_id` field with no clear rules |

Theory.md is an open source simple obsidian plugin paired with a containerized server in go that allows users to form the theory first and then let AI build the whole software based on it. The obsidian plugin and server merely facilitates collaborating and tracking authorship. I'm trying to package it properly instead of launching raw scripts. Here's the github repository in advance: https://github.com/imtiazkun/theory.md 
