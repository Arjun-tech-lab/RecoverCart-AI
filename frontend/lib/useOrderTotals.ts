import { useCartStore } from './store';

export function useOrderTotals() {
  const items = useCartStore((state) => state.items);
  const shippingOption = useCartStore((state) => state.shippingOption);
  const recoveryData = useCartStore((state) => state.recoveryData);

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  let shipping = 99;
  if (shippingOption === 'express') shipping = 199;
  if (subtotal >= 5000) shipping = 0;

  let discount = 0;
  const offer = recoveryData?.offer;

  if (offer && recoveryData?.isApplied) {
    if (offer.type === 'discount_percent' || offer.type === 'discount' || offer.type === 'complex') {
      const percent = Number(offer.value || offer.percent || offer.discount_percent || 0);
      if (percent > 0) {
        discount = subtotal * (percent / 100);
      }
    } else if (offer.type === 'flat_discount') {
      discount = Number(offer.value || 0);
    }

    if (offer.type === 'free_shipping' || offer.type === 'shipping' || offer.free_shipping || offer.free_express_shipping) {
      shipping = 0;
    }
  }

  const finalSubtotal = Math.max(0, subtotal - discount);
  const tax = finalSubtotal * 0.05;
  const total = finalSubtotal + shipping + tax;

  return { subtotal, discount, shipping, tax, total };
}
