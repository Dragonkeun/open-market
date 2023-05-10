import { CartHeader } from "./CartHeader";
import { CartList } from "./CartList";
import styles from "./cart.module.css";
import { TotalCart } from "./totalCart";

export const Cart = ({ convertPrice, cart, setCart }) => {
  const handleQuantity = (type, id, quantity) => {
    const found = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found);
    const cartItem = {
      id: found.id,
      image: found.image,
      name: found.name,
      price: found.price,
      quantity: quantity,
      provider: found.provider,
    };
    if (type === "plus") {
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    } else {
      if(quantity === 0) return
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    }
  };
  const handleRemove = (id) => {
    setCart(cart.filter((el) => el.id !== id))
  }
  return (
    <>
      <header className={styles.header}>
        <h1>장바구니</h1>
      </header>
      <CartHeader />
      {cart.length === 0 ? (
        <div className={styles.not}>
          <h2>장바구니에 담긴 상품이 없습니다.</h2>
          <p>원하는 상품을 장바구니에 담아보세요!</p>
        </div>
      ) : (
        cart.map((cart) => {
          return (
            <CartList
              key={`key-${cart.id}`}
              convertPrice={convertPrice}
              cart={cart}
              setCart={setCart}
              handleQuantity={handleQuantity}
              handleRemove={handleRemove}
            />
          );
        })
      )}

      {cart.length === 0 ? "" : <TotalCart />}
    </>
  );
};

// 장바구니 수량 증감, X 버튼 클릭 시 삭제
// 체크 버튼 클릭된 것만 가격 체크, 맨 위 체크 버튼 클릭 시 모든 상품 선택
// 메인페이지 최신순 낮은가격 높은가격
