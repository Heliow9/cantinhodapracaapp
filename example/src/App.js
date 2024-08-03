import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, Modal, Pressable, ImageBackground, NativeModules, SafeAreaView } from 'react-native';
import {
  onPrint,
  printImageBase64,
  printImageFile,
  printTest,
  print,
  Print2023,
  cutPDV,
  linePDV,
  ImprimiPDV,
  PayTEF
} from 'react-native-gs300-print';
import axios from 'axios';
import drink from '../assets/drink.png'
import pizza from '../assets/pizza.png'
import pizza2 from '../assets/twoflavor.png'
import cantinhobg from '../assets/cantinhobk2.jpg'
import sushi from '../assets/coxinha.png'
import snacks from '../assets/snacks.png'
import sobremesa from '../assets/sobremesa.png'
import logocantinho from '../assets/logocantinho.png'
import embalagem from '../assets/embalagem.png'
import Icon from 'react-native-ionicons'


export default function App() {


  const [pizzas, setPizzas] = useState([])
  const [pizzasTwoFlavor, setPizzasTwoFlavor] = useState()
  const [twoFlavorReturn, setTwoFlavorReturn] = useState()
  const [pizzaspremium, setPizzasPremium] = useState()
  const [salgados, setSalgados] = useState()
  const [additionals, Setaddtionals] = useState([])
  const [bordas, SetBordas] = useState([])
  const [atualDay, setAtualDay] = useState()
  const [valueState, setValueState] = useState(false)





  const [pizzasSecondFlavorItems, setPizzasTwoFlavorItems] = useState()
  const [pizzasTwoFist, setPizzasTwoFist] = useState([])
  const [pizzasTwoSecond, setPizzasTwoSecond] = useState([])
  const [firstflavor, setFirstFlavor] = useState()
  const [secondflavor, setSecondFlavor] = useState()
  const [drinks, setDrinks] = useState([])





  const [taxm, setTax] = useState([
    {
      name: ' Embalagem',
      value: 2
    }
  ])

  const [urlAPI, setUrlApi] = React.useState('https://cantinhoapi.onrender.com');

  const [menu, setMenu] = useState([])
  useEffect(() => {


    async function handlerGeItems() {
      await axios.get(`${urlAPI}/getpizzasone`)
        .then((response) => { setPizzas(response.data), setMenu(response.data) }).catch((error) => { console.error })
    }


    function handlerGetDay() {
      const DataDay = new Date().getDay();
      setAtualDay(DataDay)
    }


    handlerGeItems()
    handlerGetDay()
  }, [])

  useEffect(() => {
    async function getOthersItems() {
      const two = await axios.get(`${urlAPI}/getpizzastwo`);
      const bordas = await axios.get(`${urlAPI}/getBordas`);
      const Adicionais = await axios.get(`${urlAPI}/getAdicionais`);
      const premium = await axios.get(`${urlAPI}/getpizzaspremium`);
      const salgados = await axios.get(`${urlAPI}/getsalgados`);
      const bebidas = await axios.get(`${urlAPI}/getitems`);
      setPizzasTwoFlavor(two.data)
      setTwoFlavorReturn(two.data)
      setPizzasPremium(premium.data)
      setSalgados(salgados.data)
      SetBordas(bordas.data)
      Setaddtionals(Adicionais.data)
      setDrinks(bebidas.data)
    }



    getOthersItems()



  }, [])

  useEffect(() => {

    axios.get(`${urlAPI}/getRestaurants`).then((response) => {
      setValueState(response.data[0].stateValue)
    })
      .catch((error) => { console.log(error) })



  }, [menu])



  async function getProductOne() {
    await axios.get(`${urlAPI}/getpizzasone`).then((response) => {
      setPizzas(response.data)
    }).catch((error) => {
      console.log(error);
    });
  }


  async function getProductTwo() {
    await axios.get(`${urlAPI}/getpizzastwo`).then((response) => {
      setPizzasTwoFlavor(response.data)

    }).catch((error) => {
      console.log(error);
    });
  }

  async function getProductPremium() {

    await axios.get(`${urlAPI}/getpizzaspremium`).then((response) => {
      // setProductPremium(response.data)
      console.log(pizzaspremium)
    }).catch((error) => {
      console.log(error);
    });
  }

  async function getSalgados() {
    await axios.get(`${urlAPI}/getSalgados`).then((response) => {
      // setSalgadosItem(response.data)
    }).catch((error) => {
      console.log(error);
    });

  }


  async function getConsumoItems() {

    await axios.get(`${urlAPI}/getitems`).then((response) => {
      // setConsumoItems(response.data)
      console.log(consumoItems)
    }).catch((error) => {
      console.log(error);
    });
  }


  async function getBordasItems() {

    await axios.get(`${urlAPI}/getBordas`).then((response) => {
      SetBordas(response.data),
        setMenu(bordas)
    }).catch((error) => {
      console.log(error);
    });
  }

  async function getAdicionais() {

    await axios.get(`${urlAPI}/getAdicionais`).then((response) => {
      Setaddtionals(response.data)
    }).catch((error) => {
      console.log(error);
    });
  }





  // selecionando itens da pizzas 
  const [selectedPizza, setSelectedPizza] = useState()
  const [selectedAditional, setSelectedAdtional] = useState()
  const [selectedBordas, setSelectedBordas] = useState()
  const [PaymentPix, setPaymentPix] = useState(false)
  const [statusQr, setStatusQr] = useState()
  const [paymentData, setPaymentData] = useState()
  const [totalTimeInSeconds, setTotaltimeInSeconds] = useState(5)
  const minutes = Math.floor(totalTimeInSeconds / 60)
  const secondes = totalTimeInSeconds % 60
  const [cartItems, setItemsCart] = useState([])
  const [totalValue, setTotalValue] = useState(0)
  const [numeroComanda, setNumeroComanda] = useState("A001");

  const [increment, setIncrement] = useState(0)
  const [menuTitle, setMenuTitle] = useState()
  const [modalVisible, setModalVisible] = useState(false);

  function handlerMenuTitle() {
    if (menu === pizzas) {
      return 'Pizzas de 1 sabor'
    }
    else if (menu === additionals) {
      return 'Selecione um tipo de adicional'
    } else if (menu === bordas) {
      return 'Selecione um tipo de borda'
    }
    else if (menu === pizzasTwoFlavor) {
      return 'Pizzas de 2 sabores'
    }
    else if (menu === taxm) {
      return 'É para viagem?'
    }
  }


  function handletest() {
    console.log(additionals)
  }



  function verifiSelectedFlavor() {
    if (!firstflavor) {
      return 'Selecione o 1º sabor'
    } else {
      return 'Selecione o 2º sabor'
    }
  }

  function handlerMenuTitle() {
    if (menu === pizzas) {
      return 'Pizzas de 1 sabor'
    }
    else if (menu === additionals) {
      return 'Selecione um tipo de adicional'
    } else if (menu === bordas) {
      return 'Selecione um tipo de borda'
    }
    else if (menu === pizzasTwoFlavor) {
      return 'Pizzas de 2 sabores'
    }
    else if (menu === taxm) {
      return 'É para viagem?'
    }
  }

  function HandlerAddTwoFirstStep(item, index) {
    if (!firstflavor) {
      setFirstFlavor(item)
    }

    else if (firstflavor._id === item._id) {

    }

    else {
      setSecondFlavor(item)
      setMenu(additionals)
    }
  }




  function handlerClearCart() {
    setItemsCart([])
    setTotalValue(0)

  }

  function handlerClearItemCart(item) {
    const newItems = cartItems
    newItems.splice(item, 1)
    setItemsCart(newItems)
    setIncrement(increment + 1)
    handlerSubtrair(item)
  }

  function handlerCalculateValue(item) {
    if (item.pizza && item.pizzatwo) {
      if (item.category === 'cadpizzaOne' || item.category === 'cadpizzatwo' || item.category === 'cadpizzapremium' && atualDay === 0 || valueState === true) {
        var firstPizza = item;
        var addAdicional = firstPizza.adicional ? firstPizza.adicional.value : 0;
        var addPizza = firstPizza.pizza.value2 > firstPizza.pizzatwo.value2 ? firstPizza.pizza.value2 : firstPizza.pizzatwo.value2;
        // firstPizza.pizza ? firstPizza.pizza.value : 0;
        var bordas = firstPizza.bordas ? firstPizza.bordas.value : 0;
        var initialValue = addAdicional + addPizza + bordas;
        var totalValue = cartItems.reduce(function (acc, pizza, index) {
          var adicionalValue = pizza.adicional ? pizza.adicional.value : 0;
          var bordasValue = pizza.bordas ? pizza.bordas.value : 0;
          var pizzaValue = pizza.pizza ? pizza.pizza.value2 : 0;
          var itemProduct = pizza.produc ? pizza.product.value2 : 0;
          return acc + adicionalValue + bordasValue + pizzaValue + itemProduct;
        }, initialValue);

        setTotalValue(totalValue)
        console.log('teste')

      }

    } else {

      if (item.category === 'cadpizzaOne' || item.category === 'cadpizzatwo' || item.category === 'cadpizzapremium' && atualDay === 0 || valueState === true) {
        var firstPizza = item;
        var addAdicional = firstPizza.adicional ? firstPizza.adicional.value : 0;
        var addPizza = firstPizza.pizza ? firstPizza.pizza.value2 : 0;
        var bordas = firstPizza.bordas ? firstPizza.bordas.value2 : 0;
        var initialValue = item.produc ? item.produc.value : addAdicional + addPizza + bordas;
        var totalValue = cartItems.reduce(function (acc, pizza, index) {
          var adicionalValue = pizza.adicional ? pizza.adicional.value : 0;
          var bordasValue = pizza.bordas ? pizza.bordas.value : 0;
          var pizzaValue = pizza.pizza ? pizza.pizza.value2 : 0;
          var itemProduct = pizza.produc ? pizza.produc.value2 : 0;
          return acc + adicionalValue + bordasValue + pizzaValue + itemProduct;
        }, initialValue);
        console.log(totalValue + '2')
        setTotalValue(totalValue)
      } else {
        var firstPizza = item;
        var addAdicional = firstPizza.adicional ? firstPizza.adicional.value : 0;
        var addPizza = firstPizza.pizza ? firstPizza.pizza.value : 0;
        var bordas = firstPizza.bordas ? firstPizza.bordas.value : 0;
        var initialValue = item.produc ? item.produc.value : addAdicional + addPizza + bordas;
        var totalValue = cartItems.reduce(function (acc, pizza, index) {
          var adicionalValue = pizza.adicional ? pizza.adicional.value : 0;
          var bordasValue = pizza.bordas ? pizza.bordas.value : 0;
          var pizzaValue = pizza.pizza ? pizza.pizza.value : 0;
          var itemProduct = pizza.produc ? pizza.produc.value : 0;
          return acc + adicionalValue + bordasValue + pizzaValue + itemProduct;
        }, initialValue);
        console.log(totalValue + '1')
        setTotalValue(totalValue)
      }
    }


  }

  function handlerSubtrair(initialValue) {
    var firstPizza = initialValue;
    var addAdicional = firstPizza.adicional ? firstPizza.adicional.value : 0;
    var addPizza = firstPizza.pizza ? firstPizza.pizza.value : 0;
    var bordas = firstPizza.borda ? firstPizza.borda.value : 0;
    var initialValue = addAdicional + addPizza + bordas;

    var totalValue = cartItems.reduce(function (acc, pizza, index) {
      var adicionalValue = pizza.adicional ? pizza.adicional.value : 0;
      var bordasValue = pizza.bordas ? pizza.bordas.value : 0;
      var pizzaValue = pizza.pizza ? pizza.pizza.value : 0;
      return acc - adicionalValue - bordasValue - pizzaValue;
    }, initialValue);

    setTotalValue(totalValue)


  }

  function handlerAddtoCartFirstStep(item) {
    //adicionando item ao carrinho
    // setItemsCart([...cartItems, item])  
    setSelectedPizza(item)
    // handlerCalculateValue(item.value)
    setMenu(additionals)

  }

  function handlerAddtoCartSecondStep(adt) {
    //adicionando item ao carrinho
    // setItemsCart([...cartItems, item])  
    setSelectedAdtional(adt)
    // handlerCalculateValue(item.value)

    setMenu(bordas)

  }

  function handlerTax(item) {

    finalStep(item)


  }

  function finalStep(item) {
    if (firstflavor && secondflavor) {
      addToCartTwoFlavor(item)
      setMenu(pizzas)

    } else {
      addToCart(item)
      setMenu(pizzas)
    }

  }



  function addToCart(item) {

    item ? itemsPizza = {
      pizza: selectedPizza,
      adicional: selectedAditional,
      bordas: selectedBordas,
      travelTax: item ? item : null,
    } : itemsPizza = {
      pizza: selectedPizza,
      adicional: selectedAditional,
      travelTax: item ? item : null,
      bordas: selectedBordas,
    }
    console.log(itemsPizza)
    setItemsCart([...cartItems, itemsPizza])
    handlerCalculateValue(itemsPizza)
    setSelectedPizza([])
    setMenu(pizzas)


    setSelectedAdtional()
    setSelectedBordas()


  }

  function addToCartProduct(item) {

    itemsPizza = {

      produc: item,

    }

    setItemsCart([...cartItems, itemsPizza])
    handlerCalculateValue(itemsPizza)
    setSelectedPizza([])
    setMenu(pizzas)
    setSelectedAdtional()
    setSelectedBordas()


  }

  function addToCartTwoFlavor(item) {

    const itemsPizza = {
      pizza: firstflavor,
      pizzatwo: secondflavor,
      adicional: selectedAditional,
      bordas: selectedBordas,
      travelTax: item ? item : null,
    }


    setItemsCart([...cartItems, itemsPizza])
    handlerCalculateValue(itemsPizza)
    setPizzasTwoFlavor(twoFlavorReturn)
    setMenu(pizzas)
    setFirstFlavor()
    setSecondFlavor()
    setSelectedAdtional()
    setSelectedBordas()

  }

  function abreviarPrimeiroNome(str) {
    // Dividir a string em partes separadas pelos espaços
    let partes = str.split(" ");

    // Abreviar o primeiro caractere do primeiro nome
    let primeiroNomeAbreviado = partes[0].charAt(0);

    // Concatenar o primeiro nome abreviado com o sobrenome
    let sobrenome = partes.slice(1).join(" "); // Pegar o restante da string após o primeiro espaço
    let nomeAbreviado = primeiroNomeAbreviado + " " + sobrenome;

    return nomeAbreviado;
  }

  function SmartPrinterTest(paymentMetod) {
    incrementarComanda();
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let options = {
      timeZone: 'America/Sao_Paulo', // Lista de Timezones no fim do artigo

    }
    ImprimiPDV('Cantinho da Praça', 40, 3, 1)
    ImprimiPDV('Pizzaria & Restaurante', 27, 0, 1)
    ImprimiPDV('CNPJ 26.181.882/0001-32.', 22, 0, 1)
    ImprimiPDV(`Pedido:${numeroComanda}`, 40, 1, 1)
    ImprimiPDV(`${today.toLocaleDateString()}                              ${new Date().toLocaleTimeString('pt-br', options)}`, 20, 0, 1)

    ImprimiPDV(`============ Produtos ============`, 27, 0, 1)
    ImprimiPDV(`Nome                             Qnt.  vUnit       Subtotal`, 27, 0, 1)
    ImprimiPDV(`------------------------------------------------------------------------------------`, 27, 0, 1)


    cartItems.map((item, index) => (
      item.pizza && ImprimiPDV(`Pizza: ${item.pizza.name.length >= 19 ? abreviarPrimeiroNome(item.pizza.name) : item.pizza.name}                   1x`, 12, 1, 0),
      item.pizza && ImprimiPDV(`R$${item.pizza.value}       R$${item.pizza.value}`, 12, 1, 2),
      item.adicional || item.bordas ?
        ImprimiPDV('Adicionais:', 25, 0, 0) : null,
      item.adicional ? ImprimiPDV(`Adicional: ${item.adicional.Aditionalname}`, 12, 0, 0) : null,
      item.adicional ? ImprimiPDV(`R$${item.adicional.value}`, 12, 1, 2) : null,
      item.bordas ? ImprimiPDV(`Borda: ${abreviarPrimeiroNome(item.bordas.bordasName)}.`, 12, 0, 0) : null,
      item.bordas ? ImprimiPDV(`R$${item.bordas.value}`, 12, 1, 2) : null,
      item.travelTax ? ImprimiPDV(`${item.travelTax.item.name}: R$${item.travelTax.item.value}`, 12, 0, 2) : null,
      ImprimiPDV('____________________________________________________________', 20, 1, 0),
      item.produc ? ImprimiPDV(`${item.produc.name}${item.produc.name > 36 ? '                           ' : '                                    '}1x        R$${item.produc.value}      R$${item.produc.value}`, 12, 1, 0) : null
    ))
    linePDV(4)

    ImprimiPDV(`Subtotal   R$${totalValue}`, 32, 1, 2)

    ImprimiPDV(`Agradecemos a preferencia, volte sempre!`, 24, 1, 1)
    linePDV(6)
    cutPDV(1)

  }

  const incrementarComanda = () => {
    const letraAtual = numeroComanda.substring(0, 1); // Extrai a letra
    let numeroAtual = parseInt(numeroComanda.substring(1)); // Extrai apenas os números
    if (numeroAtual === 999) {
      const proximaLetra = String.fromCharCode(letraAtual.charCodeAt(0) + 1); // Avança para a próxima letra
      numeroAtual = 1; // Reinicia o contador
      setNumeroComanda(proximaLetra + "001");
    } else {
      const novoNumero = ("000" + (numeroAtual + 1)).slice(-3); // Formata o número com três dígitos
      setNumeroComanda(letraAtual + novoNumero);
    }
  };





  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar hidden={true} translucent={true} /> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Agora me diz ai, é pra agora ou viagem? </Text>
            <Text style={styles.modalText2}>Lembrando que se for pra viagem, tomos uma taxa de acrescimo de R$2,00 por embalagem. </Text>
            <View style={styles.buttomGroupModal}>
              <Pressable
                style={styles.consumerButtom}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>É pra já!</Text>
              </Pressable>
              <Pressable
                style={styles.travelButtom}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>É pra viagem!</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <ImageBackground style={styles.topViewerBarTransparence} source={cantinhobg}>
        <View style={styles.topViewerBar}>
          <View style={styles.ViewBarLeft}>
            <Text style={styles.topBrand}>Cantinho da Praça</Text>
            <View style={styles.topMenuList}>
              <TouchableOpacity onPress={() => setMenu(pizzas)} >
                <View style={styles.buttomView}>
                  <Image source={pizza} style={styles.buttomImage} />
                  <Text style={styles.textItemButtom}>Pizza-G 1 Sabor</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => [setMenu(pizzasTwoFlavor), setFirstFlavor()]}>
                <View style={styles.buttomView}>
                  <Image source={pizza2} style={styles.buttomImage} />
                  <Text style={styles.textItemButtom}>Pizza-G 2 Sabores</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMenu(pizzaspremium)}>
                <View style={styles.buttomView}>
                  <Image source={snacks} style={styles.buttomImage} />
                  <Text style={styles.textItemButtom}>Pizzas Premium</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMenu(salgados)}>
                <View style={styles.buttomView} >
                  <Image source={sushi} style={styles.buttomImage} />
                  <Text style={styles.textItemButtom}>Salgados</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMenu(salgados)}>
                <View style={styles.buttomView} >
                  <Image source={sobremesa} style={styles.buttomImage} />
                  <Text style={styles.textItemButtom}>Sobremesas</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setMenu(drinks)} >
                <View style={styles.buttomView}>
                  <Image source={drink} style={styles.buttomImage} />
                  <Text style={styles.textItemButtom}>Bebidas</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Image style={styles.logoIcon} source={logocantinho} />
          </View>
        </View>
      </ImageBackground>

      <View style={styles.bodyContainer}>
        <View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.menuTitle}>{handlerMenuTitle()}</Text>

            {menu === pizzasTwoFlavor ? <Text style={styles.menuTitleSecundary}>{verifiSelectedFlavor()}</Text> : null}

          </View>
          <View style={styles.productContainer}>
            {
              menu === drinks ? <View>
                <FlatList
                  data={menu}
                  numColumns={3}
                  renderItem={(drink) => (

                    <TouchableOpacity onPress={() => addToCartProduct(drink.item)} >
                      <View style={styles.itemViewer}>
                        <Text style={styles.flavorName}>{drink.item.name}</Text>
                        <Text style={styles.flavorPrice}>R${drink.item.value.toFixed(2)}</Text>
                      </View>
                    </TouchableOpacity>

                  )

                  }
                  keyExtractor={drink => drink._id}
                />
              </View> : null


            }
            {
              menu === pizzas ? <View>
                <FlatList
                  data={pizzas}
                  numColumns={3}
                  renderItem={(pizza) => (

                    <TouchableOpacity onPress={() => (handlerAddtoCartFirstStep(pizza.item))} >
                      <View style={styles.itemViewer}>
                        <Text style={styles.flavorName}>{pizza.item.name}</Text>
                        <Text style={styles.flavorPrice}>R${atualDay === 0 || valueState === true ? pizza.item.value2.toFixed(2) : pizza.item.value.toFixed(2)}</Text>
                      </View>
                    </TouchableOpacity>

                  )
                  }
                  keyExtractor={pizzas => pizzas._id}
                />
              </View> : null


            }
            {
              menu === pizzaspremium ? <View>
                <FlatList
                  data={pizzaspremium}
                  numColumns={3}
                  renderItem={(pizza) => (

                    <TouchableOpacity onPress={() => (handlerAddtoCartFirstStep(pizza.item))} >
                      <View style={styles.itemViewer}>
                        <Text style={styles.flavorName}>{pizza.item.name}</Text>
                        <Text style={styles.flavorPrice}>R${atualDay === 0 || valueState === true ? pizza.item.value2.toFixed(2) : pizza.item.value.toFixed(2)}</Text>
                      </View>
                    </TouchableOpacity>

                  )
                  }
                  keyExtractor={pizzas => pizzas._id}
                />
              </View> : null


            }
            {
              menu === salgados ? <View>
                <FlatList
                  data={salgados}
                  numColumns={3}
                  renderItem={(salgado) => (

                    <TouchableOpacity onPress={() => (addToCartProduct(salgado.item))} >
                      <View style={styles.itemViewer}>
                        <Text style={styles.flavorName}>{salgado.item.name}</Text>
                        <Text style={styles.flavorPrice}>R${salgado.item.value.toFixed(2)}</Text>
                      </View>
                    </TouchableOpacity>

                  )
                  }
                  keyExtractor={salgados => salgados._id}
                />
              </View> : null


            }
            {
              menu === pizzasTwoFlavor ? <View>
                <FlatList
                  data={menu}
                  numColumns={3}
                  renderItem={(pizza) => (

                    <TouchableOpacity onPress={() => HandlerAddTwoFirstStep(pizza.item, pizza.index)} >

                      <View style={firstflavor ? firstflavor.id === pizza.item.id ? styles.itemViewerSelected : styles.itemViewer : styles.itemViewer}>
                        <Text style={styles.flavorName}>{pizza.item.name}</Text>
                        <Text style={styles.flavorPrice}>R${atualDay === 0 || valueState === true ? pizza.item.value2.toFixed(2) : pizza.item.value.toFixed(2)}</Text>
                      </View>
                    </TouchableOpacity>

                  )

                  }
                  keyExtractor={pizza => pizza._id}
                />
              </View> : null


            }

            {
              menu === additionals ? <View>
                <FlatList
                  data={additionals}
                  numColumns={3}
                  renderItem={(adtionals) => (

                    <TouchableOpacity onPress={() => handlerAddtoCartSecondStep(adtionals.item)} >
                      <View style={styles.itemViewer}>
                        <Text style={styles.flavorName}>{adtionals.item.name}</Text>
                        <Text style={styles.flavorPrice}>R${adtionals.item.value.toFixed(2)}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                  }

                  keyExtractor={additionals => additionals.id}
                />
              </View> : null


            }
            {
              menu === bordas ? <View>
                <FlatList
                  data={bordas}
                  numColumns={3}
                  renderItem={(item, index) => (

                    <TouchableOpacity onPress={() => (setMenu(taxm), setSelectedBordas(item.item))} >
                      <View style={styles.itemViewer}>
                        <Text style={styles.flavorName}>{item.item.name}</Text>
                        <Text style={styles.flavorPrice}>R${item.item.value.toFixed(2)}</Text>
                      </View>
                    </TouchableOpacity>

                  )

                  }
                  keyExtractor={bordas => bordas.id}
                />
              </View> : null


            }

            {
              menu === taxm ? <View>
                <FlatList
                  data={menu}
                  numColumns={3}
                  renderItem={(item, index) => (

                    <TouchableOpacity onPress={() => handlerTax(item)} >
                      <View style={styles.itemViewer}>
                        <Text style={styles.flavorName}>{item.item.name}</Text>
                        <Text style={styles.flavorPrice}>R${item.item.value.toFixed(2)}</Text>
                      </View>
                    </TouchableOpacity>

                  )

                  }
                  keyExtractor={bordas => bordas.id}
                />
              </View> : null


            }

            {
              menu === additionals ? <View>
                <TouchableOpacity onPress={() => firstflavor && secondflavor ? handlerAddtoCartSecondStep() : setMenu(bordas)} >
                  <View style={styles.itemViewerCancel}>
                    <Text style={styles.flavorName} >Não desejo Adicional!</Text>
                  </View>
                </TouchableOpacity>
              </View> : null
            }


            {
              menu === bordas ? <View>
                <TouchableOpacity onPress={() => setMenu(taxm)} >
                  <View style={styles.itemViewerCancel}>
                    <Text style={styles.flavorName}>Não desejo Bordas!</Text>
                  </View>
                </TouchableOpacity>
              </View> : null
            }

            {
              menu === taxm ? <View>
                <TouchableOpacity onPress={() => firstflavor && pizzasTwoFlavor ? addToCartTwoFlavor() : addToCart()}  >
                  <View style={styles.itemViewerCancel}>
                    <Text style={styles.flavorName}>Não desejo embalagem </Text>
                  </View>
                </TouchableOpacity>
              </View> : null
            }
          </View>
          <View style={styles.payments}>
            <Text>Pagamentos</Text>
            <TouchableOpacity>
              <View style={styles.buttonPayment}>
                <Text style={styles.buttonPaymentText}>C.Crédito</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity >
              <View style={styles.buttonPayment}>
                <Text style={styles.buttonPaymentText}>C.Debito</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => SmartPrinterTest()} >
              <View style={styles.buttonPayment}>
                <Text style={styles.buttonPaymentText}>Pix - Online</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.CartContainer}>
          {
            statusQr ? <Text style={{ alignSelf: 'center' }}>Scanei o qrCode abaixo para pagamento!</Text> : <Text>Itens Adicionados:</Text>
          }

          {
            !PaymentPix ?
              cartItems.length < 1 ? <View style={styles.noItem}>
                <Text style={styles.noItemCart}>Você ainda não adicionou nenhum item ao carrinho!</Text>
              </View> : <FlatList
                data={cartItems}
                extraData={cartItems}
                numColumns={1}
                showsVerticalScrollIndicator
                renderItem={(item, index) => (

                  item.item.produc ?
                    <View>



                      <View style={styles.itemCart}>
                        <View>
                          <Text style={styles.itemCartName} >{item.item.produc.name} </Text>
                          {item.item.produc.description ? <Text>{item.item.produc.description}</Text> : null}


                        </View>
                        <View style={styles.cartValueDecrement}>
                          {
                            atualDay == 0 || valueState && item.item.produc.value ? <Text>R${item.item.produc.value2}</Text> : <Text>R${item.item.produc.value}</Text>
                          }


                        </View>
                        <View>

                          <Text>R${item.item.produc.value.toFixed(2)}</Text>

                          <Text>Quant: 1</Text>
                        </View>
                        <View style={styles.cartValueIncrement}>
                          <View style={styles.increment}><Text style={styles.incrementText}>+</Text></View>
                          <TouchableOpacity onPress={() => handlerClearItemCart(item.index)} style={styles.buttonRemove}>
                            <Text style={styles.removeText}>Remover</Text>
                          </TouchableOpacity>

                        </View>
                      </View>
                      <View style={styles.separator}></View>
                    </View> :
                    <View>



                      <View style={styles.itemCart}>
                        <Text style={styles.itemCartName} >{item.item.pizza && item.item.pizzatwo ? `1/2 ${item.item.pizza.name} \n1 /2${item.item.pizzatwo.name}` : item.item.pizza.name} </Text>
                        <View style={styles.cartValueDecrement}>
                          <Text>R${item.item.pizza && item.item.pizzatwo ? item.item.pizza.value > item.item.pizzatwo.value ? item.item.pizza.value : item.item.pizzatwo.value : item.item.pizza.value.toFixed(2)}</Text>
                          <View style={styles.decrement}><Text style={styles.decrementText}>-</Text></View>
                        </View>
                        <View>

                          {
                            item.item.pizzatwo ? <Text>R${(item.item.pizza.value > item.item.pizzatwo.value ? item.item.pizza.value : item.item.pizzatwo.value + (item.item.bordas ? item.item.bordas.value : 0) + (item.item.adicional ? item.item.adicional.value : 0)).toFixed(2)}</Text> :
                              <Text>R${(item.item.pizza.value + (item.item.bordas ? item.item.bordas.value : 0) + (item.item.adicional ? item.item.adicional.value : 0)).toFixed(2)}</Text>
                          }

                        </View>
                        <View style={styles.cartValueIncrement}>
                          <View style={styles.increment}><Text style={styles.incrementText}>+</Text></View>
                          <TouchableOpacity onPress={() => handlerClearItemCart(item.index)} style={styles.buttonRemove}>
                            <Text style={styles.removeText}>Remover</Text>
                          </TouchableOpacity>

                        </View>
                      </View>
                      <View style={styles.itemDescription}><Text style={styles.itemDescriptionText}>{item.item.pizza && item.item.pizzatwo ? `1/2- ${item.item.pizza.name}${item.item.pizza.description}\n 1/2- ${item.item.pizzatwo.name}${item.item.pizzatwo.description}` : item.item.pizza.description}</Text></View>
                      <View >
                        {item.item.bordas || item.item.adicional ? <Text style={styles.itemAditionals}>Adicionais:</Text> : null}
                        {
                          item.item.adicional ? <View style={styles.itemAditional}>
                            <Text style={styles.aditionalInfor}>Adicional {item.item.adicional.name}</Text>
                            <Text style={styles.aditionalInfor}>R${item.item.adicional.value.toFixed(2)}</Text>
                          </View> : null
                        }
                        {
                          item.item.bordas ? <View style={styles.itemAditional}>
                            <Text style={styles.aditionalInfor}>Borda {item.item.bordas.name}</Text>
                            <Text style={styles.aditionalInfor}>R${item.item.bordas.value.toFixed(2)}</Text>
                          </View> : null
                        }
                        {
                          item.item.travelTax ?
                            <View style={styles.Taxviewer}>
                              <Text style={styles.TaxText}>R${item.item.travelTax.item.value.toFixed(2)}</Text>
                              <Text style={styles.TaxText}>{item.item.travelTax.item.name}</Text>

                              <Image source={embalagem} style={styles.embalagemPicture} />
                            </View> :
                            null
                        }
                        <View style={styles.separator}></View>
                      </View>
                    </View>

                )}
                keyExtractor={(item, index) => index}
              /> : <View style={styles.PaymentContent}>
                {
                  !statusQr ? <View>
                    <Text style={styles.progressText}>Estamos gerando seu qrcode pix aguarde um instante!</Text>
                    <ActivityIndicator size="large" color='#315236' />
                  </View> :
                    <View>
                      {
                        <View>
                          <Image source={statusQr ? { uri: statusQr } : pizza} style={styles.qrcodeImage} />
                          <Text style={{ alignSelf: 'center', marginBottom: 10 }}>Seu pagamento foi gerado no valor de R${totalValue.toFixed(2)}</Text>
                          <TouchableOpacity style={styles.cancelPayment}>
                            <View><Text style={styles.textCancelPayment}>Cancelar pagamento  {minutes.toString().padStart(2, '0')} : {secondes.toString().padStart(2, '0')}  </Text></View>
                          </TouchableOpacity>
                        </View>
                      }
                    </View>
                }


              </View>
          }




          <View style={styles.cartInfors}>
            <Text>Subtotal: R${totalValue.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => handlerClearCart()} style={styles.buttonRemove}>
              <Text style={styles.removeText} >Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => PayTEF()} style={styles.buttonRemove}>
              <Text style={styles.removeText} >TEF</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',

  },
  topViewerBar: {
    backgroundColor: '#315236',
    width: '100%',
    height: 140,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    resizeMode: 'cover'
  },

  ViewBarLeft: {
    height: 130,
    justifyContent: "space-between",
  },
  topBrand: {
    color: 'white',
    fontSize: 17,
    marginLeft: 10,
    marginTop: 8,
    fontWeight: 'bold'
  },

  logoIcon: {
    width: 100,
    height: 100,
    marginRight: 12,
    resizeMode: 'contain'
  },
  topMenuList: {
    marginLeft: 20,
    paddingBottom: 7,
    flexDirection: 'row'
  },
  buttomView: {
    width: 90,
    height: 70,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 8,

  },
  buttomImage: {
    width: 34,
    height: 34,
    resizeMode: 'contain'
  },
  textItemButtom: {
    fontSize: 10,
    marginTop: 7
  },
  bodyContainer: {
    flex: 1,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',



  },
  productContainer: {
    width: 410,
    height: 320,
    elevation: 4,

  },
  menuTitle: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  menuTitleSecundary: {
    color: '#910c0c',
    fontWeight: 'bold'
  },
  itemViewer: {
    width: 120,
    height: 90,
    backgroundColor: '#910c0c',
    margin: 8,
    display: "flex",
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center'
  },
  itemViewerSelected: {
    width: 120,
    height: 90,
    backgroundColor: '#315236',
    margin: 8,
    display: "flex",
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center'
  },
  itemViewerCancel: {
    width: 120,
    height: 90,
    backgroundColor: '#315236',
    margin: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: 'center'
  },
  flavorName: {
    color: 'white',
    fontWeight: '800',


  },
  flavorPrice: {
    alignSelf: 'flex-start',
    color: "white",
    marginTop: 20,
    marginLeft: 8,
  },

  payments: {
    position: 'absolute',
    top: 345,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
  },
  buttonPayment: {
    marginRight: 12,
    marginLeft: 10,
    backgroundColor: '#315236',
    padding: 10,
    borderRadius: 3
  },
  buttonPaymentText: {
    color: 'white',
    fontWeight: 'bold'
  },

  progressText: {
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "center"
  },

  noItem: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'
  },

  noItemCart: {
    fontWeight: 'bold'
  },

  CartContainer: {
    flex: 1,
    height: 400,
    height: 320,
    padding: 8
  },

  PaymentContent: {
    flex: 1,
    height: 400,
    height: 320,
    padding: 8,
    justifyContent: 'center',
    textAlign: 'center'
  },
  itemCart: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10

  },
  itemCartName: {
    width: 150,
    fontWeight: 'bold'
  },


  itemAditionals: {
    width: 150,
    fontSize: 12,
    marginLeft: 5,

  },

  itemAditional: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 180,
    alignItems: 'center'
  },
  aditionalInfor: {
    fontSize: 11
  },
  separator: {
    borderBottomColor: '#008000',
    borderBottomWidth: 1,
    paddingBottom: 3
  },


  itemDescription: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row'
    // borderBottomColor: '#008000',
    // borderBottomWidth: 1,
    // paddingBottom: 3
  },

  itemDescriptionText: {
    fontSize: 11,
    width: 308,
    fontWeight: 'bold'
  },

  cartValueDecrement: {
    flexDirection: 'row',
    alignItems: "center"
  },

  cartValueIncrement: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  decrement: {
    width: 25,
    height: 25,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginLeft: 12
  },
  decrementText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  increment: {
    width: 25,
    height: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginRight: 12
  },
  incrementText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },





  cartInfors: {
    position: 'absolute',
    top: 350,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    width: 490,
    justifyContent: 'space-between'
  },

  modalView: {
    alignSelf: 'center',
    width: 320,
    height: 180,
    marginTop: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttomGroupModal: {
    flexDirection: 'row',
    margin: 10
  },
  consumerButtom: {
    flexDirection: 'row',
    backgroundColor: '#315236',
    width: 80,
    height: 35,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 10
  },
  travelButtom: {
    flexDirection: 'row',
    backgroundColor: '#910c0c',
    width: 'auto',
    paddingHorizontal: 8,
    height: 35,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 10,
    left: 20
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonRemove: {
    padding: 6,
    backgroundColor: '#910c0c',
    borderRadius: 6,
    elevation: 6

  },
  removeText: {
    color: 'white',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText2: {
    fontSize: 10,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 9,
    textAlign: 'center',
  },

  qrcodeImage: {
    width: 180,
    height: 180,
    alignSelf: 'center'
  },
  cancelPayment: {
    backgroundColor: '#910c0c',
    width: 195,
    alignItems: 'center',
    justifyContent: "center",
    textAlign: 'center',
    height: 33,
    alignSelf: 'center',
    borderRadius: 3
  },
  textCancelPayment: {
    color: 'white',
  },
  Taxviewer: {
    display: 'flex',
    flexDirection: 'row',
    width: 130,
    alignItems: 'center',

  },
  TaxText: {

    fontSize: 12
  },

  embalagemPicture: {
    width: 20,
    height: 20,
    marginLeft: 20,

  }

});