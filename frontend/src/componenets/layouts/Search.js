import React , {useState} from 'react'



export const Search = ({history}) => {


    const [keyword , setKeyword] = useState("");



    function handleChange(event)
    {

        const keyword = event.target.value;
        setKeyword(keyword);

    }


    function handleClick(event)
    {
        event.preventDefault();
        if(keyword.trim())
        {
            history.push(`/search/${keyword}`)
        }
        else
        {
            history.push('/')
        }



    }

 





    return (
        
            <form>
  <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name ..."
            value = {keyword}
            onChange = {handleChange}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn" onClick = {handleClick}>
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
            </form>
       
    )
}


export default Search