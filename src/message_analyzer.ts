const dane = new RegExp(/^z?da(n|ň)(e|i|í|it|iť)?$/i);
const burzy = new RegExp(/^burz(a|u|y)$/i);

export function read(message: string): string {
    // rozdel správu do listu slov pomocou medzier, čiariek, otáznikov a podobne
    var words: string[] = message.split(/[\s,.!?]+/);

    // skontroluj či sa v správe nachádza slovo zhodné s jedným z keywords
    for (let i = 0; i < words.length; i++) {
        if (dane.test(words[i])) {
            return 'povinně přečíst tenhle https://cryptopanda.cz/dane článek';
        }
        else if (burzy.test(words[i])) {
            return 'zde https://www.cryptopanda.cz/nakup-kryptomen můžeš nalézt naše tři doporučené burzy';
        }
    }
    
    return null;
}
