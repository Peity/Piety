import fs from 'fs'
export default class ReadFile {

    readTextFile(path: string): string[] {
        const data= fs.readFileSync(path, {
            encoding: 'utf8',
            flag: 'r'
        })
        const arr = data.toString().replace(/\r\n/g,'\n').split('\n');

        return arr;
    }
}