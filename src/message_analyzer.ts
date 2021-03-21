import * as filemngr from './file_manager';

const users: string = './data/users.txt';

const dane = new RegExp(/^z?da(n|ň)(e|i|í|it|iť)?$/i);
//const burzy = new RegExp(/^burz(a|u|y)$/i);

export async function read(message: string, userID: string): Promise<string> {
    // skontroluj či bol autor oboznamený
    if (!await filemngr.find(userID, users)) {
        // rozdeľ správu do listu slov podľa medzier, čiariek, otázníkov a podobne
        var words: string[] = message.split(/[\s,.!?]+/);

        // skontroluj či sa v správe nachádza slovo zhodné s jedným z keywords
        for (let i = 0; i < words.length; i++) {
            if (dane.test(words[i])) {
                // pridaj užívateľa do zoznamu oboznamených
                filemngr.append(userID, users);
                return 'povinně přečíst tenhle https://cryptopanda.cz/dane článek';
            }
            /*
            else if (burzy.test(words[i])) {
                return 'zde https://www.cryptopanda.cz/nakup-kryptomen můžeš nalézt naše tři doporučené burzy';
            }
            */
        }
    }

    return null;
}
