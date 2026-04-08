import HomeLayout from "../../Layouts/HomeLayout";
import {Chart as ChartJs} from "chart.js"
function AdminDashboard(){
    ChartJs.register();
   return(
    <HomeLayout>

    </HomeLayout>
   )
}
 
export default AdminDashboard;