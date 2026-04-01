import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // 1. Тест навантаження: розгін до 20 користувачів
    { duration: '1m', target: 20 },  // Стабільне навантаження
    { duration: '10s', target: 0 },  // Спад
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 2. Тест продуктивності: 95% запитів мають бути швидшими за 500мс
    http_req_failed: ['rate<0.01'],   // 3. Тест надійності: менше 1% помилок
  },
};

export default function () {
  // Тестуємо GitHub Pages або локальну адресу (якщо запущено)
  const res = http.get('https://lovelees125l.github.io/gemini-site/'); 
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'protocol is HTTP/2': (r) => r.proto === 'HTTP/2.0' || r.proto === 'h2',
  });
  
  sleep(1);
}