# $${\color{lightblue}Hack KU \space 2024}$$  
## $${\color{lightblue}Theme: Social \space Good}$$ 
### $${\color{lightblue}Project: gLitter \space \space \space \space Members:Averi,Ryland,Riley,Aryan}$$ 

<p align="center">
  <img src="https://raw.githubusercontent.com/m-riley04/HackKU2024/main/hack-ku-2024/images/banner.png" style="width: 600px"/>
</p>

## ${\color{lightpink}Purpose}$  
Glam up your community by picking up litter through this competitive and educational web app. Users will be able to upload locations of trash which will challenge others to go and pick it up, racking them up points with every piece collected and properly disposed of. Once the trash is disposed of users will also have facts available to them about the litter they are cleaning, allowing them to gain a wide range of knowledge about how our human activities affect the world we live in. You can find the DevPost project [here](https://devpost.com/software/glitter).

## ${\color{lightpink}Specifics}$
**Frameworks** <br/>
- Node 21.5.0 <br/>

**Dependencies**
- react ^18.2.0
- react-dom ^18.2.0 
- react-bootstrap ^2.10.2
- express ^4.19.2
- react-geolocated ^4.1.2
- react-html5-camera-photo ^1.5.11
- sass ^1.75.0
- bootstrap ^5.3.3
- react-google-maps ^0.8.3
- openai ^4.33.1
- bigquery ^0.0.6
## ${\color{lightpink}How \space To \space Use}$
1. Visit our Google Cloud-hosted url [here](https://hackku2024-lz3sc7ogqa-uc.a.run.app) on a mobile device.
2. Log into your gLitter account
3. Start making the world a better place!

## ${\color{lightpink}Technology \space used}$
Google Cloud <br />
BigQuery <br />
Google Maps API <br />
Node.JS <br />
React (TypeScript) <br />
Roboflow <br />



## ${\color{lightpink}Inspiration}$
Following the theme track of social good one of the biggest issues that affects not just us but the environment as a whole is litter. Our project aims to give more of an incentive for people looking to try to keep their community and local environment a little cleaner. By adding game mechanics such as levels and leaderboards for cleaning up litter we hope to achieve that goal. 

---
## ${\color{lightpink}What \space it \space does}$
What gLitter aims to do is to make users more aware of the environment by giving collected litter a value and a means to compete against other people. Giving a value to litter will make people more aware of any trash they could pass by without even noticing. With a way to score the collected litter, we hope this would drive users to collect as much as they can to get a higher score leading to a cleaner environment as a side effect. But there is no point in gaining a higher score without having a way to show you have the highest score. With the implementation of a leaderboard, it adds a layer of competitiveness within the app hoping to increase users' drive to collect more litter. Also with every photo that is taken a fact about recycling and or the environment is shown.

---
## ${\color{lightpink}How \space we \space built \space it}$
gLitter is built with React on the web host with Google Cloud. gLitter includes a map for users to search and mark where areas of litter and trash are using Google Maps API. The browser uses tracking data given by the user to place markers on the map. To submit and gain points for collecting trash, the user takes a picture in the app and a machine vision model scans the image for various types of trash to award points.  By using Roboflow and a dataset of 1500 annotated pictures of litter was used to train different available models on Roboflow. 

---
## ${\color{lightpink}Challenges \space we \space ran \space into}$
The first main challenge was getting location data for users to add markers to the map. We first thought we would have to use geotags when a user took an image on the app but since this is a web app the browser can simply request location data from the user. 

The Second main challenge was adding the trained vision model into the app to be used to scan and detect trash from the uploaded photos. Roboflow offers a way to add the model within the web but with how the app is hosted on Google Cloud some issues couldn't be solved. The javascript add-on that Roboflow provides has limited functionality for the problem we had run into so had to use Openai GPT-4 API with some prompt engineering as a backup.

---
## ${\color{lightpink}Accomplishments \space that \space we're \space proud \space of}$
One accomplishment we are proud of is the potential of our app to make a change for the environment even in the slightest. While using multiple technologies to implement even a basic draft of our idea.

---
## ${\color{lightpink}What \space we \space learned}$
From making gLitter we have learned how to make a React web app that uses location data, takes a photo with direct upload in the browser, how to make data sets to train an AI, uses Google Maps API, Google Cloud for hosting, and Google database for storing users.

---
## ${\color{lightpink}What's \space next \space for \space gLitter}$
Future updates for gLitter included weekly challenges, a friends list, an in-game shop such as decorations for user profiles, and local events.
The biggest update would be moving from a web app to mobile apps on both android and Apple devices. 


