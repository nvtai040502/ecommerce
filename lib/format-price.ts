export const formatPrice = (price: string | number, currencyCode: string): string => {
  const parsedPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(parsedPrice)) {
    throw new Error('Invalid price format');
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode
  }).format(parsedPrice);
};
