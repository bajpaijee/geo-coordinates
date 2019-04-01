# Geo Spatial Coordinates

This project is to fetch the nearest store of a provided kml flow.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run this project on a local machine one should have nodejs 8 or above, yarn already installed.

Yarn can be downloaded from following link 
```
https://yarnpkg.com/lang/en/docs/install/
```

Node can be installed from following link

```
https://nodejs.org/en/download/
```

### Installing

Once you will clone the code into your local system, open the terminal and reach till the directory.

And type the following command to install all the dependencies

```
yarn install
```

Once all the packages are installed successfully just write following command


```
yarn dev-server
```

Yay! now your server has started and you can start using the api. Open your chrome or safari browser and type following address.

```
localhost:3000/
```

Please note:

`You need to open google map account and then create google map api key and then needed to be copied in order to use google maps to fetch coordinates.`

## Running the tests

Test cases:
Input: “Stumpergasse 51, 1060 Vienna” Output: au_vienna_schoenbrunnerstr
Input: “Ungargasse 17, Vienna, Austria” Output: au_vienna_landstrasserhauptstr
Input: “Linzer Straße 7, Vienna, Austria” Output: au_vienna_dreyhausenstr
