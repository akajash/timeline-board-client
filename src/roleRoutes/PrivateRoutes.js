const PrivateRoute = ({ component : Component, ...rest }) => {
    return (
        <Route
        {...rest}
        render = {props => 
            isAuthenticated() && isAuthenticated().result.role ==1 ? (
            <Component {...props} />
            ) : (
                <Redirect to= {{
                    pathname: "/auth",
                    state: { from: props.location}
                }}
                />
            )
        }
        />
    )
}

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem("profile")){
        return JSON.parse(localStorage.getItem("profile"))
    }
    else{
        return false;
    }
}