const express = require('express');

const app = express();

app.use(express.static('./dist/space-x'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/space-x' }
  );
});

app.listen(process.env.PORT || 8080);

