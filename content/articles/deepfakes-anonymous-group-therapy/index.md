---
title: "Deepfakes for Anonymous Group Therapy"
date: 2024-05-29
draft: false
categories: ["Projects"]
tags: ["AI", "Deepfakes", "Mental Health", "Privacy", "Technology", "Therapy"]
readTime: "3 min read"
featuredImage: "/assets/articles/deepfakes-anonymous-group-therapy/deepfake.jpg"
description: "Exploring the use of deepfake technology to enable anonymous group therapy sessions, protecting participant privacy while maintaining authentic human connection."
---

Another MVP we attempted in Finland under EU law, internally we called it "Persona". When I say we I'm talking about Hasan, Shijie, Mursalat and me. The idea was brought forward by Alex who was very optimitic about group therapies and wanted to bring it on the web. The techincal challenge this posed was running deepfakes on the cloud; as normally people use their local machine with good GPUs for deepfakes but creating a distributed system for hosting multiple calls with multiple users that too with deepfake enabled was something new. 

The market for this was an emerging one and we choose deepfake over layers face filters and masks to ensure no accidents happen. We used Elon Musk's face as our first deepfake filter. The inital goal was to make it easy to select different persona (celebrity faces) and in video use their face & audio to hide the user's original one while conveying their facial and verbal expressions.

![Persona working image](/assets/articles/deepfakes-anonymous-group-therapy/persona_working_image.jpg)

For our MVP we used a bunch of SaaS to speed up. We used livekit for managing video and audio. They have a very decent google meet like clone, all we had to do was try out different deepfake models and make the architecture as feasible as possible by minimizing resource usage and some UX tricks to make sure it was seamless. 

The main challenges we faced were not technical but rather complying with the EU regulations. This being a platform for healthcare use, we had to traverse a lot of legal mines given it was made for the EU market. The MVP was a success, we managed deepfakes run on the cloud and ran a few test meetings with real professionals with use the team acting as patients. 