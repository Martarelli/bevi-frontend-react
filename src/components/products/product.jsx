import trashCan from '../../assets/trash-can.svg';
import editCan from '../../assets/edit-icon.svg';

function Product({id, name, price, description, status, stock_quantity} ) {
  const IMG_STYLE = {
    'height':'1.2rem'
  }

  return (
    <tr>
      <td className="text-center">{name}</td>
      <td className="text-center">{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td className="text-center">{description}</td>
      <td className="text-center">{status}</td>
      <td className="text-center">{stock_quantity}</td>
      <td className="text-center d-flex align-items-center justify-content-evenly">
          <a href={"/edit/" + id}><img src={editCan} style={IMG_STYLE} alt="edit"/></a>
          <a href={"/delete/" + id}><img src={trashCan} style={IMG_STYLE} alt="delete"/></a>
      </td>
    </tr>
  );
}

export default Product;