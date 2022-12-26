const axios = require('axios');
const pug = require('pug');
const fs = require('fs');
const path = require('path');

console.log('Post build starting...');

const build = './build';
const templates = './run/templates';
const defaultFiles = ['vod', 'playlist', 'profile'];

function getDate(number) {
  const date = new Date(number);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();

  return `${month}/${dayOfMonth}/${year}`;
}

axios
  .get(process.env.SHIP_URL || 'http://localhost:8080/shipment')
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
      if (fileName === 'index') fs.writeFileSync(path.join(build, fileName + '.html'), html);
      else {
        fs.mkdirSync(path.join(build, fileName));
        fs.writeFileSync(path.join(build, fileName, 'index.html'), html);
      }
    }

    for (const video of videos) {
      video.date = getDate(video.date);

      const filePath = path.join(templates, 'video.pug');
      const html = pug.compileFile(filePath)({ video, scripts });
      fs.mkdirSync(path.join(build, video.id));
      fs.writeFileSync(path.join(build, video.id, 'index.html'), html);
    }

    for (const playlist of playlists) {
      const filePath = path.join(templates, 'playlistItem.pug');
      const html = pug.compileFile(filePath)({ playlist, scripts });
      fs.mkdirSync(path.join(build, 'playlist', playlist.id));
      fs.writeFileSync(path.join(build, 'playlist', playlist.id, 'index.html'), html);
    }
  })
  .catch(console.error);
