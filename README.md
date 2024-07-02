# SwiftUI in Javascript
an attempt to implement SwiftUI in javascript 

> just for fun, update occasionally

check <https://swiftuijs.github.io/ui> to have a quick look

current implemented components with limited props:
* HStack
* VStack
* ZStack
* ScrollView
* Spacer
* Text


## development
```bash

# install dependencies
yarn install

# add new component
yarn gen

# start dev server, modify demo/app.tsx to change the demo
yarn dev

# preview storybook
yarn storybook

# build library
yarn build

# build storybook(docs)
yarn build-sb

```