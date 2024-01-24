heya!

whn you publish this package to gh npm packages please

add to `.npmrc` this line
```
@NAMESPACE:registry=https://npm.pkg.github.com
```

add to `package.json` these lines
```json
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
```

and change to package name to `@0charliecat/altsource`


