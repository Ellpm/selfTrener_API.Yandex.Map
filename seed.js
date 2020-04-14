
const faker = require('faker/locale/ru')
const bcrypt = require("bcrypt");

const saltRounds = 10;

const mongoose = require('mongoose');
mongoose.pluralize(null);
const User = require('./models/user');
const Sport = require('./models/sport');
const Event = require('./models/event');
const sportArr = ['Бег', 'Велосипед', 'Плавание', 'Спортзал', 'Хайкинг', 'Туризм', 'Кроссфит', 'Боулинг'];
const iconArr = ['islands#redRunIcon', 'islands#blueBicycleIcon', 'islands#blackPoolIcon', 'islands#brownFashionCircleIcon',
  'islands#violetParkIcon', 'islands#greyVegetationIcon', 'islands#yellowSportIcon', 'islands#redEntertainmentCenterIcon']


async function createBase() {
  await mongoose.connect('mongodb://localhost:27017/sports', { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.on('error', console.error.bind(console, 'Ошибка соединения с MongoDB:'));
  // await Sport.create({ name: 'Бег' }, { name: 'Велосипед' }, { name: 'Триатлон' }, { name: 'Турники' }, { name: 'Хайкинг' },
  //   { name: 'Горный туризм' }, { name: 'Фрирайд' }, { name: 'SUP' })
  placemarkColors = [
    '#DB425A', '#4C4DA2', '#00DEAD', '#D73AD2',
    '#F8CC4D', '#F88D00', '#AC646C', '#548FB7',
  ];


  for (let indexUser = 1; indexUser < 100; indexUser++) {
    let latitude = (55.83 - 55.64) * Math.random() + 55.64;
    let longitude = (37.81 - 37.43) * Math.random() + 37.43;
    //console.log(latitude, longitude);


    let passwordHash = await bcrypt.hash(String(indexUser), saltRounds);
    let curentUser = await User.create({
      name: faker.name.findName(),
      email: indexUser,
      password: passwordHash,
      location: [latitude, longitude],
      avatar: faker.image.people(),
    })

    for (let eventIndex = 0; eventIndex < 4; eventIndex++) {
      let latitude = (55.93 - 55.54) * Math.random() + 55.54;
      let longitude = (37.81 - 37.43) * Math.random() + 37.43;
      //console.log(latitude, longitude);
      // eslint-disable-next-line no-await-in-loop
      let curentSportId = Math.floor(Math.random() * 7)
      const randomNames = [];

      for (let index = 0; index < 5; index++) {
        randomNames.push(await faker.name.findName());
      }

      await Event.create({
        title: faker.hacker.verb(),
        type: sportArr[curentSportId],
        // color: placemarkColors[curentSportId],
        icon: iconArr[curentSportId],
        body: faker.hacker.phrase(),
        time: faker.date.future(),
        coordinates: [latitude, longitude],
        createdAt: faker.date.past(),
        authorID: curentUser.id,
        author: curentUser.name,
        participants: randomNames,
      });

    }
  }





  await mongoose.disconnect();
}

createBase();

module.exports = [sportArr, iconArr]
