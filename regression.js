#!/usr/bin/env node
import fs from 'fs'
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

let fileList = []
fs.readFile('changed_files.txt', 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    console.log('File content:\n',data);
    fileList = data.split('\n');
    console.log(fileList);

    for (const file of fileList){
        console.log(file)
        if(file === "source/backend/logic/userLogic.js"){
            try {
                const { stdout, stderr } = await execPromise('npx jest --coverage --testPathPatterns=source/backend/tests/unit/user.test.js');
                console.log(stdout);
                if (stderr) {
                    console.error(stderr);
                }
            } catch (error) {
                console.error('Error running tests:', error.message);
            }
        }else{
            console.log("user logic not changed")
        }
    }
  });