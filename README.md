# Allergy-Tracker
Code Louisville May 2018 Full Stack JavaScript Development Project

#### Robert Glover
####  May 2018

## Instructions

1. Clone repository.
2. Change directory to root of project, i.e., where index.html resides.
3. Type "http-server . -o" to run project.
   * This command runs npm's simple command-line http server and opens a browser window to the index.html page.
   * You can install http-server by first installing node.js, which installs npm, then using npm to install http-server. 

#### The project will still run without AJAX just by double-clicking index.html.  However, there is an AJAX widget on the "About" page that will not appear.

## Description

This repository contains my portfolio website.

* There are 4 html pages: index, projects, about, and contact.
* There is one main stylesheet in the css folder, styles.css, plus three page-specific files: projects, about, and contact.
  * There are 2 media breakpoints, one at 500px, the other at 1000px.
  * File projectcs.css formats the project cards.
  * File about.css formats the skills widget.
  * File contact.css formats the contact form.
* There is one main JavaScript file in the js folder, written entirely in plain vanilla JavaScript, plus two page-specific files: projects and about.
  * The main file, scripts.js, contains the scripts for the header, footer, and "hamburger" events.
  * The file projects.js handles the project cards.
  * The file about.js handles the AJAX skills presentation.
* The img folder contains images for the project.
* There is one included web font, Celtic Hand, in the css/fonts folder.
* The data folder contains one json file, skills.json.

## Custom CSS Classes

The class(es) I created are:

1. .main-nav: formats main navigation bar, e.g., color, list style (no bullets), absolute position at right side of screen, padding, and box shadow.
2. #index: one of four id tags, each one of which links to the body tag of each of the four pages.  The purpose is to uniquely identify each page, so that I could extract the header from the html and create it dynamically using JavaScript.  There is some formatting, e.g., background color or linear gradient.
3. .col: the column class floats columns to the left and assigns a padding.
4. .primary, .secondary., .tertiary: each class represents a column within the .col class div.  Typically, these classes have a width attribute.  Often, display is set to none for smaller widths.
5. .banner: on the Home page, there is a banner that specifies a background linear gradient, a height, and a bottom padding.  The text alignment is set to center, vertical alignment to middle.

## Custom JavaScript Functions
The JavaScript functions I created are:

1. buildOutput (projects.js): creates the html string containing all the projects
2. arrow functons: I used arrow functions in most cases, rather than declaring functions explicitly.  It was more in line with ES2015, and I became comfortable with it.
