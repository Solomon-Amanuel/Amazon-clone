import React, {useContext, useEffect, useState} from 'react'
import classes from './orders.module.css'
import Layout from '../../components/Layout/Layout';
import { db } from '../../Utility/firebase';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCards from '../../components/Product/ProductCards';

const Orders = () => {
  const [{user}, dispatch] = useContext(DataContext)
  const [orders, setOrders] = useState([])

  useEffect(() => {
   if (user) {
    db.collection("users").doc(user.uid).collection("orders").orderBy("created","desc").onSnapshot((snapshot)=>{
      setOrders(
        snapshot.docs.map((doc)=>({
       id:doc.id,
       data:doc.data()
      }))
    )
      
    })
   } else {
    setOrders([])
   }
  }, [])
  
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && <div style={{padding:"20px"}}>You don't have orders yet</div>}
          {/* ordered items */}
          <div>
            {orders?.map((eachOrder,i)=>{
              return(
                <div key={i}>
                  <hr />
                  <p>Order Id: {eachOrder?.id}</p>
                  {
                    eachOrder?.data?.basket?.map((order)=>(
  
                      <ProductCards key={order.id} product={order} flex={true}/>
                    
                    ))
                  }
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders