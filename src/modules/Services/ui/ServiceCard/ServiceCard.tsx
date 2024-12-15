import { MockType } from "../../Services"
import css from './ServiceCard.module.scss'

export const ServiceCard  = ({className, card}:Props) => {

return (
   <div className={css.serviceCard}> 
        <img src={card.img} alt="" />
        <ul className={css.serviceCard__list}>
        {
            card.textCard.map((item, index) => <li key={index}>{item}</li>)
        }
        </ul>
   </div>
  )
}

type Props = {
 className?: string
 card: MockType
}

