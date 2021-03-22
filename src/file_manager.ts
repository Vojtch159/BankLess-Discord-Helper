import * as file from 'fs/promises';

export function find(line: string, filename: string): Promise<boolean> {
    return file.readFile(filename, 'utf8')
    .then((content) => {
        // rozdeľ obsah súboru do listu riadkov
        var lines: string[] = content.split(/\r?\n/);

        // lineárne vyhľadávanie
        for (let i = 0; i < lines.length; i++)
        {
            if (line == lines[i])
            {
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
