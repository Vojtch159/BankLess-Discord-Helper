import * as file from 'fs/promises';
import {createReadStream} from 'fs';
import {createInterface} from 'readline';

export function find(input: string, filename: string): Promise<boolean> {
    return file.access(filename)
    .then(async () => {
        // vytvor stream pre čítanie súboru
        const stream = createReadStream(filename);

        // čítanie súboru riadok za riadkom
        const readline = createInterface({
            input: stream,
            crlfDelay: Infinity
        });

        // lineárne vyhľadávanie
        for await (const line of readline) {
            if (line == input) {
                return true;
            }
        }
        
        return false;
    })
    .catch((/*err*/) => {
        //console.error(err);
        return false;
    });
}

export function append(input: string, filename: string) {
    // pridaj input na koniec súboru a hoď kurzor na druhý riadok
    file.appendFile(filename, input + '\n')
    .catch((err) => {
        // ak nastane error chýbajúceho adresára, vytvor priečinky a skús zapísať do súboru znovu
        if (err.code == 'ENOENT') {
            file.mkdir(filename.replace(filename.split('/')[filename.split('/').length - 1], ''));
            // ak súbor neexistuje, vytvor nový a zapíš input
            file.appendFile(filename, input + '\n')
            .catch((err) => {
                console.error(err);
            });
        }
        else {
            console.error(err);
        }
    });
}
