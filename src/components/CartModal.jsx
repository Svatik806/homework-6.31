import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  toggleCart,
  updateQuantity,
} from "../redux/slices/cartSlice";

const CartModal = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.cart);

  if (!isOpen) return null;

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-xl p-6">
        <div>
          <div className="flex justify-between items-center pb-4 border-b">
            <h2 className="text-lg font-bold">Кошик</h2>
            <button
              className="text-slate-400 hover:text-slate-600 font-bold"
              onClick={() => dispatch(toggleCart())}
            >
              ✕
            </button>
          </div>

          <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-slate-500 text-center py-8">Кошик порожній</p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 border-b pb-3"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <p className="text-slate-500 text-xs">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ id: item.id, amount: -1 }))
                      }
                      className="px-2 py-0.5 bg-slate-100 rounded"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ id: item.id, amount: 1 }))
                      }
                      className="px-2 py-0.5 bg-slate-100 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 text-xs"
                    >
                      Видалити
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Разом:</span>
              <span>${totalPrice}</span>
            </div>
            <button
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition mb-2"
              onClick={() => {
                dispatch(toggleCart());
                dispatch(clearCart());
              }}
            >
              Оформити замовлення
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full text-slate-500 text-sm py-1 hover:underline"
            >
              Очистити кошик
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
