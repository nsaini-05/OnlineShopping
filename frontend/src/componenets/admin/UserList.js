import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAllUsers ,clearErrors} from "../../actions/userActions";
import Loader from "../layouts/Loader"; 
import Sidebar from './Sidebar'


const UserList = ({history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, users  } = useSelector(state => state.allUsers);

    useEffect(()=>{

        dispatch(getAllUsers());
      
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }     
          
          



    },[dispatch, alert, error]);


    
    const setUsers = () => {
        const data = {
          columns: [
            {
              label: 'User ID',
              field: "id",
              sort: "asc",
            },
            {
              label: "Name",
              field: "name",
              sort: "asc",
            },
            {
              label: "Email",
              field: "email",
              sort: "asc",
            },
        
            {
                label: "Role",
                field: "role",
                sort: "asc",
              },
            {
              label: "Actions",
              field: "actions",              
            },
          ],
    
          rows: [],
        };
   
        users.forEach((user) => {
          data.rows.push({
            id: user._id,
            name: user.name,
            email: user.email,
            role : user.role,
  
           
  
  
          actions: (<Fragment>
            <Link to={``} className="btn btn-primary">
              <i className="fa fa-eye"></i>
            </Link>
            <button className = "btn btn-danger py-1 px-2 ml-2"  >
              <i className="fa fa-trash" ></i>
              </button>     
            </Fragment>
          )          
          });
        });
    
        return data;
      };

    return (
        <Fragment>
        
        <MetaData title = {'All Users'}/>

        <div className = "row">
            <div className = "col-12 col-md-2">
                <Sidebar />            
            </div>
            <div className = "col-12 col-md-10">
            <Fragment>
                <h1 className = "my-5">All Users</h1>
                {loading ? <Loader></Loader> : <MDBDataTable
          data={setUsers()}
          className="px-3"
          bordered
          striped
          hover
        />}       
            </Fragment>
            </div>

        </div>
        

        </Fragment>
    )
}

export default UserList
