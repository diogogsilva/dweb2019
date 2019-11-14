let exec = require('child_process').exec
var filename, dbname

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question1 = () => {
    return new Promise((resolve, reject) => {
        rl.question("What's the file name (whitout .json)?  ", (answer) => {
            filename = answer
            resolve()
        })
    })
}
  
const question2 = () => {
    return new Promise((resolve, reject) => {
        rl.question("What's the database name?  ", (answer) => {
            dbname = answer
            resolve()
        })
    })
}
  
const main = async () => {
    await question1()
    await question2()
    rl.close()
    let command = 'mongoimport -d ' + dbname + ' -c ' + dbname + ' --file ' + filename + '.json --jsonArray'
    exec(command, (err, stdout, stderr) => {
        if(err){
            console.log(err)
        } else {
            console.log(stderr)
        }
    })
}

main()
