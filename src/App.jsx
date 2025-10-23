import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import PageContainer from "./container/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import RouterConfig from "./config/RouterConfig";
import Loading from "./components/Loading";
import Drawer from "@mui/material/Drawer";
import { setDrawer, calculateBasket,removeItemToBasket } from "./redux/slices/basketSlice";

function ThemedApp() {
  const { theme } = useSelector((state) => state.settings);
  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  // 🔹 Ürünler değiştiğinde toplamı yeniden hesapla
  useEffect(() => {
    dispatch(calculateBasket());
  }, [products, dispatch]);

  return (
    <div className={`app-container ${theme}`}>
      <PageContainer>
        <Loading />
        <Header />
        <RouterConfig />

        {/* 🔹 Sepet Drawer */}
        <Drawer
          anchor="right"
          open={drawer}
          onClose={() => dispatch(setDrawer())}
        >
          <div className="drawer-container">
            <h2 className="drawer-title">Sepetim</h2>

            {products && products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="drawer-item">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="drawer-item-img"
                  />
                  <div className="drawer-item-info">
                    <p className="drawer-item-title">
                      {product.title} ({product.count})
                    </p>
                    <p className="drawer-item-price">
                      {(product.price * product.count).toFixed(2)} ₺
                    </p>
                  </div>
                  <button onClick={()=>dispatch(removeItemToBasket(product.id))} className="remove-btn">Ürünü Çıkar</button>
                </div>
              ))
            ) : (
              <p className="empty-basket">Sepetiniz boş.</p>
            )}

            <div className="drawer-total">
              <h3>Toplam Tutar:</h3>
              <span>{totalAmount.toFixed(2)} ₺</span>
            </div>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  );
}

function App() {
  return <ThemedApp />;
}

export default App;
