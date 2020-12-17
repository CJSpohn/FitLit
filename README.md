# FitLit 

The details of the requirements for this project are outlined in [this project spec](http://frontend.turing.io/projects/fitlit.html).

The live site can be found [here](https://cjspohn.github.io/FitLit/).

## Overview

FitLit is a sample fitness application providing mock user data to a mock user at a glance. This was the partner project for our time during Mod 2 at the Turing School of Software and Design. The purpose of this application is to provide a sample fitness style dashboard that utilizes classes and methods to calculate and display data and external libraries to display the data on the DOM. 

Our user data is hosted locally within the project files. There are fifty sample users that span roughly 3 months of daily data across multiple categories. Data is made up of activity, hydration, and sleep information. Each category is displayed on the webpage in a corresponding dashboard. All data visualizations are constructed using d3.js. The site is optimized for small mobile, large mobile, tablet, and laptop devices. 

There is no installing required as our only dependency was utilized via CDN.

## Learning Goals

* Test Driven Development
* Incorporating 3rd party libraries to display data
* Expanding our understanding of DRY JavaScript, separate DOM and Data Model components, and HTML/CSS design

## Using the site.

First, select a sample user from the drop down and click 'Enter Dashboard' to be taken to the dashboard for that specific user.

<img src="https://user-images.githubusercontent.com/69563078/102534377-e4d47180-4063-11eb-903d-e7203660bed4.png">

Once on the dashboard, the user is welcomed. The profile button on the top right will take you to the profile screen for that user. The nav buttons can take you to different dashboards depending on the type of data you're looking to view. The current dashboard button is styled accordingly to let the user know what page they are viewing.

<img width="251" src="https://user-images.githubusercontent.com/69563078/102534490-0e8d9880-4064-11eb-9a93-3d6318f272a3.png">

Each dashboard is made up of several widgets including current daily information, weekly information, all time averages, and comparisons amongst all other users. Navigate between the dashboards to see the different widgets. The color of graphics and text correspond to the category of information being viewed as well.

<img width="242" alt="Screen Shot 2020-12-17 at 12 37 43 PM" src="https://user-images.githubusercontent.com/69563078/102534863-aab79f80-4064-11eb-8006-bc2a9f506bae.png">

<img width="232" alt="Screen Shot 2020-12-17 at 12 37 56 PM" src="https://user-images.githubusercontent.com/69563078/102534890-b1dead80-4064-11eb-8a3f-6703b800bbdf.png">

<img width="235" alt="Screen Shot 2020-12-17 at 12 38 12 PM" src="https://user-images.githubusercontent.com/69563078/102534919-bb681580-4064-11eb-9286-cb86fdeb69cb.png">

The graphs are dynamic and can be changed by selected the radio button or check boxes on their respective widgets. The graph reloads with a fun animation.

![Changing the graphs](https://user-images.githubusercontent.com/69563078/102535899-15b5a600-4066-11eb-86ed-ee24d181ad2f.gif)

Additionally, a user change select the range of dates to be displayed if they wish to view something other than a one week range. 

![Changing the dates](https://user-images.githubusercontent.com/69563078/102535821-ff0f4f00-4065-11eb-9100-1d041a022061.gif)

There is no local storage so to choose a different user, simply refresh the page.

## Wins 

The big takeaway from this project was utilizing d3.js to create our graphs. Neither of us had any prior experience with this library and through countless hours of YouTube tutorials and stackoverflow questions we were able to create a dynamic bar chart tailored to our needs for this project. We elected to include numbers corresponding to the values of each bar as opposed to having a y-axis. The scale of the chart is built dynamically to respond to the maximum range of the dataset we are looking at. We incorporated a date-picker so the user has control over the range of data points they see. As the number of bars increases, the position of the numbers changes from the middle of the bar to the start of the bar to help accomodate overflow. 

## Future Iterations

In future iterations we would like to spend more time on the styling of the project and on the functionality of our charts. We feel that because we attempted to take on something so challenging we were unable to spend as much time making the site look pretty as we did making the charts function the way we wanted them too. There are countless ways to express data visually on a page and we hope to continue learning and working with d3.js to create even more exciting visuals. 

## References

This project was written using HTML, CSS, and JavaScript. 

Unit testing was accomplished through node.js using Mocha and Chai.

We utilized the [d3.js](https://d3js.org/) library to create our graph displays of users' weekly data.

Aside from the water droplet on the Daily Ounces widget which was created by hand, all svg images were obtained from [freesvg.org](https://freesvg.org/)

## Authors

[Chris Spohn](https://github.com/CJSpohn)

[Luke Mason](https://github.com/LukeMason33)
