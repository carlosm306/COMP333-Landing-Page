# COMP333-Landing-Page
This landing page was created by Carlos Munoz and Franklin Mindich as part of an excercise for the Software Engineering course at Wesleyan University. The work between the group was split 50/50. 

The file landing_page.html contains the html for the main page defined in the project. We decided to make the landing page for a streaming website specifically dedicated to nature/animal movies. 

It can be previewed at:
https://carlosm306.github.io/COMP333-Landing-Page/landing_page.html 

The file style_sheet.css defines the style for all pages in the directory. The twelve webp images are used as sample movie posters on the home page. The image whose title begins with "earth" is used in the page contained in the iframe, map.html, which is a placeholder for an interactive map. We imagined that could be a good use for an iframe in this context because it would have promotional value for the site, but would use an application that might be external to it. The repo also includes a copyright notice, a placeholder for a signup page, and a placeholder for a "learn more" page, all of which can be reached through hyperlinks in the landing page. Aside from that, the repo contains this "read me" and a license. 

Queries to create SQL tables:

users:
CREATE TABLE users( username VARCHAR(255) PRIMARY KEY, password VARCHAR(255) );
![Screenshot from 2025-03-07 00-17-04](https://github.com/user-attachments/assets/27e68b15-bab9-475c-b21d-6a49292f8c1c)


reviews:
CREATE TABLE reviews( id int(10) PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255), movie VARCHAR(255), rating int(10), review VARCHAR(255) );
![Screenshot from 2025-03-07 00-17-14](https://github.com/user-attachments/assets/e0e850e5-98b9-4c6b-9a12-4329b357451b)

