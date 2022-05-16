# social-api


To run the project on your local environment
- `npm run dev` or
- `npm start`

### ENV CONFIGURATION
    PORT=4000
    JWT_SECRET=9arFGaz4tZ
    JWT_EXPIRY=30d
    MONGO_URL=
    CLOUDINARY_URL=
    CLOUDINARY_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=


### BASE URL
`http://localhost:4000/api/v1/` or `https://example.com/api/v1/`



## LOGIN --> `/login`
```js
const axios = require('axios');
let data = JSON.stringify({
  "email": "jantu@gmail.com",
  "password": "123456"
});

let config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/login',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```

## SIGNUP --> `/signup`
```js
const axios = require('axios');
let data = JSON.stringify({
  "name": "Jantu",
  "email": "jantu12@gmail.com",
  "username": "jantu",
  "password": "123456"
});

let config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/signup',
  headers: { 
    'Content-Type': 'application/json', 
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```

## UPDATE USER DETAILS --> `/user/update_user_details`

```js
const axios = require('axios');

let data = new FormData();
data.append('photo', filePhoto);
data.append('banner', fileBanner);
data.append('bio', 'Test bio');
data.append('website', 'https://google.com');
data.append('location', 'Location');

let config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/user/update_user_details',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw', 
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```


## ADD POST --> `/posts`
```js
const axios = require('axios');
let data = new FormData();
data.append('description', 'This is a test tweet  2 from ritik');
data.append('image', imageFile);
data.append('tags', 'tag 1');
data.append('tags', 'tag 2');

let config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/posts',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw', 
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```
## GET POSTS (FEED) --> `/posts/feed/`
```js
const axios = require('axios');

let config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/posts/feed',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```
## GET ALL POSTS --> `/posts`
```js
const axios = require('axios');

let config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/posts',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```


## DELETE POST -->`/v1/post/:postId`

```js

const axios = require('axios');
let config = {
  method: 'delete',
  url: 'http://localhost:4000/api/v1/post/626ac6664f4a71414c1c2ecb',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw', 
  }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```

## GET BOOKMARKS --> `/user/bookmarks`
```js
const axios = require('axios');

let config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/user/bookmarks',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw'
  }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```

## ADD TO BOOKMARKS --> `/user/bookmarks`
```js

const axios = require('axios');
let data = JSON.stringify({
  "postId": "626ac6604f4a71414c1c2ec9"
});

let config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/user/bookmarks',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```

## REMOVE FROM BOOKMARK --> `/user/bookmark/:postId`

```js

const axios = require('axios');

let config = {
  method: 'delete',
  url: 'http://localhost:4000/api/v1/user/bookmark/626c337e8842b95c12da8700',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw'
  }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```

## LIKE A POST --> `/user/likes`

```js
const axios = require('axios');
let data = JSON.stringify({
  "postId": "626c337e8842b95c12da8700"
});

let config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/user/likes',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```

## DISLIKE A POST (REMOVE LIKE) -->`/user/like/:postId`

```js
const axios = require('axios');

let config = {
  method: 'delete',
  url: 'http://localhost:4000/api/v1/user/like/626c337e8842b95c12da8700',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw'
  }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```

## FOLLOW A USER --> `/user/follow`
```js

const axios = require('axios');
let data = JSON.stringify({
  "followeeId": "626863d469d50a86e0777ba1" // userId
});

let config = {
  method: 'put',
  url: 'http://localhost:4000/api/v1/user/follow',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```

## UNFOLLOW A USER --> `/user/un_follow`
```js

const axios = require('axios');
let data = JSON.stringify({
  "followeeId": "626863d469d50a86e0777ba1" //userId
});

let config = {
  method: 'patch',
  url: 'http://localhost:4000/api/v1/user/un_follow',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```

## ADD COMMENT -->`/post/comment`
```js

const axios = require('axios');
let data = JSON.stringify({
  "postId": "626ac6604f4a71414c1c2ec9",
  "body": "This is 2nd comment",
  "parentId": "626ba17aebd2afcd511ce1af" // need to add this for adding reply to a comment.
});

let config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/post/comment',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```

## GET COMMENTS -->`/post/comment/:postId`
```js
const axios = require('axios');

let config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/post/comment/626ac6604f4a71414c1c2ec9',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw'
  }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```

## DELETE COMMENT --> `/post/comment/:commentId`
```js
const axios = require('axios');

let config = {
  method: 'delete',
  url: 'http://localhost:4000/api/v1/post/comment/626ba13eebd2afcd511ce1ab',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2JkZTU1N2Y4ZWRiNzM3MjQ4ZGM0YiIsImlhdCI6MTY1MjI4NTAxNCwiZXhwIjoxNjU0ODc3MDE0fQ.yIfgTISVW6c3yMPsRijLrSwXuM0vFhhW5jxY6VgyyYw'
  }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```

## UPDATE COMMENT -->`/post/comment/:commentId`
```js

const axios = require('axios');
let data = JSON.stringify({
  "body": "This is an updated comment"
});

let config = {
  method: 'patch',
  url: 'http://localhost:4000/api/v1/post/comment/626ba17aebd2afcd511ce1af',
  headers: { 
    'Content-Type': 'application/json', 
    'Cookie': 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjg2M2U5NjlkNTBhODZlMDc3N2JhMyIsImlhdCI6MTY1MjI1OTg0OCwiZXhwIjoxNjU0ODUxODQ4fQ.RtEdRALknRphaxK0ANtADdN1cEWcUhx8w5__AxliibA'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```


