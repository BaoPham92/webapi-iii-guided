# Middleware Notes

## Jargon

Separation of Concerns.

_we do NOT write code for the computer, code is a communication device, a way to reveal our intentions to the next developer_

_optimize for readability_

**EVERYTHING IS MIDDLEWARE!!**

Well, almost everything :-)

## Types (based on how we got it or who built it)

- built-in: included with express. ex: `express.json()`
- third party: must be installed from `npm`
- custom: we code these!!

## Types (based on how it's being used)

- global: runs on every request
- local: used for a set of routes only.

Order matters, it goes top to bottom and left to right.

write a middleware function that logs the HTTP method and the URL visited by the client

should log to the console something that looks like this: `GET /` or `GET /api/hubs`
