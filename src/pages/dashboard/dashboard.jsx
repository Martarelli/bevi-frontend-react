import Header from '../../components/header/header'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import ProductList from '../../components/products/productList';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const getData = async () => {
    try {
      await api.post('/product/list')
      .then((response) => {
        setProducts(response.data.data);
      });
    } catch (error) {
      alert('Ocorreu um erro ao processar sua requisição...\nError fetching data: ' + error.message);
      console.log('Error fetching data: ' + error.message);
      console.log(error);
    }
  };
  
  function handleOpenCreate () {
    setIsOpenCreate(!isOpenCreate);
    console.log(isOpenCreate);
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <div>
      <Header/>
      <div className="container py-2">
        <div className="d-flex p-3 w-100 justify-content-between">
          <h1>Listagem dos Produtos</h1> 
          <button type="button" className="btn btn-success" onClick={handleOpenCreate}> 
            <span className="fw-bold">+ </span> 
            Adicionar Produto
          </button>
        </div>
        <ProductList products={products}/>
      </div>
    </div>
  )
}

export default Dashboard
