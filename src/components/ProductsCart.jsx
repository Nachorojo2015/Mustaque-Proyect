import { useEffect, useState } from "react";
import Trash from "../icons/Trash";
import Swal from "sweetalert2";
import { randomOrder } from "../utils";

const ProductsCart = () => {
  const [productsCart, setProductsCart] = useState([]);
  const [sumTotal, setSumTotal] = useState(0);

  function deleteProduct(e) {
    const idProduct = e.currentTarget.id;
    const cart = JSON.parse(localStorage.getItem("carrito"));
    const indexProduct = cart.findIndex(product => product.id === +idProduct);
    cart.splice(indexProduct, 1);
    localStorage.setItem("carrito", JSON.stringify(cart));
    setProductsCart(cart);
  }

  function buyProducts() {
    setProductsCart([]);
    localStorage.setItem(
      "carrito",
      JSON.stringify([])
    );
    Swal.fire({
      title: "Compra Exitosa!",
      text: `Orden de Compra: ${randomOrder()}`,
      icon: "success",
    });
  }

  useEffect(() => {
    const cart = localStorage.getItem("carrito");
    if (cart) {
      setProductsCart(JSON.parse(cart));
      setSumTotal(
        JSON.parse(cart).map(product => product.price * product.quantity).reduce((num,acc) => num+acc, 0)
      );
    } else {
      setProductsCart([]);
    }
  }, []);

  return (
    <>
      {productsCart.length > 0 ? (
        <>
          <div className="mt-5 mx-auto flex items-center justify-center space-y-5 flex-col">
            {productsCart.map((p, index) => (
              <div className="flex items-center justify-around mx-auto w-full px-2" key={index}>
                <div>
                  <img src={p.img} alt="product-image" className="w-28" />
                </div>
                <div className="w-1/2">
                  <p>
                    {p.name}
                    <span className="text-gray-400 ml-2">{p.category}</span>
                  </p>
                  <p>Cantidad: {p.quantity}</p>
                  <p className="font-bold">${p.price * p.quantity}</p>
                </div>
                <div>
                  <button id={p.id} onClick={deleteProduct}>
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[100px]">
            <div className="border-t border-b p-3 px-4 w-[90%] mx-auto text-[14px]">
              <p className="flex items-center justify-between">
                <span>Subtotal:</span> <span>${sumTotal}</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Envío:</span>{" "}
                <span className="text-gray-400">
                  El costo se calcula más adelante
                </span>
              </p>
            </div>
            <div className="border-t p-2 px-4 w-[90%] mx-auto">
              <p className="flex items-center justify-between font-bold text-2xl">
                <span>Total:</span>
                <span>${sumTotal}</span>
              </p>
              <p className="flex items-center justify-between text-[12px] font-bold p-2">
                <span></span>
                <span className="text-[#c0392b]">
                  O hasta 3 cuotas sin interés de ${(sumTotal / 3).toFixed(2)}
                </span>
              </p>
            </div>
            <div className="text-center pb-12">
              <button
                className="text-center bg-black text-white p-3 rounded-[50px] w-[90%]"
                onClick={buyProducts}
              >
                Comprar
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center mx-auto text-blue-300 py-2 px-4 border rounded-[20px] mt-[50px] w-[90%]">
          El carrito de compras está vacío.
        </p>
      )}
    </>
  );
};

export default ProductsCart;
