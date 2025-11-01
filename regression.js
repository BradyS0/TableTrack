#!/usr/bin/env node
//this file was created using help from Github Copilot
import fs from 'fs'
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

let fileList = []
fs.readFile('changed_files.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    console.log('File content:\n',data);
    fileList = data.split('\n');
    console.log(fileList);

    for (const file of fileList){
        console.log(file);
        if(file === "source/backend/logic/userLogic.js"){
            cmd('npx jest --coverage --testPathPatterns=source/backend/tests/unit/user.test.js');
        }
        let db_running = false;
        if(file === "source/backend/routes/user.js"){
            cmd('docker-compose -f /source/backend/docker-compose.test.yml up -d');
            db_running = true;
            cmd('jest --config=source/backend/jest.integration.config.js --coverage --testPathPattern=tests/integration/user.test.js');
        }
        
        if(db_running){
            cmd('docker-compose -f /source/backend/docker-compose.test.yml down -v');
            db_running = false;
        }
    }
  });

async function cmd(cmd) {
    try {
        const { stdout, stderr } = await execPromise(cmd);
        console.log(stdout);
        if (stderr) {
            console.error(stderr);
        }
    } catch (error) {
        console.error('Error running tests:', error.message);
    }
}