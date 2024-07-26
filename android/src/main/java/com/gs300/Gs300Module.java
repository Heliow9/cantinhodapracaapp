package com.gs300;

import androidx.annotation.NonNull;

import com.google.gson.Gson;
import java.util.Map;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.Callback;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import com.elotouch.AP80.sdkhelper.AP80PrintHelper;

@ReactModule(name = Gs300Module.NAME)
public class Gs300Module extends ReactContextBaseJavaModule {
  public static final String NAME = "Gs300";
  private AP80PrintHelper printHelper;

  public Gs300Module(ReactApplicationContext reactContext) {
    super(reactContext);
    printHelper = AP80PrintHelper.getInstance();
    printHelper.initPrint(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  private void printCupom() {
    printHelper.printData("Gertec do Brasil", 32, 0, false, 1, 80, 0);
    printHelper.printData("Av. Jabaguara, 3060 - Mirandopolis", 30, 0, false, 1, 80, 0);
    printHelper.printData("São Paulo - Sp - CEP: 04046-500", 30, 0, false, 1, 80, 0);
    printHelper.printData("CNPJ: 03.654.119/0001-76", 30, 0, false, 1, 80, 0);
    printHelper.printData("IE: 286.502.952.112", 30, 0, false, 1, 80, 0);
    printHelper.printData("______________________________________", 30, 0, false, 1, 80, 1);
    printHelper.printData("Cupom Fiscal Eletronico", 32, 0, false, 1, 80, 0);
    printHelper.printData("Produto          Quant. V. Un. Valor", 30, 0, false, 0, 80, 0);
    printHelper.printData("Pêssego Branco     2     6.00   12.00", 30, 0, false, 0, 80, 0);
    printHelper.printData("Iogurte de morango 4    12.00   48.00", 30, 0, false, 0, 80, 0);
    printHelper.printData("Iogurte de frutas  10   10.00  100.00", 30, 0, false, 0, 80, 0);
    printHelper.printData("Bolo de frutas     10    4.00   40.00", 30, 0, false, 0, 80, 0);
    printHelper.printData("Morangos frescos   100  16.00 1600.00", 30, 0, false, 0, 80, 0);
    printHelper.printData("______________________________________", 30, 0, false, 1, 80, 1);
    printHelper.printData("Total: R$1800.00", 32, 0, false, 2, 80, 0);
    printHelper.printData("______________________________________", 30, 0, false, 1, 80, 1);
    printHelper.printData("N: 0000000139", 30, 0, false, 0, 80, 0);
    printHelper.printData("Serie: 65     20/08/2021", 30, 0, false, 0, 80, 0);
    printHelper.printData("______________________________________", 30, 0, false, 1, 80, 1);
    printHelper.printData("Consulte pela chave de acesso no site", 30, 0, false, 1, 80, 0);
    printHelper.printData("http://www.nfe.fazenda.sp.gov.br", 30, 0, false, 1, 80, 0);
    printHelper.printData("Chave de acesso:", 30, 0, false, 1, 80, 0);
    printHelper.printData("00000111112222233333444455556666777788889999", 25, 0, false, 1, 56, 0);
    printHelper.printData("______________________________________", 30, 0, false, 1, 80, 1);
    printHelper.printData("Consultor não identificado", 30, 0, false, 1, 80, 0);
    printHelper.printData("CPF: 000.000.000-00", 30, 0, false, 1, 80, 0);
  }

  private void printSpace(int n) {
    if (n < 0) {
      return;
    }
    StringBuilder str_space = new StringBuilder();
    for (int i = 0; i < n; i++) {
      str_space.append("\n");
    }
    printHelper.printData(str_space.toString(), 8, 0, false, 1, 60, 0);
  }

  @ReactMethod
  public void printTest() {
    this.printSpace(1);
    this.printCupom();
    this.printSpace(1);
    printHelper.printQRCode("https://www.gertec.com.br", 2, 1);
    this.printSpace(1);
    printHelper.printBarCode("7899970400070", 2, 100, 200, 1, 0);
    this.printSpace(7);
    printHelper.printStart();
    printHelper.cutPaper(1);
  }

  @ReactMethod
  public void onPrint(String mapString) {

    Gson gson = new Gson();
    Object[] objects = gson.fromJson(mapString, Object[].class);

    for (Object entry : objects) {
      Map<String, Object> map = (Map<String, Object>) entry;
      String type = map.get("type").toString();
      if (type.equals("text")) {
        String value = (String) map.get("value");
        int size = (int) (double) map.get("size");
        int textType = (int) (double) map.get("textType");
        boolean isUnderLine = (boolean) map.get("isUnderLine");
        int alignment = (int) (double) map.get("alignment");
        int paperWidth = (int) (double) map.get("paperWidth");
        int lineSpace = (int) (double) map.get("lineSpace");

        printHelper.printData(value, size, textType, isUnderLine, alignment, paperWidth, lineSpace);
      } else if (type.equals("barcode")) {
        String value = (String) map.get("value");
        int symbology = (int) (double) map.get("symbology");
        int height = (int) (double) map.get("height");
        int width = (int) (double) map.get("width");
        int alignment = (int) (double) map.get("alignment");
        int textPosition = (int) (double) map.get("textPosition");
        printHelper.printBarCode(value, symbology, height, width, alignment, textPosition);
      } else if (type.equals("qrcode")) {
        String value = (String) map.get("value");
        int size = (int) (double) map.get("size");
        int align = (int) (double) map.get("align");

        printHelper.printQRCode(value, size, align);
      } else if (type.equals("space")) {
        int line = (int) (double) map.get("line");

        this.printSpace(line);
      } else if (type.equals("cut")) {
        printHelper.printStart();
        printHelper.cutPaper(1);
      } else if (type.equals("start")) {
        printHelper.printStart();
      }
    }
  }

  @ReactMethod
  public void ImprimiPDV(String texto, int fontSize, int FontFamily, int align) {
    printHelper.printStart();
    printHelper.printData(texto, fontSize, FontFamily, false, align, 70, 0);

  }

  @ReactMethod
  public void cutPDV() {
    printHelper.printStart();
    printHelper.cutPaper(1);
  }

  @ReactMethod
  public void linePDV(int line) {
    printHelper.printStart();
    this.printSpace(line);
  }

  @ReactMethod
  public void onPrintImageBase64(String base64, int align, int paperWidth, int line, boolean isCut) {
    final byte[] decodedString = Base64.decode(base64, Base64.DEFAULT);
    Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);

    printHelper.printBitmap(decodedByte, align, paperWidth);

    this.printSpace(line);

    printHelper.printStart();
    if (isCut) {
      printHelper.cutPaper(1);
    }
  }

  @ReactMethod
  public void onPrintImageFile(String filePath, int align, int paperWidth, int line, boolean isCut) {
    Bitmap bitmap = BitmapFactory.decodeFile(filePath);
    printHelper.printBitmap(bitmap, align, paperWidth);

    this.printSpace(line);

    printHelper.printStart();

    if (isCut) {
      printHelper.cutPaper(1);
    }
  }
}
