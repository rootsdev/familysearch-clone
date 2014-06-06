familysearch-clone
==================

Clone of the FamilySearch tree functionality

Overview
========

* The majority of the FamilySearch Family Tree functionality, with the exception of memories, 
has been replicated in this open-source project. 

* The project consists of 80+ re-usable 'components' written as AngularJS directives.
You may use these components even in non-AngularJS projects.

* Together the components weigh in at roughly 6,000 lines of javascript.

* Feel free to fork this project and tweak it for your own needs, or to drop specific components into your own project.
 
* The project uses the [FamilySearch Javascript SDK](https://github.com/rootsdev/familysearch-javascript-sdk)
and serves as an example of using the SDK to build large-scale FamilySearch applications.

Getting started
===============

The clone is somewhat in a state of flux. 
The majority of the functionality is complete, but a few things remain to be implemented.
Most functionality should be complete by June 14.
Eventually we will have packaged releases with javascript files that you can download.
But for now, you'll have to build the project yourself by following the instructions below.

First, set up your build environment:

* Fork this repo and cd into its directory
* Run `npm install` to install the build dependencies
* Run `npm install -g bower` to install bower
* [Install the grunt-cli ](http://gruntjs.com/getting-started#installing-the-cli)
* [Install PhantomJS](http://phantomjs.org/download.html)

Next, get an app key and redirect URI from FamilySearch:

* Get an 'app key' from FamilySearch developer support if you do not already have one.
* Enter your app key in src/app/app.js
* Ask FamilySearch developer support to add 'http://localhost:9000/#!/auth' as an approved OAuth redirect URL.

Now you can run the project on your local machine:

* Run `bower install` to install the bower dependencies
* Run `grunt watch` to have grunt launch a server and watch for changed files with live-reload support.
* Point your browser to [http://localhost:9000](http://localhost:9000) 
and sign in using your sandbox account user name and password.

You can also upload the project to a public web server and run it there 
([I use S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)):  

* Ask FamilySearch developer support to add an OAuth redirect URL for your public web server 
(the host name and port must match your web server; the path can be anything you want).
* Edit src/app/app.js to change the OAuth callback to your new URL.  
* Run `grunt` to build the project
* Copy the `bin` directory to your web server
* Launch a browser and navigate to your web server.

Using Components in Non-AngularJS Applications
==============================================

The components are written in AngularJS, and AngularJS brings a lot of benefits to writing web applications.
However, you can also use the components outside of AngularJS.
See `examples/person-profile.html` for an example.
 
To run this example:

* run `grunt` to build the app
* start a web server in the project root directory; e.g., `python -m SimpleHTTPServer 9000`
* point your browser to 
[http://localhost:9000/examples/person-profile.html](http://localhost:9000/examples/person-profile.html)