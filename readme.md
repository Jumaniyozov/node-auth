curl localhost:3000/register -H 'Content-Type: application/json' -d \
'{"email":"alex@gmail.com","name":"Alex","password":"Secret12","passwordConfirmation":"Secret12"}'

curl localhost:3000/login -H 'Content-Type: application/json' -d \
'{"email":"alex@gmail.com","password":"Secret12"}'

curl -X POST localhost:3000/logout --cookie \
'sid=s%3Aly4gTFBASuA0T1h0HLls7l6bKv-TUii2.N2GGaZ5GbJnOOdwRjtIYdckmbvoqRw3QvL1d3MOINr8'

curl localhost:3000/home --cookie \
'sid=s%3Aly4gTFBASuA0T1h0HLls7l6bKv-TUii2.N2GGaZ5GbJnOOdwRjtIYdckmbvoqRw3QvL1d3MOINr8'

curl -X POST 'localhost:3000/email/verify?id=...&token=...&expires=...&signature=...'

curl localhost:3000/email/resend -H 'Content-Type: application/json' -d '{"email":"alex@gmail.com"}'

curl localhost:3000/password/email -H 'Content-Type: application/json' -d '{"email":"alex@gmail.com"}'

curl 'localhost:3000/password/reset?id=...&token=...' \
-H 'Content-Type: application/json' -d '{"password":"Secret12","passwordConfirmation":"Secret12"}'

curl localhost:3000/password/confirm -H 'Content-Type: application/json' -d '{"password":"Secret12"}' \
--cookie 'sid=s%3Aly4gTFBASuA0T1h0HLls7l6bKv-TUii2.N2GGaZ5GbJnOOdwRjtIYdckmbvoqRw3QvL1d3MOINr8'
