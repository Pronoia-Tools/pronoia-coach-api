 autocannon https://pronoia.rour.dev/util -H authorization="Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1NWUyOTRlZWRjMTY3Y2Q5N2JiNWE4MTliYmY3OTA2MzZmMTIzN2UiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoianVuYSBwYWJsbyB1cnp1cyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9wcm9ub2lhLXdlYi1hcHAiLCJhdWQiOiJwcm9ub2lhLXdlYi1hcHAiLCJhdXRoX3RpbWUiOjE2MzcxODY0MzEsInVzZXJfaWQiOiI5MmVhVWxPbGhxU1JtSjVTNTYwemxhOXBwTGgyIiwic3ViIjoiOTJlYVVsT2xocVNSbUo1UzU2MHpsYTlwcExoMiIsImlhdCI6MTYzNzE4NjQzMSwiZXhwIjoxNjM3MTkwMDMxLCJlbWFpbCI6ImpwQHJvdXIuZGV2IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpwQHJvdXIuZGV2Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Hek4BImeWJ_bNAkfmeK-Vvb9-2r9QYbYFyhkwbLVyLmXapof9dm_Y7byvu_N6wn7kd6bzTnXTdX_XiKy7D60ts_TjPjmOqyOtbIP9iR1KnvCEQ_fhFATO4iYiPh4SQg1BLRLqOALzlkXYMP7fhX8AxZivwcR_TC3NYQO2hbhW7MYZvma7xrUa9xw8-Y119OtXvi3AeOOI_zkV8M5lXYebxfPb-qwcCGuFt4jEVN3Cj9Yfq09vOEvUy4QyoSb9p5Cb4x7kl2lBpxwqsZi8Eif7NBpZbQyv-eljrA7tkJePddCdTQICk-YsiYYm8wDPPJTJOhA0wZ--gMwiFiwJsx9Mg" -d 60 -c 2






First for some context, in my dayjob one of the servers has 3,700 users.
Over the last 30 days it received 1,7M of requests. Let's do some broad math.
Let's round to 2M requests, and only consider 20 days (weekdays).
Tha gives us 100k a day. If we say workhours are 8, that gives us 12,5k requests per hour.
=> 208,3 requres per minute => 3,5 requests per second.

Now, I've created an enpoint that:N=

- authenticates the user
- creates an user
- creates a tag
- creates a random number (1-10) of workbooks
- those workbooks are assaing the created user and the created tag
- deletes the workbooks
- deletes the tag
- deletes the user
- responds with the date of the created objects

then I load tested against that endpoint.

Scenario 1 - 395 requests in 60.03s - avg 6,5 requests per second - not bad latency:

┌─────────┬────────┬────────┬────────┬─────────┬───────────┬───────────┬─────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%     │ Avg       │ Stdev     │ Max     │
├─────────┼────────┼────────┼────────┼─────────┼───────────┼───────────┼─────────┤
│ Latency │ 163 ms │ 277 ms │ 512 ms │ 1138 ms │ 303.71 ms │ 186.02 ms │ 2438 ms │
└─────────┴────────┴────────┴────────┴─────────┴───────────┴───────────┴─────────┘
┌───────────┬─────┬──────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%  │ 2.5% │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────┼──────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 0   │ 0    │ 7       │ 9       │ 6.55    │ 1.99    │ 2       │
├───────────┼─────┼──────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 0 B │ 0 B  │ 21.7 kB │ 29.2 kB │ 21.3 kB │ 5.92 kB │ 5.98 kB │
└───────────┴─────┴──────┴─────────┴─────────┴─────────┴─────────┴─────────┘


Scenario 2 - 1k Requests in 60.02s - avg 17.69 requests per second - worsen latency but acceptable: 

┌─────────┬────────┬────────┬─────────┬─────────┬───────────┬───────────┬─────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%   │ 99%     │ Avg       │ Stdev     │ Max     │
├─────────┼────────┼────────┼─────────┼─────────┼───────────┼───────────┼─────────┤
│ Latency │ 217 ms │ 513 ms │ 1111 ms │ 2340 ms │ 562.45 ms │ 320.79 ms │ 2941 ms │
└─────────┴────────┴────────┴─────────┴─────────┴───────────┴───────────┴─────────┘
┌───────────┬─────┬──────┬─────────┬─────────┬─────────┬─────────┬──────┐
│ Stat      │ 1%  │ 2.5% │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min  │
├───────────┼─────┼──────┼─────────┼─────────┼─────────┼─────────┼──────┤
│ Req/Sec   │ 0   │ 3    │ 19      │ 23      │ 17.69   │ 5.19    │ 3    │
├───────────┼─────┼──────┼─────────┼─────────┼─────────┼─────────┼──────┤
│ Bytes/Sec │ 0 B │ 6 kB │ 60.9 kB │ 74.4 kB │ 57.4 kB │ 16.6 kB │ 6 kB │
└───────────┴─────┴──────┴─────────┴─────────┴─────────┴─────────┴──────┘


90 usd aprox a month once free tier done:

https://calculator.aws/#/estimate?id=f7e606549242e18243e2df83ba946f1aff81738e

https://www.techempower.com/benchmarks/#section=data-r20&hw=ph&test=composite&a=2