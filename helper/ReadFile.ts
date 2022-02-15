import fs from 'fs'

export default class ReadFile {

    async readTextFile(path: string): Promise<string[]> {
        let array: string[]
        fs.readFile(path, await function (err, data) {
            if (err) throw err;

            array = data.toString().replace(/\r\n/g, '\n').split('\n')
        });

        return array
    }
}