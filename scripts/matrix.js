const { execSync } = require('node:child_process');

const versions = ['4.6.1', '5.0.0', '5.1.0', '5.3.1'];
const scenarios = [
  { name: 'forRoot + new PinoLogger()', env: {} },
  { name: 'forRootAsync + new PinoLogger()', env: { MODE: 'async' } },
  { name: 'forRoot + injected PinoLogger', env: { INJECTED: '1' } },
  { name: 'forRootAsync + injected PinoLogger', env: { MODE: 'async', INJECTED: '1' } },
];

const rows = [];
for (const version of versions) {
  execSync(`npm install --no-save --silent --no-audit --no-fund nestjs-pino@${version}`, { stdio: 'ignore' });
  for (const scenario of scenarios) {
    const out = execSync('node dist/main.js', { env: { ...process.env, ...scenario.env } }).toString();
    rows.push({
      'nestjs-pino': version,
      scenario: scenario.name,
      'autoLogging: false honored': out.includes('"request completed"') ? 'NO' : 'yes',
      'customProps applied': out.includes('"service":"greeting-api"') ? 'yes' : 'NO',
    });
  }
}
execSync('npm install --silent --no-audit --no-fund', { stdio: 'ignore' });
console.table(rows);
