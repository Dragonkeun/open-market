import { useParams } from "react-router-dom";
import styles from "./detail.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { getProducts } from "../../service/fetcher";

export const Detail = ({ convertPrice, cart, setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({}); //id값이 일치하는 상품 출력 예정
  const [count, setCount] = useState(1); //상품 수량
  const handleQuantity = (type) => {
    // +, -에 상품 수량이 증감하는 함수
    if (type === "plus") {
      //type이 plus면
      setCount(count + 1); //1 증가
    } else {
      if (count === 1) return; //type이 plus가 아닌데(마이너스면서) 만약 수량이 1이면 더 내려가면 안되므로 return
      setCount(count - 1); //1이 아니면 -1
    }
  };
  useEffect(() => {
    getProducts().then((data) => {
      setProduct(
        data.data.products.find((product) => product.id === parseInt(id))
      );
    });
  }, []);
  const handleCart = () => {
    const cartItem = {
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      provider: product.provider,
      quantity: count
    }
    setCart([...cart, cartItem]) //기존의 cart 내용은 유지하면서 cartItem을 추가
  }
  console.log(cart);
  return (
    product && (
      <>
        <main className={styles.main}>
          <section className={styles.product}>
            <div className={styles.product_img}>
              <img src={product.image} alt="product" />
            </div>
          </section>
          <section className={styles.product}>
            <div className={styles.product_info}>
              <p className={styles.seller_store}>{product.provider}</p>
              <p className={styles.product_name}>{product.name}</p>
              <span className={styles.price}>
                {convertPrice(product.price + "")}
                <span className={styles.unit}>원</span>
              </span>
            </div>

            <div className={styles.delivery}>
              <p>택배배송 / 무료배송</p>
            </div>

            <div className={styles.line}></div>

            <div className={styles.amount}>
              <img
                className={styles.minus}
                src="/images/icon-minus-line.svg"
                alt="minus"
                onClick={() => handleQuantity("minus")}
              />

              <div className={styles.count}>
                <span>{count}</span>
              </div>

              <img
                className={styles.plus}
                src="/images/icon-plus-line.svg"
                alt="plus"
                onClick={() => handleQuantity("plus")}
              />
            </div>

            <div className={styles.line}></div>

            <div className={styles.sum}>
              <div>
                <span className={styles.sum_price}>총 상품 금액</span>
              </div>

              <div className={styles.total_info}>
                <span className={styles.total}>
                  총 수량 <span className={styles.total_count}>{count}개</span>
                </span>
                <span className={styles.total_price}>
                  {convertPrice(product.price * count)}
                  <span className={styles.total_unit}>원</span>
                </span>
              </div>
            </div>

            <div className={styles.btn}>
              <button className={styles.btn_buy}>바로 구매</button>
              <button className={styles.btn_cart} onClick={()=>handleCart()}>장바구니</button>
            </div>
          </section>
        </main>
      </>
    )
  );
};
