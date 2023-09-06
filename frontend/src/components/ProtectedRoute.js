import { Navigate } from "react-router-dom";


// В зависимости от наличия прав идет перенаправление либо в требуемый компонент
// либо на страницу по дефолту
const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.loggedIn ? <Component {...props}/> : <Navigate to="/sign-in" replace/> 
};

export default ProtectedRoute;
