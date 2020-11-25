# GPX Info

This little web application allows users to select a GPX file,
that is then rendered to a canvas on the page. Also the track
information, such as distance and elevation are shown.

Find the deployed version [here](https://moritz-biersack.github.io/gpx-info/).

## Run and Build

```bash
# Clone the project and cd into it
npm i

# To run the local server (port 1234)
npm run start

# Build the project
npm run build
```

## Background

This project was mainly build in a day. I took the chance to try out
[Parcel](https://parceljs.org/) and set it up using Vue, Pug and Tailwindcss.

## Other Libraries used

The GPX parsing is done with [GPXParser.js](https://github.com/Luuka/GPXParser.js).
It is used to get the track data, such as name, distance and elevation.

The code to convert the GPX data is based on the 
[convert-gpx-file-to-svg](https://gitlab.com/cecilebruzac/convert-gpx-file-to-svg/-/tree/master).

The Mercator projection is inspired by the Python project
[gpx2svg](https://gitlab.com/l3u/gpx2svg).
