const submitBtn = document.querySelector("#submit");
const log = document.getElementById("log");
submitBtn.addEventListener("click", validate);
function validate(e) {
  e.preventDefault();
  const inputValue = document.querySelector("#inputValue").value; //dohvacanje unesene vrijednosti
  if (inputValue.length != 13) {
    log.innerHTML = "Molimo da unesete broj od 13 znamenki.";
    return;
  } //JMBG mora biti 13 znamenki

  if (!dateValidation(inputValue)) {
    log.innerHTML = "JMBG je pogresan, datum nije valjan.";
    return;
  } //validacija datuma - jer inace JMBG moze biti tocan iako je datum nepostojeci
  var regionCode = `${inputValue[7]}${inputValue[8]}`;
  if (!regionCheck(parseInt(regionCode))){
    log.innerHTML = "JMBG je pogresan, kod regije nije valjan.";
    return;
  } //validacija koda regije

  const multipliers = [7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2]; //mnozitelji u formuli
  var sum = 0;

  for (let i = 0; i < multipliers.length; i++) {
    sum += inputValue[i] * multipliers[i];
  } //izracun zbroja umnozaka
  
  const remainder = sum % 11;
  const diff = 11 - remainder;
  const controlDigit = inputValue[inputValue.length - 1]; //zadnja znamenka se zove kontrolna znamenka
  
  if (diff == 1 || controlDigit != diff) {
    log.innerHTML = "JMBG je pogresan, kontrolni broj nije valjan.";
    return;
  }//provjera kontrolnog broja
  log.innerHTML = "JMBG je ispravan.";

  //funkcije
  function regionCheck(num){
    var validIDs = [01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,21,26,29,30,31,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47,48,49,50,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96];//array ispravnih kodova regija
    if (validIDs.includes(num)) return true;
    return false;
  };
  function dateValidation(input) {
    var dateStr = `${input[4]}${input[5]}${input[6]}-${input[2]}${input[3]}-${input[0]}${input[1]}`; //stvaranje date stringa u formatu YYYY-MM-DD, ali bez prve znamenke
    var date;
    if (input[4] == 0) {
      dateStr = "2" + dateStr;
    } else if (input[4] == 8 || input[4] == 9) {
      dateStr = "1" + dateStr;
    } else {
      return false;
    } //dodaje se prva znamenka godine, uzeo sam u obzir da moze biti 1800-2000+
    date = moment(dateStr, "YYYY-MM-DD", true);
    if (date.isValid()) {
      console.log(`${dateStr} je validan datum`);
      return true;
    } else {
      console.log(`${dateStr} nije validan datum`);
      return false;
    } //pomocu moment.js validiram datum
  }
}
