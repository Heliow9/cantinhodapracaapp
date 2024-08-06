import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-gs300' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Gs300 = NativeModules.Gs300
  ? NativeModules.Gs300
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

export function printTest(): void {
  return Gs300.printTest();
}

type PrintData = {
  value: string;
  size: number;
  textType: number;
  isUnderLine: boolean;
  alignment: 0 | 1 | 2;
  lineSpace: number; //0;
  paperWidth: number; //80 | 58;
  type: 'text';
};

type PrintBarcode = {
  value: string;
  symbology: number;
  height: number;
  width: number;
  alignment: number;
  textPosition: number;
  type: 'barcode';
};

type PrintQRCode = {
  value: string;
  size: number;
  align: number;
  type: 'qrcode';
};

type PrintSpace = {
  line: number;
  type: 'space';
};

type PrintCut = {
  type: 'cut';
};

type PrintStart = {
  type: 'start';
};

export type IPrint =
  | PrintData
  | PrintBarcode
  | PrintQRCode
  | PrintSpace
  | PrintCut
  | PrintStart;

type PrintConfig = {
  cutEnd?: boolean;
  lineStart?: number;
  lineEnd?: number;
};

export function onPrint(i: IPrint[], config: PrintConfig = {}): void {
  if (i.length === 0) return;

  if (config.lineStart && typeof config.lineStart === 'number') {
    i.unshift({ type: 'space', line: config.lineStart });
  }
  if (config.lineEnd && typeof config.lineEnd === 'number') {
    i.push({ type: 'space', line: config.lineEnd });
  }

  if (config.cutEnd !== false) {
    if (i[i.length - 1]?.type !== 'cut') {
      i.push({ type: 'cut' });
    }
  }

  return Gs300.onPrint(JSON.stringify(i));
}

export function ImprimiPDV(
  texto: string,
  fontSize: number,
  fontFamily: number,
  align: number
): void {
  return Gs300.ImprimiPDV(texto, fontSize, fontFamily, align);
}


export function cutPDV() {
  Gs300.cutPDV()
}


export function linePDV(
  line: number
): void {
  return Gs300.linePDV(line)
}

export function PayTEF(
  value: String,
  paymentMethod: String,

): void {
  console.log(value)
  return Gs300.onTef(value, paymentMethod)
}


export function pixTEF(){

  Gs300.onTefPix()
}



export function printImageBase64(
  base64: string,
  align: 0 | 1 | 2,
  paperWidth: 58 | 80,
  lineEnd: number,
  isCut: boolean
): void {
  return Gs300.onPrintImageBase64(base64, align, paperWidth, lineEnd, isCut);
}

export function printImageFile(
  file: string,
  align: 0 | 1 | 2,
  paperWidth: 58 | 80,
  lineEnd: number,
  isCut: boolean
): void {
  return Gs300.onPrintImageFile(file, align, paperWidth, lineEnd, isCut);
}
