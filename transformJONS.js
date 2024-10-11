const fs = require("fs");

const adressJSON = "./addresses.json";

const test = {
  items: [
    {
      "Номер черги": "1",
      "Адміністративний район (колишніцй устрій)": "Берегівський",
      "Назва населеного пункту": "Батьово",
      "Номер будинку": " ",
    },
    {
      "Назва населеного пункту": "Вари",
      "Назва вулиці": "Вадас",
      "Номер будинку": " ",
    },
    {
      "Назва населеного пункту": "Великі Береги",
      "Номер будинку": " ",
    },
    {
      "Номер черги": "2",
      "Назва населеного пункту": "Великі Береги",
      "Назва вулиці": "Барток Бейла",
      "Номер будинку": " , 10, 11, 12, 13, 14",
    },
    {
      "Назва населеного пункту": "Великі Береги",
      "Назва вулиці": ",Вашут",
      "Номер будинку": " 1, 10, 11, 12, 13, 14, 15, 16, 17, 17/а",
    },
  ],
};

const transformJSON = (adressJSON) => {
  const data = fs.readFileSync(adressJSON, "utf8");
  const addresses = JSON.parse(data);
  const transformedAddresses = [];
  let queueNumber = 1;
  addresses.items.forEach((item) => {
    if (item["Номер черги"]) {
      queueNumber = item["Номер черги"];
    }

    const houseNumbers = item["Номер будинку"]
      ? item["Номер будинку"]?.trim().split(",")
      : [""];
    let street = item["Назва вулиці"]?.trim();

    if (street && street[0] === ",") {
      street = street.slice(1);
    }

    houseNumbers.forEach((houseNumber) => {
      const transformedItem = markup(
        item["Назва населеного пункту"],
        street,
        houseNumber,
        queueNumber
      );
      transformedAddresses.push(transformedItem);
    });
  });
  return transformedAddresses;
};

const markup = (city, street, house, queueNumber) => {
  house = house.length > 0 ? house.trim() : null;
  return {
    display_name: `${city ? city : ""}${street ? ", " + street : ""}${
      house ? ", " + house : ""
    }`,
    country: "Україна",
    city: city || null,
    street: street || null,
    house: house || null,
    queue_name: `Черга ${queueNumber}`,
  };
};

// save the transformed JSON to a new file newAddresses.json
const newAdressJSON = "./newAddresses.json";

fs.writeFileSync(newAdressJSON, JSON.stringify(transformJSON(adressJSON)));
