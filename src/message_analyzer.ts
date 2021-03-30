import {readFileSync} from 'fs';
import {createHash} from 'crypto';
import * as filemngr from './file_manager';

const directory: string = './config/';

type keyword = {
    keyword: string,
    regex: string,
    response: string
}

var keywords: keyword[];

export function config() {
    try {
        // načítaj slová do pamäte
        keywords = JSON.parse(readFileSync(directory + 'keywords.json', 'utf8'));
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export async function read(message: string, userID: string): Promise<string> {
    // rozdeľ správu do listu slov podľa medzier, čiariek, otázníkov a podobne
    var words: string[] = message.split(/[\s,.!?]+/);
    
    // skontroluj či sa v správe nachádza slovo zhodné s jedným z keywords
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < keywords.length; j++) {
            if (RegExp(keywords[j].regex, 'i').test(words[i])) {
                // vypočítaj hash z ID užívateľa pomocou algoritmu SHA256 s výsledkom v hexidecimálnej podobe
                let userHash: string = createHash('sha256').update(userID).digest('hex');
                // skontroluj či bol autor oboznamený
                if (!await filemngr.find(userHash, directory + keywords[j].keyword + '.txt')) {
                    // pridaj užívateľa do zoznamu oboznamených
                    filemngr.append(userHash, directory + keywords[j].keyword + '.txt');
                    // pošli odpoveď
                    return keywords[j].response;
                }
            }            
        }
    }

    return null;
}
