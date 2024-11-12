import * as S from './styles'

import cesta from '../../assets/cesta.png'
import { paraReal } from '../Produto'
import { useAppSelector } from '../../store/hooks'
import {
  selectNumberFavorites,
  selectNumProducts,
  selectTotalValue
} from '../cart/cartSlice'

const Header = () => {
  const numeroDeItems = useAppSelector(selectNumProducts)
  const valorTotalCarrinho = useAppSelector(selectTotalValue)
  const numeroFavoritos = useAppSelector(selectNumberFavorites)

  return (
    <S.Header>
      <h1>EBAC Sports</h1>
      <div>
        <span>{numeroFavoritos} favoritos</span>
        <img src={cesta} />
        <span>
          {numeroDeItems} itens, valor total: {paraReal(valorTotalCarrinho)}
        </span>
      </div>
    </S.Header>
  )
}

export default Header
