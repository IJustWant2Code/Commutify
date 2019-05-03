const express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  request = require('request'),
  querystring = require('querystring'),
  PORT = 8888;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000'}));
  
// var client_id = 'INSERT SPOTIFY CLIENT ID'; 
// var client_secret = 'INSERT SPOTIFY API KEY';  
var redirect_uri = 'http://localhost:8888/callback'; 


app.get('/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: 'user-read-private user-read-email playlist-modify-public playlist-modify-private streaming user-read-birthdate ugc-image-upload',
        redirect_uri: redirect_uri,
      }))
  })
  
  app.get('/callback',(req, res) => {
    const code = req.query.code || null
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(
            client_id + ':' + client_secret
          ).toString('base64'))
      },
      json: true
    }
    request.post(authOptions,(error, response, body) => {
      var access_token = body.access_token
      const uri = 'http://localhost:3000/main'
      res.redirect(uri + '?access_token=' + access_token)
    })
  })
  
  
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});