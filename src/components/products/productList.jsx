import trashCan from '../../assets/trash-can.svg';
import editCan from '../../assets/edit-icon.svg';
import PropTypes from 'prop-types';  
import { useEffect, useState } from 'react';

function ProductList({products} ) {

  const [productsList, setProductsList] = useState([])
  
  ProductList.propTypes = {
    products:PropTypes.array.isRequired,
    productsList: PropTypes.array
  };
  
  const IMG_STYLE = {
    'height':'1.2rem'
  }

  useEffect(()=>{
    setProductsList(products)
  },[products])

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th className="text-center" scope="col">Nome do Produto</th>
          <th className="text-center" scope="col">Preço</th>
          <th className="text-center" scope="col">Descrição</th>
          <th className="text-center" scope="col">Status</th>
          <th className="text-center" scope="col">Qtd Estoque</th>
          <th className="text-center" scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        {productsList.map((product, key) => (
        <tr key={key}>
          <td className="text-center">{product.name}</td>
          <td className="text-center">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
          <td className="text-center">{product.description}</td>
          <td className="text-center">{product.status}</td>
          <td className="text-center">{product.stock_quantity}</td>
          <td className="text-center d-flex align-items-center justify-content-evenly">
              <a href={"/edit/" + product.id}><img src={editCan} style={IMG_STYLE} alt="edit"/></a>
              <a href={"/delete/" + product.id}><img src={trashCan} style={IMG_STYLE} alt="delete"/></a>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;