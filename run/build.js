const axios = require('axios');
const pug = require('pug');
const fs = require('fs');
const path = require('path');

console.log('Post build starting...');

const build = './build';
const templates = './run/templates';
const defaultFiles = ['index', 'vod', 'playlist', 'profile'];

function getDate(number) {
  const date = new Date(number);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();

  return `${month}/${dayOfMonth}/${year}`;
}

axios
  .get('http://localhost:8080/shipment')
  .then(res => {
    const baseFile = fs.readFileSync(path.join(build, 'index.html'));
    const base = baseFile.toString();

    const scripts = base.split(`sw.js"></script>`)[1].split(`</head>`)[0];

    const data = res.data;
    if (!data.ok) return false;

    const shipment = data.shipment;
    const playlists = shipment.playlists;
    const videos = shipment.videos;

    for (const fileName of defaultFiles) {
      const filePath = path.join(templates, fileName + '.pug');
      const html = pug.compileFile(filePath)({ videos, playlists, scripts });
      fs.writeFileSync(path.join(build, fileName + '.html'), html);
    }

    const video = videos[0];
    video.date = getDate(video.date);

    const filePath = path.join(templates, 'video.pug');
    const html = pug.compileFile(filePath)({ video, scripts });
    fs.writeFileSync(path.join(build, video.id + '.html'), html);
  })
  .catch(console.error);
