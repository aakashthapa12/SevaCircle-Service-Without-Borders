#!/usr/bin/env node

/**
 * Health Check Script - Verify both services are running
 */

const http = require('http');

function checkService(host, port, name) {
  return new Promise((resolve) => {
    const options = {
      hostname: host,
      port: port,
      path: '/',
      method: 'GET',
      timeout: 5000,
    };

    const req = http.request(options, (res) => {
      resolve({
        name,
        port,
        status: 'RUNNING ✅',
        statusCode: res.statusCode,
      });
    });

    req.on('error', () => {
      resolve({
        name,
        port,
        status: 'NOT RUNNING ❌',
      });
    });

    req.on('timeout', () => {
      resolve({
        name,
        port,
        status: 'TIMEOUT ⏱️',
      });
    });

    req.end();
  });
}

async function runHealthCheck() {
  console.log('\n🏥 Service Health Check\n');
  console.log('═'.repeat(50));

  const frontend = await checkService('localhost', 3000, 'Frontend (Next.js)');
  const backend = await checkService('localhost', 3001, 'Backend (NestJS)');
  const backendHealth = await checkService(
    'localhost',
    3001,
    'Backend Health Endpoint',
  );

  console.log(`\n📱 ${frontend.name}`);
  console.log(`   Port: ${frontend.port}`);
  console.log(`   Status: ${frontend.status}`);
  if (frontend.statusCode)
    console.log(`   HTTP: ${frontend.statusCode}`);

  console.log(`\n🔧 ${backend.name}`);
  console.log(`   Port: ${backend.port}`);
  console.log(`   Status: ${backend.status}`);
  if (backend.statusCode)
    console.log(`   HTTP: ${backend.statusCode}`);

  console.log(`\n💚 ${backendHealth.name}`);
  console.log(`   Port: ${backendHealth.port}`);
  console.log(`   Status: ${backendHealth.status}`);
  if (backendHealth.statusCode)
    console.log(`   HTTP: ${backendHealth.statusCode}`);

  console.log('\n' + '═'.repeat(50));
  console.log('\n📖 Access URLs:\n');
  console.log(`   Frontend: http://localhost:3000`);
  console.log(`   Backend: http://localhost:3001`);
  console.log(`   Health: http://localhost:3001/api/health\n`);

  const allRunning =
    frontend.status.includes('✅') && backend.status.includes('✅');

  if (allRunning) {
    console.log('🎉 All services are running! Ready for development.\n');
  } else {
    console.log('⚠️  Some services are not running. Please start them:\n');
    console.log('   Terminal 1: cd backend && npm run start');
    console.log('   Terminal 2: cd local-services-ui && npm run dev\n');
  }
}

runHealthCheck();
