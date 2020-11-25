<template lang="pug">
    div#canvas
        canvas#drawCanvas
</template>

<script>

import Vue from "vue"

module.exports = {
  data: function() {
    return {
        canvas: "",
    };
  },
  props: ["gpx"],
  watch: {
    gpx: function() {
      if(this.gpx) {
          drawOnGpxFileSelect(this.gpx);
      }
    }
  },
  methods: {
    run: function() {
    }
  }
}

function ptsFromGpx(data) {
  const trkpts = data.getElementsByTagName('trkpt');
  let pts = [];

  for (let i = 0; i < trkpts.length; i++) {
    const lat = trkpts[i].getAttribute('lat');
    const lng = trkpts[i].getAttribute('lon');
    pts[i] = {lat: parseFloat(lat), lng: parseFloat(lng)};
  }

  return pts;
}

function getPtsFromGpxFile(path) {
  return new Promise(function (resolve, reject) {
    let pts = [];
    const req = new XMLHttpRequest();

    req.open('GET', path, true);

    req.onreadystatechange = function (evt) {
      if (req.readyState === 4 && req.status === 200) {
        const gpx = req.responseXML;
        pts = ptsFromGpx(gpx);

        if (pts.length > 0) {
          resolve(pts);
        } else {
          reject(Error('Error'));
        }
      }

      if (req.readyState === 4 && req.status !== 200) {
        reject(Error('Error'));
      }
    };

    req.onerror = function () {
      reject(Error('Error'));
    };

    req.send(null);
  });
}

function mercatorProjection(lng, lat) {
    const r = 6378137.0;
    const x = r * lat * Math.PI / 180.0;
    const y = (-1) * r * Math.log(Math.tan((Math.PI / 4.0) + ((lng * Math.PI / 180.0) / 2.0)));

    return {x, y}
}


function moveToOrigin(pts) {
    let maxX = pts[0].x;
    let minX = maxX;
    let maxY = pts[0].y; 
    let minY = maxY;
    for (let i=0; i<pts.length; i++) {
        let coord = pts[i];
        if (coord.x < minX) {
            minX = coord.x;
        }
        if (coord.x > maxX) {
            maxX = coord.x;
        }
        if (coord.y < minY) {
            minY = coord.y;
        }
        if (coord.y > maxY) {
            maxY = coord.y;
        }
    }
    for (let i=0; i<pts.length; i++) {
        pts[i].x -= minX;
        pts[i].y -= minY;
    }
    return [
        maxX - minX,
        maxY - minY,
    ]
}


function drawInsideCanvas(pts) {

  let ptToDraw, lastDrawnPt = null;
  let points = [];

  for (let i = 0; i < pts.length; i++) {
    ptToDraw = mercatorProjection(pts[i].lat, pts[i].lng);
    points.push(ptToDraw);
  }
  const [w, h] = moveToOrigin(points);

  const scaleX = 300 / w;
  const scaleY = 300 / h;
  const maxScale = scaleX < scaleY ? scaleX : scaleY;
  
  const canvas = document.getElementById('drawCanvas');

  canvas.setAttribute('class', 'canvas');
  canvas.setAttribute('width', w*maxScale);
  canvas.setAttribute('height', h*maxScale);
  canvas.setAttribute('id', 'drawCanvas');

  const ctx = canvas.getContext('2d');

  ctx.scale(maxScale, maxScale);

  ctx.beginPath();
  ctx.lineWidth = 1/maxScale;
  ctx.strokeStyle = '#FFFFFF';
  for (let i = 0; i < points.length; i++) {
    let ptToDraw = points[i];
    if (lastDrawnPt) {
      ctx.moveTo(lastDrawnPt.x, lastDrawnPt.y);
      ctx.lineTo(ptToDraw.x, ptToDraw.y);
    }
    lastDrawnPt = ptToDraw;
  }
  ctx.stroke();

  console.log(canvas);
}


function drawOnGpxFileSelect(gpxContent) {
    const gpx = (new window.DOMParser()).parseFromString(gpxContent, 'text/xml');
    const pts = ptsFromGpx(gpx);

    drawInsideCanvas(pts);
}

</script>
