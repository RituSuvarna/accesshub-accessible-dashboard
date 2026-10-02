# AccessHub — Digital Accessibility Operations Platform

AccessHub is a multi-page digital accessibility operations dashboard designed to demonstrate how an organization can monitor accessibility, document barriers, and track improvement activities across digital services.

This project was developed as an internship project focusing on **Semantic HTML5 and Accessible Component Architecture**.

---

## Project Overview

Digital accessibility should be treated as an ongoing operational activity rather than a one-time audit.

AccessHub provides a simple workspace where users can:

- Monitor digital services
- Review accessibility health
- Identify accessibility barriers
- Submit accessibility reports
- Assign issue priorities
- Track reported issues
- Configure accessibility preferences

The project itself also follows accessibility-focused development practices.

---

## Main Features

### Accessibility Dashboard

The dashboard provides an overview of:

- Services monitored
- Open accessibility issues
- Resolved issues
- Overall accessibility score
- Issue priority breakdown
- Areas requiring attention
- Recent accessibility activity

### Digital Services

The Services page allows users to:

- Search monitored services
- Filter services by category
- Review accessibility scores
- View open issue counts
- Check service status
- Review accessibility monitoring areas

### Accessibility Reports

Users can submit accessibility reports containing:

- Digital service
- Issue type
- Priority
- Detailed issue description

Submitted reports are stored locally using browser `localStorage`.

### Reporting Guidance

The Reports page includes an accessible modal dialog explaining how to create useful accessibility reports.

### Accessibility Settings

Users can configure:

- Text size
- Reduced motion
- High contrast mode
- Accessibility issue alerts
- Weekly accessibility summaries

Settings are stored locally in the browser.

---

## Accessibility Features

AccessHub was designed using accessibility principles throughout the interface.

### Semantic HTML5

The project uses meaningful semantic elements including:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<aside>`
- `<footer>`
- `<form>`
- `<fieldset>`
- `<legend>`
- `<table>`
- `<dialog>`

### Keyboard Accessibility

Interactive elements can be operated using the keyboard.

The project includes:

- Visible keyboard focus indicators
- Skip-to-content navigation
- Keyboard-accessible navigation
- Keyboard-accessible forms
- Accessible dialog controls

### Accessible Forms

Forms use:

- Explicit `<label>` elements
- Appropriate input types
- `<fieldset>` and `<legend>`
- Required fields
- Helpful instructions
- Live status messages

### Accessible Tables

Tables use:

- `<caption>`
- Proper table headers
- `scope="col"`
- `scope="row"`

### ARIA

ARIA is used where it provides useful additional information, including:

- `aria-label`
- `aria-labelledby`
- `aria-controls`
- `aria-current`
- `aria-expanded`
- `aria-live`
- `aria-hidden`

ARIA is used to supplement semantic HTML rather than replace it.

### Reduced Motion

The interface supports reduced-motion preferences through:

- System-level `prefers-reduced-motion`
- User-controlled reduced-motion settings

### High Contrast

A high-contrast mode is available through the Settings page.

### Responsive Design

The interface adapts to:

- Desktop screens
- Tablets
- Mobile devices

The navigation also changes to a mobile-friendly menu.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Responsive visual design |
| JavaScript | Interaction and dynamic functionality |
| LocalStorage | Local report and preference storage |
| W3C Validator | HTML validation |

---

## Project Structure

```text
accesshub-accessible-dashboard/
│
├── assets/
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── index.html
├── dashboard.html
├── services.html
├── reports.html
├── settings.html
└── README.md