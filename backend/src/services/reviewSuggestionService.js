const mongoose = require('mongoose');

const DEFAULT_KEYWORDS = [
  'Spicy',
  'Fresh',
  'Crunchy',
  'Juicy',
  'Delicious',
  'Tasty',
  'Hot',
  'Crispy',
  'Cheesy',
  'Healthy',
];

// Private helper: normalize a string for keyword checks
const normalize = (s) => (typeof s === 'string' ? s.toLowerCase().trim() : '');

// Private helper: extract keywords by scanning item text for known keyword tokens
const extractKeywordsFromTexts = ({ texts }) => {
  const haystacks = Array.isArray(texts) ? texts : [];
  const lowerJoined = haystacks.map(normalize).filter(Boolean).join(' ');

  const found = [];
  for (const kw of DEFAULT_KEYWORDS) {
    const token = normalize(kw);
    if (!token) continue;

    // Simple substring match for rule-based NLP
    if (lowerJoined.includes(token)) {
      found.push(kw);
    }
  }

  // If no keywords extracted, provide a small neutral set for templates
  return found.length ? found : ['Delicious', 'Fresh'];
};

const titleCase = (s) => {
  const str = typeof s === 'string' ? s.trim() : '';
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const buildSuggestionTemplates = ({ orderedItems, keywords }) => {
  const itemNames = (orderedItems || []).map((it) => titleCase(it?.name)).filter(Boolean);

  const uniqueKeywords = Array.isArray(keywords) ? Array.from(new Set(keywords)) : [];
  const kw = (i) => uniqueKeywords[i % Math.max(uniqueKeywords.length, 1)] || 'Delicious';

  const count = itemNames.length;
  const firstItem = itemNames[0] || 'the meal';
  const secondItem = itemNames[1] || firstItem;
  const joinedItems = count >= 3 ? itemNames.slice(0, 2).join(' and ') : itemNames.join(' and ');

  // Template variations driven by count and keywords presence
  const s1 =
    count <= 1
      ? `${firstItem} was ${kw(0).toLowerCase()} and ${kw(1).toLowerCase()}. Delivery was quick and I really enjoyed the meal.`
      : `The ${firstItem} was ${kw(0).toLowerCase()} and ${kw(1).toLowerCase()}. Delivery was quick and the rest of the items held up great.`;

  const s2 =
    count >= 2
      ? `I loved the ${kw(2).toLowerCase()} ${secondItem} and ${kw(3).toLowerCase()} ${firstItem}. Highly recommended.`
      : `Great taste—${kw(2).toLowerCase()} flavors and ${kw(3).toLowerCase()} quality. Highly recommended.`;

  const s3 =
    count >= 3
      ? `Fresh food, good quality, fast delivery and excellent taste. ${joinedItems} were all really satisfying.`
      : `Fresh food and excellent taste. Good quality and fast delivery—overall a ${kw(4).toLowerCase()} experience.`;

  return [s1, s2, s3];
};

const getReviewSuggestionsByOrderId = async ({ orderId, customerId }) => {
  if (!customerId) {
    const err = new Error('Authentication required');
    err.statusCode = 401;
    throw err;
  }

  if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
    const err = new Error('Validation error: orderId must be a valid ObjectId');
    err.statusCode = 400;
    throw err;
  }

  // Enforce ownership: ensure order belongs to authenticated customer
  // Single query with ownership condition to reduce redundant DB operations.
  // Behavior remains the same: not found -> 404, wrong customer -> 403.
  const Order = require('../models/Order');
  const orderOwned = await Order.findOne({ _id: orderId, customerId }).lean();
  if (!orderOwned) {
    // Determine whether the order exists but belongs to someone else.
    const orderAny = await Order.findById(orderId).lean();
    if (!orderAny) {
      const err = new Error('Order not found');
      err.statusCode = 404;
      throw err;
    }

    const err = new Error('Order does not belong to this customer');
    err.statusCode = 403;
    throw err;
  }


  const orderedItems = Array.isArray(orderOwned.items) ? orderOwned.items : [];
  if (orderedItems.length === 0) {
    const err = new Error('Order contains no items');
    err.statusCode = 400;
    throw err;
  }


  // Extract keywords from item names (and best-effort categories if present)
  const texts = [];
  for (const it of orderedItems) {
    if (it?.name) texts.push(it.name);
    // Best-effort: category field might not exist in schema, but requirement asks "if available"
    if (it?.category) texts.push(it.category);
    if (it?.categories && Array.isArray(it.categories)) texts.push(...it.categories);
  }

  const keywords = extractKeywordsFromTexts({ texts });

  const suggestions = buildSuggestionTemplates({ orderedItems, keywords });

  return {
    orderId: orderOwned._id.toString(),
    keywords,
    suggestions,
  };
};


module.exports = {
  getReviewSuggestionsByOrderId,
};

