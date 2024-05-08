import trashCan from '../../assets/trash-can.svg';
import editCan from '../../assets/edit-icon.svg';
import PropTypes from 'prop-types';  
import { useEffect, useState } from 'react';
import ProductDelete from './productDelete';
import Modal from '../modal/modal';
import ProductEdit from './productEdit';

function ProductList({products} ) {

  const [productsList, setProductsList] = useState([]);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(undefined);

  ProductList.propTypes = {
    products:PropTypes.array.isRequired,
    productsList: PropTypes.array
  };

  const openEditModal = (productId) => {
    setSelectedProductId(productId);
    setIsOpenEdit(!isOpenEdit);
  };

  const openDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setIsOpenDelete(!isOpenDelete);
  };

  const IMG_STYLE = {
    'height':'1.2rem'
  }

  useEffect(()=>{
    setProductsList(products)
  },[products])

  return (
    <div>
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
          <tr key={key} id={product.id}>
            <td className="text-center">{product.name}</td>
            <td className="text-center">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            <td className="text-center">{product.description}</td>
            <td className="text-center">{product.status == 1 ? 'Estoque' : product.status == 2 ? 'Reposição' : 'Em Falta'}</td>
            <td className="text-center">{product.stock_quantity}</td>
            <td className="text-center d-flex align-items-center justify-content-evenly">
                <a onClick={() => {openEditModal(product.id)}}><img src={editCan} style={IMG_STYLE} alt="edit"/></a>
                <a onClick={() => {openDeleteModal(product.id)}}><img src={trashCan} style={IMG_STYLE} alt="delete"/></a>
            </td>
          </tr>
          ))}
        </tbody>

      </table>
        <Modal isOpen={isOpenEdit}>
          <ProductEdit id={selectedProductId}/>
          <button className="btn btn-danger d-flex w-100 align-items-center justify-content-center text-bold fs-5 p-2 fw-bold" type="button" onClick={() => {setIsOpenEdit(!isOpenEdit)}}>Cancelar</button>
        </Modal>  
        <Modal isOpen={isOpenDelete}>
          <ProductDelete id={selectedProductId}/>
          <button className="btn btn-danger d-flex w-100 align-items-center justify-content-center text-bold fs-5 p-2 fw-bold" type="button" onClick={() => {setIsOpenDelete(!isOpenDelete)}}>Cancelar</button>
        </Modal>  
    </div>
  );
}

export default ProductList;