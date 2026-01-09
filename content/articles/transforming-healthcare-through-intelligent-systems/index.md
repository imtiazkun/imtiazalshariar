---
title: "Transforming Healthcare Through Intelligent Systems"
date: 2025-12-25
draft: false
categories: ["Projects"]
tags: ["AI", "Machine Learning", "Healthcare", "Medicine", "Technology"]
readTime: "2 min read"
featuredImage: "/assets/articles/medai-transforming-healthcare-through-intelligent-systems/banner.jpg"
description: "Revolutionizing patient care and medical diagnostics through cutting-edge artificial intelligence and machine learning technologies."
---

Putting aside all the hype and fear mongering on social media about AI replacing humans, we should take a look at how AI at its application level is going to increase accessibility in health care. I've had the luxury of working with Dr Raphael Chowdhury and his firm [Bioforge Health Systems](https://bioforgehealth.org/). We did a few run through; made MVPs and tried testing in real environments to see how well AI automates different redundant tasks in a health care facility. This article explores one of those experiments we went tried.

We tried fixing a very everyday problem for patients in South East Asia, it might just be a problem you faced as well; prescriptions. Prescriptions are hard to understand unless you work in pharmaceuticals. It's like there's some secret society behind all these, making sure the cryptic messages they write do not get exposed to the everyday patient who just cannot make anything out of those squiggly lines. This is a real world problem that needs addressing specially in population dense SEA with a dramatic patient to health care professional ratio.

You might already guess that the solution is training a model that translates cryptic medical squiggles to text, but that's not what we did unfortunately. We used OpenAI's latest transcription models to allow real time transcription of doctor-patient conversation and based on those text AI-generated clinical suggestions are presented to the doctor for consideration. And based on the doctor's judgement whichever recommended diagnosis s/he selects a prescription with proper data in text is being printed out after adjusting dosage and other relevant fields manually (can't leave everything to AI). 

**Disclaimer**
This is not production ready and recording conversations would require informing the patient and their consent. This was an MVP with permission from parties involved in Dhaka.

