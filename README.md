## ÚVOD
Toto je bot vytvořený uživatelem @DevDejvid
Bot odpovídá na zprávy, které obsahují keywords.

## PREREQUISITES
- Node.js pro spuštění bota
- Je nutné vytvořit samotného bota na stránce https://discord.com/developers/
- Je nutné přidat privátní token bota do `.env_template` a soubor přejmenovat na `.env`.

## INSTALACE
1. Projekt se naklonuje na server kde bude běžet. `git clone`
2. Instalace potřebných knihoven. `npm install`

## SPUŠTĚNÍ
```
npm run build
```
```
npm run start
```

## SPUŠTĚNÍ POMOCÍ DOCKERU
### PREREQUISITES
- Nainstalovaný [Docker](https://docs.docker.com/engine/install/)
- Je nutné přidat privátní token bota do `.env_template` a soubor přejmenovat na `.env`.
### SPUŠTĚNÍ
1. Build image: `docker build -t bankless_helper_bot:latest .`
2. Spuštění kontejneru: `docker run -d --restart=always --name bankless_bot_prod --env-file .env bankless_helper_bot:latest`
  - `-d` přepínač znamená, že se bot spustí v `detach` módu, tzn. nevypisuje výstup na konzoli (pro produkci ten přepínač nechat)
  - Výstup bota do konzole pak lze vypsat příkazem: `docker logs bankless_bot_prod`

- Víc info [zde](https://github.com/nomsi/docker-discordjs-tutorial/blob/master/3.%20Creating%20the%20Dockerfile%20and%20Running!.md)