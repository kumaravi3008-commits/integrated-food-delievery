require("dotenv").config();
const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");
const Meal = require("./models/Meal");
const Category = require("./models/Category");

const cuisineData = {
  Italian: {
    restaurantImage: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400&h=300&fit=crop",
    meals: [
      { name: "Margherita Pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },
      { name: "Spaghetti Carbonara", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop" },
      { name: "Lasagna", image: "https://images.unsplash.com/photo-1619895092538-128341789043?w=400&h=300&fit=crop" },
      { name: "Risotto", image: "https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?w=400&h=300&fit=crop" },
      { name: "Tiramisu", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop" },
    ],
  },
  Indian: {
    restaurantImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    meals: [
      { name: "Butter Chicken", image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop" },
      { name: "Paneer Tikka", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop" },
      { name: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop" },
      { name: "Naan Basket", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop" },
      { name: "Gulab Jamun", image: "https://images.unsplash.com/photo-1601303516534-bf0b1eb70d4a?w=400&h=300&fit=crop" },
    ],
  },
  Chinese: {
    restaurantImage: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
    meals: [
      { name: "Kung Pao Chicken", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop" },
      { name: "Spring Rolls", image: "https://images.unsplash.com/photo-1548507200-25f1a53e6b3f?w=400&h=300&fit=crop" },
      { name: "Fried Rice", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop" },
      { name: "Dumplings", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop" },
      { name: "Sweet & Sour Pork", image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop" },
    ],
  },
  Mexican: {
    restaurantImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    meals: [
      { name: "Tacos al Pastor", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop" },
      { name: "Guacamole & Chips", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=400&h=300&fit=crop" },
      { name: "Burrito Bowl", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop" },
      { name: "Quesadilla", image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop" },
      { name: "Churros", image: "https://images.unsplash.com/photo-1624471407162-593d130a3ca9?w=400&h=300&fit=crop" },
    ],
  },
  Japanese: {
    restaurantImage: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop",
    meals: [
      { name: "California Roll", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop" },
      { name: "Chicken Katsu", image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&h=300&fit=crop" },
      { name: "Miso Soup", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" },
      { name: "Tempura", image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400&h=300&fit=crop" },
      { name: "Mochi", image: "https://images.unsplash.com/photo-1583224964978-2c8c2b23e548?w=400&h=300&fit=crop" },
    ],
  },
  Thai: {
    restaurantImage: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
    meals: [
      { name: "Pad Thai", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop" },
      { name: "Green Curry", image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop" },
      { name: "Tom Yum Soup", image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&h=300&fit=crop" },
      { name: "Spring Rolls", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop" },
      { name: "Mango Sticky Rice", image: "https://images.unsplash.com/photo-1621939514649-280e733dab99?w=400&h=300&fit=crop" },
    ],
  },
  American: {
    restaurantImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop",
    meals: [
      { name: "Cheeseburger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
      { name: "BBQ Ribs", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop" },
      { name: "Mac & Cheese", image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&h=300&fit=crop" },
      { name: "Buffalo Wings", image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop" },
      { name: "Apple Pie", image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=400&h=300&fit=crop" },
    ],
  },
  Mediterranean: {
    restaurantImage: "https://images.unsplash.com/photo-1544510808-91bee3e12a08?w=400&h=300&fit=crop",
    meals: [
      { name: "Hummus Platter", image: "https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=400&h=300&fit=crop" },
      { name: "Falafel Wrap", image: "https://images.unsplash.com/photo-1593001872095-7d5b3868fb1d?w=400&h=300&fit=crop" },
      { name: "Greek Salad", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop" },
      { name: "Grilled Kebab", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop" },
      { name: "Baklava", image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&h=300&fit=crop" },
    ],
  },
  French: {
    restaurantImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    meals: [
      { name: "Croque Monsieur", image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&h=300&fit=crop" },
      { name: "Beef Bourguignon", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop" },
      { name: "French Onion Soup", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop" },
      { name: "Ratatouille", image: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=400&h=300&fit=crop" },
      { name: "Crème Brûlée", image: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400&h=300&fit=crop" },
    ],
  },
  Korean: {
    restaurantImage: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop",
    meals: [
      { name: "Bibimbap", image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&h=300&fit=crop" },
      { name: "Bulgogi", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop" },
      { name: "Kimchi Fried Rice", image: "https://images.unsplash.com/photo-1584278860047-22db9ff82bed?w=400&h=300&fit=crop" },
      { name: "Korean Fried Chicken", image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400&h=300&fit=crop" },
      { name: "Tteokbokki", image: "https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=400&h=300&fit=crop" },
    ],
  },
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    await Restaurant.deleteMany({});
    await Meal.deleteMany({});
    console.log("Cleared existing restaurants and meals");

    for (const [cuisine, info] of Object.entries(cuisineData)) {
      const restaurant = await Restaurant.create({
        name: `${cuisine} House`,
        description: `Authentic ${cuisine} cuisine made fresh daily.`,
        cuisine,
        image: info.restaurantImage,
        address: "123 Main Street",
        rating: (Math.random() * 2 + 3).toFixed(1),
      });

      let category = await Category.findOne({ title: cuisine });
      if (!category) {
        category = await Category.create({ title: cuisine });
      }

      for (const meal of info.meals) {
        await Meal.create({
          restaurant: restaurant._id,
          title: meal.name,
          description: `Delicious ${meal.name} from ${restaurant.name}.`,
          options: [
            { size: "Regular", price: parseFloat((Math.random() * 10 + 8).toFixed(2)) },
            { size: "Large", price: parseFloat((Math.random() * 10 + 14).toFixed(2)) },
          ],
          image: meal.image,
          categoryName: cuisine,
        });
      }

      console.log(`Created ${restaurant.name} with 5 meals`);
    }

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();