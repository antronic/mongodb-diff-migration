require('dotenv').config()

import { exec } from 'node:child_process'

(async function () {

  function getMongoExportCommand(): string {
    return `mongoexport --uri="${process.env.SOURCE_URI}" --db="${process.env.SOURCE_DATABASE}" --collection="${process.env.SOURCE_COLLECTION}" --out="${process.env.SOURCE_OUTPUT_FILE}" --query='${process.env.SOURCE_QUERY}'`
  }

  function getMongoImportCommand(): string {
    return `mongoimport --uri="${process.env.TARGET_URI}"  --db="${process.env.TARGET_DATABASE}" --collection="${process.env.TARGET_COLLECTION}" --file="${process.env.SOURCE_OUTPUT_FILE}"`
  }

  function exportData(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(getMongoExportCommand(),
          (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            reject(error)
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
          resolve(stdout)
        }
      )
    })
  }

  function importData(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(getMongoImportCommand(),
          (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            reject(error)
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
          resolve(stdout)
        }
      )
    })
  }

  function listFiles(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec('ls', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject(error)
          return;
        }
        console.log(`stdout:\n${stdout}`);
        console.error(`stderr: ${stderr}`);
        resolve(stdout)
      })
    })
  }

  console.log(
    `-----------------------------------------
    Running script...
-----------------------------------------
    `)

  console.log('### Please copy and paste the following commands to your terminal ###')

  console.log('### Export data from source database ###')
  console.log(getMongoExportCommand())

  console.log('### Import data to target database ###')
  console.log(getMongoImportCommand())

  // await exportData()
  // await importData()

})()