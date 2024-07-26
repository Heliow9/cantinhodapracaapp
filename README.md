# react-native-gs300

pdv gs300

## Installation

```sh
npm install react-native-gs300-print
```

## Usage

```js
import { print } from 'react-native-gs300-print';

// ...

 print(
      [
        {
          text: 'Hello World',
          size: 32,
          align: 0,
          bold: false,
          line: 1,
          width: 80,
          height: 0,
          type: 'text',
        },
        {
          text: 'Douglas',
          size: 32,
          align: 0,
          bold: true,
          line: 1,
          width: 80,
          height: 0,
          type: 'text',
        }
      ],
      { lineEnd: 2 }
    );
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
