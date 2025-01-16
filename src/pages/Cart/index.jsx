import React, { useState, useEffect } from 'react';
import ShoppingCart from "../../components/Cart/index"
import CheckoutSummary from "../../components/Cart/CheckoutSummary"
import Footer from '../../components/Footer/index'
import AccueilLoader from '../../components/designLayouts/Loaders/AccueilLoader';


function Cart() {
  const [formattedTotal, setFormattedTotal] = useState('0,00 €');
  const [isLoading, setIsLoading] = useState(false); 
  const [Loading, setLoading] = useState(false); 

  useEffect(() => {
    let loadingTimeout;

    if (isLoading) {
      loadingTimeout = setTimeout(()=> {
        setLoading(true);
      }, 500)
    } else {
      setLoading(false)
    }

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [isLoading]);


  const handleTotalUpdate = (total) => {
      setFormattedTotal(total);
  };



  return (
      <div>
          {Loading && <AccueilLoader /> }

    <div className={isLoading ? 'hidden' : ''} >
          <div className="md:flex">
              <ShoppingCart onTotalUpdate={handleTotalUpdate} LoadingCart={setIsLoading} /> 
              <CheckoutSummary total={formattedTotal} />
          </div>

          <Footer />
          </div>
      </div>
  );
}

export default Cart;