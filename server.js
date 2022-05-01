const express = require('express');
const redis = require('redis');

/**
 * redis 의 host 는 redis-cli 주소 값으로 다음과 같다.
 * 
 * 1. docker 환경 : docker-compose.yml 에 명시한 컨테이너 이름
 * 2. docker 아닌 환경
 *  2.1. redis-cli 를 로컬에서 실행한 경우 : 127.0.0.1
 *  2.2. redis-cli 를 외부에서 실행한 경우 : 해당 http 경로
 */
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});

const PORT = 8000;
const HOST = '0.0.0.0';

const app = express();

client.set('number', 0);

app.get('/', (req, res) => {

    /**
     * 현재 숫자를 가져온 후에 1씩 올려줍니다.
     */
    client.get('number', (err, number) => {
        client.set('number', +number + 1);

        res.send(`숫자가 1씩 올라갑니다. 숫자 : ${number}`);
    });
    
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);