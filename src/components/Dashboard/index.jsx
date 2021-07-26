import { Redirect } from "react-router-dom"


        const Dashboard = ({auth}) => {

            if(!auth){
                return <Redirect to ="/"/>
            }

            return (
                <div classname = "container--dashboard">
                    <h1> Boa! </h1>
                </div>
            )
        }
        export default Dashboard