//1 ETAP:
const axios = require('axios');

// Funkcja do pobierania danych z API NBP
async function fetchCurrencyRates() {
  try {
    const response = await axios.get('https://api.nbp.pl/api/exchangerates/tables/A/');
    const data = response.data[0].rates;
    
    // Wyszukaj kursy dla dolara amerykańskiego, euro i funta szterlinga
    const usdRate = data.find(rate => rate.code === 'USD');
    const euroRate = data.find(rate => rate.code === 'EUR');
    const gbpRate = data.find(rate => rate.code === 'GBP');

    // Wyświetl kursy w konsoli
    console.log('Kursy walut:');
    console.log(`Dolar amerykański (USD): ${usdRate.mid} PLN`);
    console.log(`Euro (EUR): ${euroRate.mid} PLN`);
    console.log(`Funt szterling (GBP): ${gbpRate.mid} PLN`);
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania danych:', error.message);
  }
}

// Wywołaj funkcję do pobierania danych
fetchCurrencyRates();
//-----------------------------------------------------------------------//

//2 ETAP:
const express = require('express');
const app = express();

// Dane z kursami walut
const currencyRates = {
  USD: 5.302, // Przykładowy kurs dolara
  EUR: 4.625, // Przykładowy kurs euro
  GBP: 5.978, // Przykładowy kurs funta szterlinga
};

// Endpointy do zwracania kursów walut
app.get('/dolar', (req, res) => {
  const usdRate = currencyRates.USD;
  res.json(usdRate);
});

app.get('/euro', (req, res) => {
  const euroRate = currencyRates.EUR;
  res.json(euroRate);
});

app.get('/funt', (req, res) => {
  const gbpRate = currencyRates.GBP;
  res.json(gbpRate);
});

// Uruchom serwer na porcie 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
