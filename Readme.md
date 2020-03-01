# Skynet CLI

The `skynet-cli` utility allows you to upload files to the [Sia Skynet](https://siasky.net/) CDN with ease.

![skynet-cli](https://siasky.net/PAKkm1jjjW-wcNDTiXtogd6epOt3YINtthT2Sy5bGB146w)

## Installation

Ensure you're using a recent nodejs version, ideally `10.16.3+` and above, and install with npm:

```
$ npm install -g skynet-cli
```

## Usage

```

  Usage: skynet-cli [options] [file ...]

  Options:

    -h, --help            output usage information
    -V, --version         output the version number
    -f, --filename        assign filename to stdin upload

```

## Examples

Examples illustrating how to use the command-line tool to upload files.

### Uploading single file

```
$ skynet-cli reflection.png

 reflection.png : 92%
         stream : https://siasky.net/cHFtYYeB8fJ
```

#### Multiple Files

Upload several files at once by passing multiple filenames:

```
$ skynet-cli simon-*.png

              simon-1.png : https://siasky.net/iqd4NLa13ZV
              simon-2.png : https://siasky.net/iCxBKJZAm36
              simon-3.png : https://siasky.net/iEzTZXvVRYP
              simon-4.png : https://siasky.net/iRYA6bLp70E
              simon-5.png : https://siasky.net/ilMqsXxtTsV
              simon-6.png : https://siasky.net/ilVngVMMeSd
              simon-7.png : https://siasky.net/i1Tx8vkIbCC
              simon-8.png : https://siasky.net/ifUKcaz5I3A
    simon-ball-ocean.png… : https://siasky.net/iCA5N2PCJJS
    simon-ocean-stick-2.… : 71%
    simon-ocean-stick.pn… : 55%
          simon-ocean.png : 74%
                   stream : https://siasky.net/c7WwhIwSl6Y
```

#### STDIN

When no filenames are given `skynet-cli(1)` reads from **stdin**:

```
$ echo 'hello world' | skynet-cli
```

A filename can be passed to help interpret the content:

```
$ echo 'hello __world__' | skynet-cli --filename hello.md
```

## Attribution

Adapted from [Automattic/cloudup-cli](https://github.com/Automattic/cloudup-cli) for the [Gitcoin Skynet Hackathon Challenge](https://gitcoin.co/issue/NebulousLabs/Skynet-Hive/1/4058)

## Licence

MIT
