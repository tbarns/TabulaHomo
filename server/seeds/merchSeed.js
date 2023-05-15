const Merch = require('../models/Merch');

const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const merchItems = [];

for (let i = 1; i <= 100; i++) {
  const isApparel = i % 2 === 0;

  const item = {
    name: `Merch Item ${i}`,
    description: `Description for Merch Item ${i}`,
    price: Math.floor(Math.random() * 100) + 1,
    image: `https://via.placeholder.com/200?text=Merch+Item+${i}`,
    apparel: isApparel,
    sizes: isApparel ? sizes : [],
    colors: isApparel ? colors : [],
  };

  merchItems.push(item);
}

const seedMerch = async () => {
  await Merch.deleteMany({});
  await Merch.insertMany(merchItems);
  return merchItems; // Return the merchItems array
};
module.exports = seedMerch;
