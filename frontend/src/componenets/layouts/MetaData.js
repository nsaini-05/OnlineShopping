import react from 'react'
import {Helmet} from 'react-helmet' 


const MetaData = (props) => {
    return (
      <Helmet>
          <title>{props.title + "ShopIt"}</title>
      </Helmet>
    )
} 

export default MetaData;