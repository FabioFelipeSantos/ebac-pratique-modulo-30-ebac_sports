import { Produto as ProdutoType } from '../../App'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  addItemToCart,
  addToFavorite,
  removeFromFavorite,
  selectIsOnFavorite,
  selectIsOnProducts
} from '../cart/cartSlice'
import * as S from './styles'

type Props = {
  produto: ProdutoType
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({ produto }: Props) => {
  const dispatch = useAppDispatch()
  const estaNosFavoritos = useAppSelector((state) =>
    selectIsOnFavorite(state, produto.id)
  )
  const estaNoCarrinho = useAppSelector((state) =>
    selectIsOnProducts(state, produto.id)
  )

  const handleFavoriteClick = () => {
    if (estaNosFavoritos) {
      dispatch(removeFromFavorite(produto.id))
    } else {
      dispatch(addToFavorite(produto))
    }
  }

  function handleAddToCart() {
    if (estaNoCarrinho) {
      alert('Item já adicionado')
    } else {
      dispatch(addItemToCart(produto))
    }
  }

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar onClick={handleFavoriteClick} type="button">
        {estaNosFavoritos
          ? '- Remover dos favoritos'
          : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar onClick={handleAddToCart} type="button">
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
