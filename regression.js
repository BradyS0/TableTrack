#!/usr/bin/env node
//this file was created using help from Github Copilot
import fs from 'fs'
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

let fileList = []

await cmd("./changed_files.sh --mode since-branch --base dev")

fs.readFile('changed_files.txt', 'utf8', async (err, data) => {
    if(err){
      console.error('Error reading file:', err);
      return;
    }
    fileList = data.split('\n');
    console.log(fileList);

    let npm_installed = false;
    let db_running = false;

    if(fileList.includes("source/backend/logic/userLogic.js")){
        if(npm_installed == false){
            await cmd('npm install')
            npm_installed = true
        }
        await cmd('npx jest --coverage --testPathPatterns=source/backend/tests/unit/user.test.js');
    }
    
    if(fileList.includes("source/backend/routes/user.js") 
        || fileList.includes('source/backend/testSetup.js')){
        if(npm_installed == false){
            await cmd('npm install')
            npm_installed = true
        }
        if(db_running == false){
            await cmd('docker-compose -f source/backend/docker-compose.test.yml up -d');
            db_running = true;
        }
        await cmd('npx jest --config=source/backend/jest.integration.config.js --testPathPatterns=tests/integration/user.test.js');
    }

    if(db_running){
        await cmd('docker-compose -f source/backend/docker-compose.test.yml down -v');
        db_running = false;
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