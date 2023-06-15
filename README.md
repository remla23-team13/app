# App

The app serves as the frontend of the restaurant review project for the [Release Engineering for Machine Learning Application](https://se.ewi.tudelft.nl/remla/) course of the TU Delft. 
See [operation](https://github.com/remla23-team13/operation) for a more detailed view of how the project is setup.
On the frontend a user will be able to leave a review for one of the featured restaurants. 
Our backend, [model-service](https://github.com/remla23-team13/model-service),  will take this review and rate it as either positive or negative. 
The reviewer can see this result, and they get the opportunity to indicate whether this was their actual sentiment when writing the review or not. 

[//]: # (Other features include: )
[//]: # (* TODO)

There are several ways of using this application, if you want to run the complete project see [operation](https://github.com/remla23-team13/operation). 
Every time there is a merge or commit to main the app package is updated so operation will always use the most recent code.
To run the application using docker see the instructions below. 
If you want to run the repository locally instead we advise you to use a virtual environment and to use Python v3.9.

### docker
Make sure you have docker installed and running, we are using docker v20.10. 
Run the following commands:

[//]: # (TODO: this does not work)
```bash
docker build . --tag whoop-app
docker run -p 3000:3000 -d whoop-app
```
For more information on Docker you can look at their documentation or to [this](https://se.ewi.tudelft.nl/remla/material/containerization/) section on the REMLA course website.
